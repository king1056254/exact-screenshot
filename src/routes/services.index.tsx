import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { servicesQuery } from "@/lib/queries";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Daylight software development" },
      {
        name: "description",
        content:
          "Custom software, web and mobile apps, systems integration, cloud, and support services from Daylight in Nairobi.",
      },
      { property: "og:title", content: "Services — Daylight" },
      {
        property: "og:description",
        content: "Custom software, web and mobile apps, integration, cloud and support.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { data } = useQuery(servicesQuery);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Engineering teams you can hand a problem to"
        description="We take responsibility for the whole lifecycle — discovery, design, build, launch, and the years after."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {(data ?? []).map((s) => (
            <Link
              key={s.id}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group rounded-xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
            >
              <h2 className="font-display text-xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary">
                Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
