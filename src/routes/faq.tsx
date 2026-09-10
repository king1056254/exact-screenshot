import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsQuery } from "@/lib/queries";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently asked questions — Daylight" },
      {
        name: "description",
        content:
          "Answers about pricing, timelines, ownership, support and how Daylight runs software projects.",
      },
      { property: "og:title", content: "Frequently asked questions — Daylight" },
      { property: "og:description", content: "Pricing, timelines, ownership and support answered." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { data } = useQuery(faqsQuery);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="FAQ"
        title="Questions we get asked"
        description="If your question isn't here, send it to us and we'll answer it properly."
      />
      <Section className="max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {(data ?? []).map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger className="text-left font-display text-base">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10">
          <Link to="/contact">
            <Button>Ask us something else</Button>
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
