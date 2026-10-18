import { useState, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Download, Send, Plus, Receipt } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusPill } from '@/components/site/Page';
import { useRows } from './ResourceManager';
import { resources, workspaceDb, labelOf, type RecordRow } from '@/lib/workspace';
import { useAuth } from '@/hooks/useAuth';

export const portalSections = ['projects', 'milestones', 'documents', 'messages', 'tickets', 'invoices'] as const;
const money = (value: unknown, currency: unknown) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: String(currency || 'KES') }).format(Number(value || 0));

export function PortalView({ section }: { section: string }) {
  const resource = resources[section];
  const rows = useRows(resource?.table ?? 'client_projects');
  const projects = useRows('client_projects');
  const clients = useRows('clients');
  const items = useRows('invoice_items');
  const payments = useRows('payments');
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [projectId, setProjectId] = useState('all');
  const [composing, setComposing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  if (!resource || !portalSections.some(key => key === section)) return <h1>Section not found</h1>;
  const visible = rows.data?.filter(row => projectId === 'all' || row['project_id'] === projectId || (section === 'projects' && row.id === projectId)) ?? [];
  const projectName = (row: RecordRow) => labelOf(projects.data?.find(project => project.id === row['project_id']) ?? { name: 'General account' });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auth.user) return;
    const form = new FormData(event.currentTarget);
    const selectedProject = projects.data?.find(project => project.id === String(form.get('project')));
    const client = clients.data?.find(row => row.id === selectedProject?.['client_id']) ?? clients.data?.find(row => row['user_id'] === auth.user?.id);
    if (!client || (section === 'messages' && !selectedProject)) { toast.error('Choose a project linked to your company.'); return; }
    setBusy(true);
    try {
      const payload = section === 'messages'
        ? { project_id: selectedProject?.id, body: String(form.get('body')), sender_id: auth.user.id, sender_name: auth.user.email }
        : { client_id: client.id, project_id: selectedProject?.id ?? null, subject: String(form.get('subject')), description: String(form.get('body')), priority: String(form.get('priority') || 'Normal'), status: 'Open' };
      const { error } = await workspaceDb.from(resource.table).insert(payload);
      if (error) throw error;
      setComposing(false);
      await queryClient.invalidateQueries({ queryKey: ['workspace'] });
      toast.success(section === 'messages' ? 'Message sent.' : 'Support ticket created.');
    } catch (error) { toast.error(error instanceof Error ? error.message : 'Unable to submit.'); }
    finally { setBusy(false); }
  }

  async function download(row: RecordRow) {
    if (!row['file_path']) { toast.error('This document is awaiting upload.'); return; }
    const { data, error } = await workspaceDb.storage.from('project-files').createSignedUrl(String(row['file_path']), 60);
    if (error || !data) toast.error('Unable to download this document.');
    else window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  }

  return <div className="max-w-5xl">
    <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-semibold">{resource.title}</h1>{(section === 'messages' || section === 'tickets') && <Button disabled={!clients.data?.length} onClick={() => setComposing(value => !value)}><Plus/>{section === 'messages' ? 'New message' : 'Open ticket'}</Button>}</div>
    <Select value={projectId} onValueChange={setProjectId}><SelectTrigger className="mb-6 max-w-sm" aria-label="Filter by project"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All projects</SelectItem>{projects.data?.map(project => <SelectItem key={project.id} value={project.id}>{labelOf(project)}</SelectItem>)}</SelectContent></Select>
    {composing && <form onSubmit={submit} className="mb-8 space-y-4 border-y border-border py-6"><div className="space-y-2"><Label htmlFor="project">Project</Label><select id="project" name="project" required={section === 'messages'} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="">{section === 'messages' ? 'Choose project' : 'General account support'}</option>{projects.data?.map(project => <option key={project.id} value={project.id}>{labelOf(project)}</option>)}</select></div>{section === 'tickets' && <><div className="space-y-2"><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" required maxLength={200}/></div><div className="space-y-2"><Label htmlFor="priority">Priority</Label><select id="priority" name="priority" className="h-10 rounded-md border border-input bg-background px-3"><option>Normal</option><option>Low</option><option>High</option><option>Urgent</option></select></div></>}<div className="space-y-2"><Label htmlFor="body">{section === 'messages' ? 'Message' : 'Description'}</Label><Textarea id="body" name="body" required rows={5} maxLength={12000}/></div><Button type="submit" disabled={busy}><Send/>{busy ? 'Sending…' : 'Submit'}</Button><Button type="button" variant="ghost" onClick={() => setComposing(false)}>Cancel</Button></form>}
    {rows.error ? <p role="alert" className="text-destructive">{rows.error.message}</p> : rows.isPending ? <p className="py-8 text-muted-foreground">Loading…</p> : !visible.length ? <p className="py-12 text-muted-foreground">No {resource.title.toLowerCase()} yet.</p> : visible.map(row => <article key={row.id} className="border-b border-border py-6">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-semibold">{section === 'messages' ? String(row['sender_name'] || 'Daylight team') : labelOf(row)}</h2><p className="mt-1 text-xs text-muted-foreground">{section !== 'projects' && projectName(row)} {String(row['created_at'] || '').slice(0,10)}</p></div>{row['status'] ? <StatusPill status={String(row['status'])}/> : null}</div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{String(row['description'] || row['body'] || row['notes'] || '')}</p>
      {section === 'projects' && <><div className="mt-5 h-2 overflow-hidden rounded-full bg-muted"><progress aria-label="Project progress" value={Number(row['progress'])} max={100} className="h-2 w-full accent-primary"/></div><div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground"><span>{String(row['progress'])}% complete</span><span>Target: {String(row['expected_completion'] || 'To be agreed')}</span></div></>}
      {section === 'milestones' && <p className="mt-3 text-sm text-muted-foreground">Due: {String(row['due_date'] || 'To be agreed')}</p>}
      {section === 'tickets' && <p className="mt-3 text-sm text-muted-foreground">Priority: {String(row['priority'])}</p>}
      {section === 'documents' && <Button variant="outline" size="sm" className="mt-4" onClick={() => download(row)}><Download/>{row['file_path'] ? 'Download' : 'Awaiting file'}</Button>}
      {section === 'invoices' && <><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xl font-semibold">{money(row['total'], row['currency'])}</p><span className="text-sm text-muted-foreground">Due: {String(row['due_date'] || 'To be agreed')}</span><Button variant="outline" size="sm" onClick={() => setInvoiceId(invoiceId === row.id ? null : row.id)}><Receipt/>Details</Button></div>{invoiceId === row.id && <div className="mt-5 space-y-3 border-t border-border pt-4">{items.data?.filter(item => item['invoice_id'] === row.id).map(item => <div key={item.id} className="flex justify-between gap-4 text-sm"><span>{String(item['description'])} × {String(item['quantity'])}</span><span>{money(item['amount'], row['currency'])}</span></div>)}<div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(row['subtotal'], row['currency'])}</span></div><div className="flex justify-between text-sm"><span>Tax</span><span>{money(row['tax'], row['currency'])}</span></div><h3 className="pt-3 font-semibold">Recorded payments</h3>{payments.data?.filter(payment => payment['invoice_id'] === row.id).map(payment => <p key={payment.id} className="text-sm text-muted-foreground">{money(payment['amount'], row['currency'])} · {String(payment['method'])} · {String(payment['reference'] || '')}</p>)}{!payments.data?.some(payment => payment['invoice_id'] === row.id) && <p className="text-sm text-muted-foreground">No payments recorded.</p>}</div>}</>}
    </article>)}
  </div>;
}