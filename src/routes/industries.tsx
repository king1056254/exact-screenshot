import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { industriesQuery } from "@/lib/queries";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [{ property: 'og:type', content: 'website' },{ name: 'twitter:card', content: 'summary' },
      { title: "Industries we serve — Daylight" },
      {
        name: "description",
        content:
          "Daylight builds software for health, education, logistics, finance, agriculture, retail and the public sector in Kenya.",
      },
      { property: "og:title", content: "Industries we serve — Daylight" },
      { property: "og:description", content: "Sectors where Daylight software is running today." },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const { data } = useQuery(industriesQuery);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Industries"
        title="Sectors we know well"
        description="Domain knowledge shortens discovery and keeps the build grounded in how the work actually happens."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(data ?? []).map((i) => (
            <article key={i.id} className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-semibold">{i.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.summary}</p>
              {i.description && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.description}</p>
              )}
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
