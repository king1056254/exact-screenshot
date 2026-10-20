import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout, Section, SectionHeading, StatusPill } from "@/components/site/Page";
import { Button } from "@/components/ui/button";
import { portfolioQuery, productsQuery, servicesQuery, testimonialsQuery } from "@/lib/queries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ property: 'og:type', content: 'website' },{ name: 'twitter:card', content: 'summary' },
      { title: "Daylight — Custom software company in Nairobi, Kenya" },
      {
        name: "description",
        content:
          "Daylight builds custom business systems, web and mobile apps, and SaaS products for organisations across Kenya and East Africa.",
      },
      { property: "og:title", content: "Daylight — Custom software company in Nairobi" },
      {
        property: "og:description",
        content: "Custom business systems, web and mobile apps, and SaaS products built in Nairobi.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "40+", label: "Systems shipped" },
  { value: "12", label: "Industries served" },
  { value: "3", label: "SaaS products" },
  { value: "98%", label: "Client retention" },
];

function Index() {
  const services = useQuery(servicesQuery);
  const work = useQuery(portfolioQuery);
  const products = useQuery(productsQuery);
  const testimonials = useQuery(testimonialsQuery);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="grid-backdrop absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Nairobi, Kenya
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] md:text-6xl">
            Software that runs the <span className="text-gradient-amber">day-to-day</span> of
            serious businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We design and build custom business systems, web and mobile applications, and our own
            SaaS products — then stay on to support and grow them.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/quote">
              <Button size="lg" className="gap-2">
                Request a quote <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/work">
              <Button size="lg" variant="outline">
                See our work
              </Button>
            </Link>
          </div>
          <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-semibold">{s.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Services"
          title="What we build"
          description="From first discovery workshop to long-term maintenance, delivered by one accountable team."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(services.data ?? []).slice(0, 6).map((s) => (
            <Link
              key={s.id}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary">
                Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <div className="border-y border-border bg-card">
        <Section>
          <SectionHeading eyebrow="Selected work" title="Systems in production" />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {(work.data ?? []).slice(0, 4).map((p) => (
              <Link
                key={p.id}
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {p.industry}
                  </span>
                  <StatusPill status={p.status} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/work">
              <Button variant="outline">All case studies</Button>
            </Link>
          </div>
        </Section>
      </div>

      <Section>
        <SectionHeading
          eyebrow="Our products"
          title="SaaS we own and operate"
          description="Products born from problems we kept meeting in client projects."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {(products.data ?? []).map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-6">
              <StatusPill status={p.status} />
              <h3 className="mt-4 font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              <ul className="mt-4 space-y-2">
                {(p.features ?? []).slice(0, 3).map((f: string) => (
                  <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {(testimonials.data ?? []).length > 0 && (
        <div className="border-t border-border bg-card">
          <Section>
            <SectionHeading eyebrow="Clients" title="What people say" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {(testimonials.data ?? []).slice(0, 3).map((t) => (
                <figure key={t.id} className="rounded-xl border border-border bg-background p-6">
                  <blockquote className="text-sm leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="block text-muted-foreground">
                      {t.role}
                      {t.company ? `, ${t.company}` : ""}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Section>
        </div>
      )}

      <Section className="text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Have a system in mind?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Tell us what you need. We'll come back with a scope, a timeline and a fixed quote.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/quote">
            <Button size="lg" className="gap-2">
              Request a quote <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline">
              Contact us
            </Button>
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
