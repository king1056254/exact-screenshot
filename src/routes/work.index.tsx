import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, Section, SiteLayout, StatusPill } from "@/components/site/Page";
import { portfolioQuery } from "@/lib/queries";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Our work — Daylight case studies" },
      {
        name: "description",
        content:
          "Case studies of business systems, portals and mobile apps Daylight has delivered for Kenyan organisations.",
      },
      { property: "og:title", content: "Our work — Daylight case studies" },
      { property: "og:description", content: "Systems, portals and apps we have delivered." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { data } = useQuery(portfolioQuery);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our work"
        title="Case studies"
        description="A look at the problem, the build and the outcome for systems now running in production."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {(data ?? []).map((p) => (
            <Link
              key={p.id}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="rounded-xl border border-border bg-card p-7 transition-shadow hover:shadow-lift"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {p.industry}
                </span>
                <StatusPill status={p.status} />
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {(p.technologies ?? []).slice(0, 5).map((t: string) => (
                  <span
                    key={t}
                    className="rounded-md bg-muted px-2 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
