import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  full?: boolean;
};

export function LeadForm({
  fields,
  submitLabel,
  onSubmit,
  success,
}: {
  fields: Field[];
  submitLabel: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => PromiseLike<{ error: { message: string } | null }>;
  success: ReactNode;
}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    for (const f of fields) {
      const v = String(fd.get(f.name) ?? "").trim().slice(0, 5000);
      if (v) values[f.name] = v;
    }
    setBusy(true);
    const { error } = await onSubmit(values);
    setBusy(false);
    if (error) {
      toast.error("Couldn't send that. Please try again.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return <div className="rounded-xl border border-primary/40 bg-card p-8">{success}</div>;
  }

  return (
    <form onSubmit={handle} className="grid gap-5 rounded-xl border border-border bg-card p-6 md:grid-cols-2 md:p-8">
      {fields.map((f) => (
        <div key={f.name} className={`space-y-2 ${f.full || f.type === "textarea" ? "md:col-span-2" : ""}`}>
          <Label htmlFor={f.name}>
            {f.label}
            {f.required && <span className="text-primary"> *</span>}
          </Label>
          {f.type === "textarea" ? (
            <Textarea id={f.name} name={f.name} required={f.required} rows={6} maxLength={5000} />
          ) : f.type === "select" ? (
            <select
              id={f.name}
              name={f.name}
              required={f.required}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Choose…
              </option>
              {f.options?.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <Input id={f.name} name={f.name} type={f.type ?? "text"} required={f.required} maxLength={300} />
          )}
        </div>
      ))}
      <div className="md:col-span-2">
        <Button type="submit" disabled={busy} size="lg">
          {busy ? "Sending…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
