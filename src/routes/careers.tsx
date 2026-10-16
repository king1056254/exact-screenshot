import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { LeadForm } from "@/components/site/LeadForm";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { jobsQuery } from "@/lib/queries";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Daylight — software jobs in Nairobi" },
      { name: "description", content: "Open engineering, design and delivery roles at Daylight in Nairobi, Kenya." },
      { property: "og:title", content: "Careers at Daylight" },
      { property: "og:description", content: "Open roles at a Nairobi software company." },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { data } = useQuery(jobsQuery);
  const [applying, setApplying] = useState<string | null>(null);

  return (
    <SiteLayout>
      <PageHero eyebrow="Careers" title="Build with us" description="We hire people who care about craft and about the people using what they build." />
      <Section className="space-y-4">
        {(data ?? []).length === 0 && <p className="text-muted-foreground">No open roles right now — check back soon.</p>}
        {(data ?? []).map((j) => (
          <article key={j.id} className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-semibold">{j.title}</h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {[j.department, j.location, j.employment_type].filter(Boolean).join(" · ")}
                </p>
              </div>
              <Button variant={applying === j.id ? "outline" : "default"} onClick={() => setApplying(applying === j.id ? null : j.id)}>
                {applying === j.id ? "Close" : "Apply"}
              </Button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{j.description}</p>
            {(j.requirements ?? []).length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {(j.requirements ?? []).map((r: string) => <li key={r}>• {r}</li>)}
              </ul>
            )}
            {applying === j.id && (
              <div className="mt-6">
                <LeadForm
                  submitLabel="Submit application"
                  fields={[
                    { name: "name", label: "Full name", required: true },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "phone", label: "Phone", type: "tel" },
                    { name: "portfolio_url", label: "Portfolio / LinkedIn / CV link", type: "url" },
                    { name: "cover_letter", label: "Why this role?", type: "textarea" },
                  ]}
                  onSubmit={(v) =>
                    supabase.from("job_applications").insert({
                      job_id: j.id, name: v.name, email: v.email, phone: v.phone, portfolio_url: v.portfolio_url, cover_letter: v.cover_letter,
                    })
                  }
                  success={<><h3 className="font-display text-lg font-semibold">Application sent</h3><p className="mt-2 text-muted-foreground">Thanks — we'll be in touch.</p></>}
                />
              </div>
            )}
          </article>
        ))}
      </Section>
    </SiteLayout>
  );
}
