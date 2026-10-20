import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { LeadForm } from "@/components/site/LeadForm";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [{ property: 'og:type', content: 'website' },{ name: 'twitter:card', content: 'summary' },
      { title: "Request a quote — Daylight" },
      { name: "description", content: "Tell Daylight about your software project and get a scoped, fixed quote." },
      { property: "og:title", content: "Request a quote — Daylight" },
      { property: "og:description", content: "Describe your project and get a fixed quote." },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Start a project"
        title="Request a quote"
        description="A few details help us come back with a realistic scope, timeline and price."
      />
      <Section className="max-w-4xl">
        <LeadForm
          submitLabel="Request quote"
          fields={[
            { name: "name", label: "Your name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "company", label: "Company" },
            { name: "country", label: "Country" },
            {
              name: "project_type", label: "Project type", type: "select", required: true,
              options: ["Custom business system", "Website", "Web application", "Mobile app", "Integration / API", "Other"],
            },
            {
              name: "budget_range", label: "Budget (KES)", type: "select",
              options: ["Under 250,000", "250,000 – 1M", "1M – 5M", "Over 5M", "Not sure yet"],
            },
            {
              name: "timeline", label: "Timeline", type: "select",
              options: ["As soon as possible", "1–3 months", "3–6 months", "Flexible"],
            },
            { name: "details", label: "Tell us about the project", type: "textarea", required: true },
          ]}
          onSubmit={(v) =>
            supabase.from("quote_requests").insert({
              name: v.name, email: v.email, phone: v.phone, company: v.company, country: v.country,
              project_type: v.project_type, budget_range: v.budget_range, timeline: v.timeline, details: v.details,
            })
          }
          success={<><h2 className="font-display text-xl font-semibold">Request received</h2><p className="mt-2 text-muted-foreground">We'll review it and reply within two working days.</p></>}
        />
      </Section>
    </SiteLayout>
  );
}
