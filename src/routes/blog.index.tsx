import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { postsQuery } from "@/lib/queries";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights — the Daylight blog" },
      {
        name: "description",
        content:
          "Practical writing on building, buying and running business software in Kenya, from the Daylight team.",
      },
      { property: "og:title", content: "Insights — the Daylight blog" },
      { property: "og:description", content: "Practical writing on business software in Kenya." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { data } = useQuery(postsQuery);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Insights"
        title="Notes from the build"
        description="What we're learning about software, delivery and technology in the Kenyan market."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {(data ?? []).map((p) => (
            <Link
              key={p.id}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="rounded-xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <span className="text-primary">{p.category}</span>
                {p.published_at && <span>{new Date(p.published_at).toLocaleDateString()}</span>}
              </div>
              <h2 className="mt-3 font-display text-xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
