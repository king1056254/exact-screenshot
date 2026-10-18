import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
export const Route = createFileRoute("/terms")({
 head: () => ({ meta: [
 { title: "Terms of service \u2014 Daylight" },
 { name: "description", content: "Terms governing Daylight engagements, payment, delivery, ownership and customer remedies." },
 { property: "og:title", content: "Terms of service \u2014 Daylight" },
 { property: "og:description", content: "Terms governing Daylight engagements, payment, delivery, ownership and customer remedies." },
 { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }
 ] }), component: LegalPage,
});
const sections = [
  {
    "title": "Agreement and applicable documents",
    "body": "These terms govern use of the Daylight website and client workspace. A paid engagement requires an accepted written proposal, statement of work or service agreement identifying the parties, deliverables, fees and payment schedule. That signed agreement takes priority where it expressly differs from these terms. Browsing alone does not create a paid engagement. Customers receive an opportunity to review the applicable terms before accepting an order. Mandatory consumer and data-protection rights cannot be excluded."
  },
  {
    "title": "Scope, estimates and changes",
    "body": "Quotes are estimates valid for 30 days unless the proposal states otherwise. Only expressly listed deliverables are included. New features, integrations, revisions beyond the agreed allowance, third-party charges and migration work require a written change approval identifying additional fees and schedule effects. Daylight will not charge for unapproved extra work. Delivery dates depend on timely client decisions, access and content; material delays will be communicated with a revised schedule."
  },
  {
    "title": "Fees, payment and suspension",
    "body": "The agreed proposal determines deposits, taxes, instalments and currency. Clients must promptly raise a specific, good-faith billing dispute and pay undisputed amounts when due. Late-payment interest or collection costs apply only when expressly agreed and lawful. Daylight may suspend affected services for material non-payment or security risk after reasonable written notice and a chance to remedy, unless urgent action is necessary to protect systems or people. Suspension does not transfer ownership of unpaid work or cancel accrued charges."
  },
  {
    "title": "Client responsibilities",
    "body": "Clients must provide accurate requirements, lawful content, necessary permissions and timely approvals, and appoint an authorised contact. Clients are responsible for their business decisions, data accuracy and legal obligations. Neither party may introduce malware, attempt unauthorised access or misuse another person’s information. The client must disclose regulated or unusually sensitive processing requirements before work begins so appropriate controls can be agreed."
  },
  {
    "title": "Testing, acceptance and defects",
    "body": "Deliverables will be offered for review against the agreed acceptance criteria and review period. Clients should describe reproducible defects in writing. Daylight will correct material failures to meet the agreed specification within a reasonable time at no extra charge. Acceptance procedures, warranty periods and support coverage must be stated in the project agreement; silence alone does not waive mandatory rights. New requirements or changes caused by third-party updates are handled through the change process."
  },
  {
    "title": "Intellectual property and handover",
    "body": "On full payment of the applicable fees, ownership of bespoke deliverables expressly identified for transfer passes to the client, subject to third-party and open-source licences. Daylight retains pre-existing tools, reusable libraries, know-how and its SaaS products; where incorporated into paid deliverables, the client receives the licence reasonably necessary to use those deliverables as agreed. Client materials remain the client’s property. Source code, deployment credentials and handover assistance are provided as specified in the proposal. Daylight will not publish confidential client material or identify a client in a case study without permission."
  },
  {
    "title": "Hosting, third-party services and support",
    "body": "Hosting, maintenance, backups, support hours and service levels are included only if stated in the agreement. Daylight uses reasonable care but does not promise uninterrupted operation or immunity from every cyberattack. Third-party platforms have their own terms, availability and fees. Daylight will communicate material dependencies and reasonably assist with issues within its control. Clients should retain their own copies of critical business records and agree recovery requirements before deployment."
  },
  {
    "title": "Accounts, confidentiality and data",
    "body": "Account holders must protect credentials and promptly report suspected compromise. Daylight restricts client access to their linked company records. Each party must protect the other’s confidential information and use it only for the engagement, except for lawful disclosures or information already public without breach. Personal data is handled under the privacy policy and, where required, a separate data-processing agreement. Neither these terms nor the privacy notice grants unrestricted rights to client data."
  },
  {
    "title": "AI-assisted correspondence",
    "body": "Authorised staff may use AI to summarise contact messages, quote requests or job applications and prepare draft replies. Outputs may be inaccurate and must be reviewed by a person. Drafts are not sent automatically and do not constitute a quote, job offer, legal advice or binding commitment. Recruitment decisions remain human decisions. Do not include passwords, payment-card details or unnecessary sensitive information in submissions; contact Daylight if a non-AI review is required."
  },
  {
    "title": "Cancellation, termination and refunds",
    "body": "Either party may terminate in accordance with the project agreement or for a material breach not remedied within a reasonable period after written notice. On termination, the client pays for work properly performed and approved non-cancellable costs, not for undelivered work. Any unused prepaid balance is reconciled and refunded where applicable; deposits are not automatically forfeited. Daylight will provide agreed paid-for deliverables and reasonably facilitate data export, subject to lawful retention and agreed handover costs disclosed in advance. Mandatory cancellation and refund rights remain intact."
  },
  {
    "title": "Liability and fair remedies",
    "body": "To the extent permitted by law, neither party is liable for indirect or consequential losses that were not reasonably foreseeable. Daylight’s aggregate liability for an ordinary contractual claim is limited to the fees paid or payable for the affected engagement, or, for an ongoing subscription, the preceding 12 months of affected service fees. This limit does not apply where exclusion is unlawful, including fraud, wilful misconduct, or mandatory consumer remedies, and does not remove statutory data-protection obligations. Clients remain entitled to correction, re-performance, an appropriate refund or other remedies required by law. Any indemnity must be expressly agreed and proportionate to the party’s responsibility."
  },
  {
    "title": "Events outside reasonable control",
    "body": "Neither party is responsible for a delay caused by events outside its reasonable control if it promptly notifies the other, mitigates the effects and resumes performance as soon as reasonably possible. Payment for work already delivered remains due. If a prolonged disruption makes the engagement impractical, the parties will agree an orderly exit and fair reconciliation rather than requiring payment for services that cannot be provided."
  },
  {
    "title": "Complaints, governing law and updates",
    "body": "Raise a complaint through the contact page or the company email shown on this website, identifying the relevant project and desired remedy. The parties will first attempt a good-faith resolution; mediation may be agreed without preventing lawful access to courts or regulators. Kenyan law governs, subject to mandatory rights and jurisdiction rules applicable to the customer. Material changes apply prospectively with notice where appropriate; they do not unilaterally rewrite an existing signed project agreement. If a provision is unenforceable, the remaining provisions continue to apply to the extent lawful."
  }
];
function LegalPage() { return <SiteLayout><PageHero eyebrow="Legal" title="Terms of service" description="Terms governing Daylight engagements, payment, delivery, ownership and customer remedies."/><Section className="max-w-3xl space-y-8"><p className="text-sm text-muted-foreground">Updated 18 October 2026 · Draft for qualified Kenyan legal review before adoption.</p>{sections.map((section,index) => <section key={section.title}><h2 className="font-display text-xl font-semibold">{index+1}. {section.title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p></section>)}</Section></SiteLayout>; }
