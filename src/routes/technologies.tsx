import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { technologiesQuery } from "@/lib/queries";

export const Route = createFileRoute("/technologies")({
  head: () => ({
    meta: [
      { title: "Our technology stack — Daylight" },
      {
        name: "description",
        content: "The languages, frameworks, databases and cloud tools Daylight uses to build software.",
      },
      { property: "og:title", content: "Our technology stack — Daylight" },
      { property: "og:description", content: "Languages, frameworks, databases and cloud tools we use." },
    ],
  }),
  component: TechPage,
});

function TechPage() {
  const { data } = useQuery(technologiesQuery);
  const groups = new Map<string, { id: string; name: string }[]>();
  for (const t of data ?? []) {
    const list = groups.get(t.category) ?? [];
    list.push({ id: t.id, name: t.name });
    groups.set(t.category, list);
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Technologies"
        title="The stack behind the work"
        description="We pick boring, well-supported tools and use them properly."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {[...groups.entries()].map(([category, items]) => (
            <div key={category} className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                {category}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((t) => (
                  <span
                    key={t.id}
                    className="rounded-md border border-border px-2.5 py-1.5 text-sm text-muted-foreground"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
