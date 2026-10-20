import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Plus, Trash2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from '@/components/ai-elements/prompt-input';
import { Reasoning, ReasoningTrigger, ReasoningContent } from '@/components/ai-elements/reasoning';
import { Shimmer } from '@/components/ai-elements/shimmer';

export function StaffAssistant({ threadId }: { threadId?: string }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const threads = useQuery({ queryKey: ['ai-threads', auth.user?.id], enabled: auth.isStaff, queryFn: async () => {
    const { data, error } = await supabase.from('ai_conversations').select('id,title,updated_at').order('updated_at', { ascending: false });
    if (error) throw new Error(error.message); return data;
  } });
  const thread = useQuery({ queryKey: ['ai-thread', auth.user?.id, threadId], enabled: auth.isStaff && !!threadId, queryFn: async () => {
    if (!threadId) return null;
    const { data, error } = await supabase.from('ai_conversations').select('id,messages,title').eq('id', threadId).single();
    if (error) throw new Error('Conversation not found or unavailable.'); return data;
  } });
  async function create() {
    if (!auth.user || busy) return; setBusy(true);
    try {
      const { data, error } = await supabase.from('ai_conversations').insert({ staff_id: auth.user.id }).select('id').single();
      if (error || !data) throw new Error('Unable to create conversation.');
      await threads.refetch(); await navigate({ to: '/admin/assistant/$threadId', params: { threadId: data.id } });
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Unable to create conversation.'); } finally { setBusy(false); }
  }
  async function remove(id: string) {
    if (!window.confirm('Delete this conversation permanently?')) return;
    const { error } = await supabase.from('ai_conversations').delete().eq('id', id);
    if (error) { toast.error('Unable to delete conversation.'); return; }
    await queryClient.invalidateQueries({ queryKey: ['ai-threads'] });
    if (id === threadId) await navigate({ to: '/admin/assistant' });
  }
  return <><div className="mb-6 flex items-center justify-between gap-4"><h1 className="text-3xl font-semibold">AI Assistant</h1><Button onClick={create} disabled={busy}><Plus />New conversation</Button></div>
    <div className="grid min-h-[600px] gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
      <nav aria-label="Conversations" className="min-w-0 border-b border-border pb-4 xl:border-b-0 xl:border-r xl:pr-4">
        {threads.error && <p role="alert" className="text-sm text-destructive">Unable to load conversations.</p>}
        {threads.data?.map(t => <div key={t.id} className="mb-1 flex min-w-0 items-center"><Button asChild variant={threadId === t.id ? 'secondary' : 'ghost'} className="min-w-0 flex-1 justify-start"><Link to="/admin/assistant/$threadId" params={{ threadId: t.id }}><span className="truncate">{t.title}</span></Link></Button><Button size="icon-sm" variant="ghost" title="Delete conversation" aria-label={`Delete ${t.title}`} onClick={() => remove(t.id)}><Trash2 /></Button></div>)}
      </nav>
      <div className="min-w-0">{threadId ? thread.error ? <p role="alert" className="text-destructive">{thread.error.message}</p> : thread.data ? <ChatWindow key={threadId} threadId={threadId} initialMessages={thread.data.messages as unknown as UIMessage[]} /> : <p className="text-muted-foreground">Loading conversation…</p> : <div className="flex min-h-[500px] flex-col items-center justify-center gap-5 text-center"><div className="grid size-14 place-items-center rounded-md bg-primary font-display text-3xl font-semibold text-primary-foreground">D</div><h2 className="text-2xl font-semibold">Daylight Assistant</h2><Button variant="outline" onClick={create} disabled={busy}><Plus />New conversation</Button></div>}</div>
    </div></>;
}
function ChatWindow({ threadId, initialMessages }: { threadId: string; initialMessages: UIMessage[] }) {
  const queryClient = useQueryClient();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat', body: { conversationId: threadId }, headers: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session ? { Authorization: `Bearer ${data.session.access_token}` } : {};
  }, fetch: async (input, init) => {
    const response = await fetch(input, init);
    if (!response.ok) {
      let message = 'AI could not complete this request.';
      try { const body = await response.json(); message = body.message ?? message; } catch { /* Keep safe fallback. */ }
      throw new Error(message);
    }
    return response;
  } }), [threadId]);
  const { messages, sendMessage, status, stop, error } = useChat({ id: threadId, messages: initialMessages, transport,
    onError: e => toast.error(e.message), onFinish: () => { void queryClient.invalidateQueries({ queryKey: ['ai-threads'] }); void queryClient.invalidateQueries({ queryKey: ['ai-thread'] }); },
  });
  const generating = status === 'submitted' || status === 'streaming';
  useEffect(() => { if (!generating) textarea.current?.focus(); }, [generating, threadId]);
  return <div className="flex h-[min(750px,80vh)] min-h-[500px] min-w-0 flex-col">
    <Conversation><ConversationContent className="px-0">
      {messages.map(message => <Message key={message.id} from={message.role}><MessageContent className={message.role === 'user' ? 'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground' : ''}>
        {message.parts.map((part, index) => part.type === 'text' ? <MessageResponse key={index} isAnimating={generating && message.role === 'assistant'}>{part.text}</MessageResponse> : part.type === 'reasoning' ? <Reasoning key={index} defaultOpen={false} isStreaming={part.state === 'streaming'}><ReasoningTrigger /><ReasoningContent>{part.text}</ReasoningContent></Reasoning> : null)}
      </MessageContent>{message.role === 'assistant' && <Button size="icon-sm" variant="ghost" title="Copy answer" aria-label="Copy answer" onClick={async () => { await navigator.clipboard.writeText(message.parts.filter(p => p.type === 'text').map(p => p.text).join('\n')); toast.success('Answer copied.'); }}><Copy /></Button>}</Message>)}
      {status === 'submitted' && <Shimmer>Thinking…</Shimmer>}
    </ConversationContent><ConversationScrollButton /></Conversation>
    {error && <p role="alert" className="mb-3 text-sm text-destructive">{error.message}</p>}
    <PromptInput onSubmit={async ({ text: submitted }) => { if (!submitted.trim() || generating) return; setText(''); textarea.current?.focus(); await sendMessage({ text: submitted }); }}>
      <PromptInputTextarea ref={textarea} aria-label="Message Daylight Assistant" placeholder="Message Daylight Assistant…" value={text} onChange={e => setText(e.target.value)} />
      <PromptInputFooter className="justify-end"><PromptInputSubmit status={status} onStop={stop} disabled={!generating && !text.trim()} /></PromptInputFooter>
    </PromptInput>
  </div>;
}
