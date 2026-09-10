import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Daylight" },
      {
        name: "description",
        content: "The terms that apply to using the Daylight website, client portal and services.",
      },
      { property: "og:title", content: "Terms of service — Daylight" },
      { property: "og:description", content: "Terms for using our website, portal and services." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "Using this site",
    body: "You may use this website for lawful purposes only. Content, designs and code shown here belong to Daylight or our clients unless stated otherwise.",
  },
  {
    title: "Quotes and proposals",
    body: "Quotes are estimates based on the scope described at the time and are valid for 30 days. Work begins once a written scope and payment schedule are agreed.",
  },
  {
    title: "Ownership of work",
    body: "On full payment, you own the custom source code and assets we build for you. Reusable internal libraries and our own SaaS products remain ours and are licensed to you for use in your system.",
  },
  {
    title: "Client portal accounts",
    body: "You are responsible for keeping your login details safe and for activity under your account. Tell us immediately if you think an account has been compromised.",
  },
  {
    title: "Liability",
    body: "We work carefully but cannot guarantee uninterrupted service. Our liability for any claim is limited to the fees paid for the work in question.",
  },
];

function TermsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        description="A plain-language summary. Have your own counsel review it before you rely on it as a legal document."
      />
      <Section className="max-w-3xl space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </Section>
    </SiteLayout>
  );
}
