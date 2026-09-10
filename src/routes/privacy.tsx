import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Daylight" },
      {
        name: "description",
        content: "How Daylight collects, uses, stores and protects personal data submitted through this site.",
      },
      { property: "og:title", content: "Privacy policy — Daylight" },
      { property: "og:description", content: "How we handle personal data." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "What we collect",
    body: "When you contact us, request a quote or apply for a job, we collect the details you submit — name, email, phone, company and the content of your message. Client portal accounts also store your profile details and the records tied to your projects.",
  },
  {
    title: "How we use it",
    body: "Only to respond to you, deliver and support your project, and meet our legal and accounting obligations. We do not sell personal data or share it with advertisers.",
  },
  {
    title: "Where it is stored",
    body: "Data is stored on managed cloud infrastructure with access restricted to Daylight staff who need it. Client portal records are protected so that each client can only access their own data.",
  },
  {
    title: "How long we keep it",
    body: "Enquiries are kept for up to two years. Project and financial records are kept for seven years as required for tax and audit purposes.",
  },
  {
    title: "Your rights",
    body: "You can ask us for a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it where we are not legally required to keep it. Email us and we will respond within 30 days.",
  },
];

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="This is a plain-language summary. Have your own counsel review it before you rely on it as a legal document."
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
