import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/work/$slug")({
  head: () => ({
    meta: [
      { title: "Case study — Daylight" },
      { name: "description", content: "The problem, the solution and the outcome of a Daylight project." },
      { property: "og:title", content: "Case study — Daylight" },
      { property: "og:description", content: "Problem, solution and outcome of a Daylight project." },
    ],
  }),
  component: WorkDetail,
});

function WorkDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["portfolio", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data;
    },
  });

  if (isLoading) {
    return (
      <SiteLayout>
        <Section>
          <p className="text-muted-foreground">Loading…</p>
        </Section>
      </SiteLayout>
    );
  }

  if (!data) {
    return (
      <SiteLayout>
        <Section>
          <h1 className="text-3xl font-semibold">Case study not found</h1>
          <Link to="/work" className="mt-4 inline-block text-primary">
            Back to our work
          </Link>
        </Section>
      </SiteLayout>
    );
  }

  const blocks = [
    { title: "The problem", body: data.problem },
    { title: "What we built", body: data.solution },
    { title: "The outcome", body: data.outcome },
  ].filter((b) => b.body);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={data.industry ?? "Case study"}
        title={data.title}
        description={data.summary ?? undefined}
      />
      <Section className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-10">
          {blocks.map((b) => (
            <div key={b.title}>
              <h2 className="rule-accent font-display text-xl font-semibold">{b.title}</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
                {b.body}
              </p>
            </div>
          ))}
        </div>
        <aside className="h-fit space-y-6 rounded-xl border border-border bg-card p-6">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Client
            </h3>
            <p className="mt-1 text-sm">{data.client_name ?? "Confidential"}</p>
          </div>
          {(data.technologies ?? []).length > 0 && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Stack
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(data.technologies ?? []).map((t: string) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-1 font-mono text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(data.features ?? []).length > 0 && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Key features
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {(data.features ?? []).map((f: string) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </div>
          )}
          <Link to="/quote" className="block">
            <Button className="w-full">Start a similar project</Button>
          </Link>
        </aside>
      </Section>
    </SiteLayout>
  );
}
