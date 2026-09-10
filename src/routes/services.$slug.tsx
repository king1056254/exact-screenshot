import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/services/$slug")({
  head: () => ({
    meta: [
      { title: "Service — Daylight" },
      { name: "description", content: "How Daylight delivers this service for clients in Kenya." },
      { property: "og:title", content: "Service — Daylight" },
      { property: "og:description", content: "How Daylight delivers this service." },
    ],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["service", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
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
          <h1 className="text-3xl font-semibold">Service not found</h1>
          <Link to="/services" className="mt-4 inline-block text-primary">
            Back to services
          </Link>
        </Section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Service" title={data.title} description={data.summary ?? undefined} />
      <Section className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <div>
          <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
            {data.description}
          </p>
        </div>
        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider">
            What's included
          </h2>
          <ul className="mt-4 space-y-3">
            {(data.features ?? []).map((f: string) => (
              <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>
          <Link to="/quote" className="mt-6 block">
            <Button className="w-full">Request a quote</Button>
          </Link>
        </aside>
      </Section>
    </SiteLayout>
  );
}
