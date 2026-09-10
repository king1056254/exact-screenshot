import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { PageHero, Section, SiteLayout, StatusPill } from "@/components/site/Page";
import { Button } from "@/components/ui/button";
import { productsQuery } from "@/lib/queries";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "SaaS products — Daylight" },
      {
        name: "description",
        content: "Subscription software products built, owned and operated by Daylight in Nairobi.",
      },
      { property: "og:title", content: "SaaS products — Daylight" },
      { property: "og:description", content: "Subscription software built and operated by Daylight." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { data } = useQuery(productsQuery);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Products"
        title="Our own SaaS platforms"
        description="Each product started as a problem we solved for a client and then generalised for everyone else."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {(data ?? []).map((p) => (
            <article key={p.id} className="rounded-xl border border-border bg-card p-7">
              <StatusPill status={p.status} />
              <h2 className="mt-4 font-display text-2xl font-semibold">{p.name}</h2>
              <p className="mt-1 text-sm text-primary">{p.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="mt-5 space-y-2">
                {(p.features ?? []).map((f: string) => (
                  <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              {p.product_url && (
                <a href={p.product_url} target="_blank" rel="noreferrer" className="mt-6 block">
                  <Button variant="outline" className="w-full">
                    Visit product
                  </Button>
                </a>
              )}
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
