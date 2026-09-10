import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Article — Daylight Insights" },
      { name: "description", content: "An article from the Daylight team on building business software." },
      { property: "og:title", content: "Article — Daylight Insights" },
      { property: "og:description", content: "An article from the Daylight team." },
    ],
  }),
  component: PostDetail,
});

function PostDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["blog_post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
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
          <h1 className="text-3xl font-semibold">Article not found</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary">
            Back to insights
          </Link>
        </Section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow={data.category ?? "Insight"}
        title={data.title}
        description={data.excerpt ?? undefined}
      />
      <Section className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {data.author_name}
          {data.published_at ? ` · ${new Date(data.published_at).toLocaleDateString()}` : ""}
        </p>
        <div className="mt-6 whitespace-pre-line text-base leading-[1.8] text-muted-foreground">
          {data.body}
        </div>
      </Section>
    </SiteLayout>
  );
}
