import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, Section, SectionHeading, SiteLayout } from "@/components/site/Page";
import { teamQuery } from "@/lib/queries";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Daylight — a Kenyan software company" },
      {
        name: "description",
        content:
          "Who we are, how we work, and the people behind Daylight, a software company based in Nairobi, Kenya.",
      },
      { property: "og:title", content: "About Daylight" },
      { property: "og:description", content: "Who we are and how we work, from Nairobi." },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Own the outcome",
    body: "We are not finished when the code ships. We are finished when the system is doing its job for your team.",
  },
  {
    title: "Plain language",
    body: "No jargon in status updates, quotes or contracts. You should always know exactly what you are paying for.",
  },
  {
    title: "Build for the long run",
    body: "Documented, tested, handover-ready code. You are never locked in to us.",
  },
  {
    title: "Local context",
    body: "Mobile money, low-bandwidth realities and Kenyan compliance are designed in from day one.",
  },
];

function AboutPage() {
  const { data } = useQuery(teamQuery);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="About us"
        title="A small team that builds serious systems"
        description="Daylight is a Nairobi-based software company. We work with organisations that need software they can depend on every single working day."
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="rule-accent font-display text-2xl font-semibold">Our story</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We started Daylight because too many businesses were running on spreadsheets,
              WhatsApp groups and software written for somewhere else. We build systems that fit
              how our clients actually work — and stay to support them.
            </p>
          </div>
          <div>
            <h2 className="rule-accent font-display text-2xl font-semibold">How we work</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Discovery first, then a fixed scope and quote. Two-week delivery cycles with a demo at
              the end of each one. Every client gets a portal where they can follow progress,
              milestones, documents and invoices in one place.
            </p>
          </div>
        </div>
      </Section>

      <div className="border-y border-border bg-card">
        <Section>
          <SectionHeading eyebrow="Values" title="What we hold to" />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-background p-6">
                <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {(data ?? []).length > 0 && (
        <Section>
          <SectionHeading eyebrow="Team" title="The people" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {(data ?? []).map((m) => (
              <article key={m.id} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                <p className="text-sm text-primary">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </article>
            ))}
          </div>
        </Section>
      )}
    </SiteLayout>
  );
}
