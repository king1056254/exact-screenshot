import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { LeadForm } from "@/components/site/LeadForm";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Daylight — Nairobi software company" },
      { name: "description", content: "Get in touch with Daylight about a project, a product or a partnership." },
      { property: "og:title", content: "Contact Daylight" },
      { property: "og:description", content: "Talk to us about a project, product or partnership." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="Let's talk" description="We reply to every message within one working day." />
      <Section className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <div className="space-y-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> daylightcompany13@gmail.co</p>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Nairobi, Kenya</p>
        </div>
        <LeadForm
          submitLabel="Send message"
          fields={[
            { name: "name", label: "Your name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "company", label: "Company" },
            { name: "subject", label: "Subject", full: true },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
          onSubmit={(v) =>
            supabase.from("contact_messages").insert({
              name: v.name, email: v.email, phone: v.phone, company: v.company, subject: v.subject, message: v.message,
            })
          }
          success={<><h2 className="font-display text-xl font-semibold">Message received</h2><p className="mt-2 text-muted-foreground">Thank you — we'll be in touch within one working day.</p></>}
        />
      </Section>
    </SiteLayout>
  );
}
