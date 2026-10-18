import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/Page";
export const Route = createFileRoute("/privacy")({
 head: () => ({ meta: [
 { title: "Privacy policy \u2014 Daylight" },
 { name: "description", content: "How Daylight uses and protects personal information, including AI-assisted correspondence." },
 { property: "og:title", content: "Privacy policy \u2014 Daylight" },
 { property: "og:description", content: "How Daylight uses and protects personal information, including AI-assisted correspondence." },
 { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }
 ] }), component: LegalPage,
});
const sections = [
  {
    "title": "Who handles your information",
    "body": "Daylight is responsible for personal information collected for website enquiries, recruitment and its own client-account administration. For client-controlled business data processed solely on client instructions, Daylight acts as a processor under the relevant service and data-processing agreement. Contact us through the contact page or company email published on this website. Requests about data controlled by a client may need to be directed to that client."
  },
  {
    "title": "Information we collect",
    "body": "We collect details you submit, such as name, contact details, company, project requirements, messages, application materials and supporting documents. Accounts may include profile details and linked projects, milestones, files, messages, support tickets, invoices and payment records. Hosting and security services may process IP addresses, request logs and device information needed to operate the site. Do not send passwords, full payment-card details or sensitive personal information unless a secure and necessary collection process has been agreed."
  },
  {
    "title": "Purposes and lawful grounds",
    "body": "We use information to respond to enquiries, assess proposals and applications, administer accounts, deliver services, record transactions, protect systems and meet legal obligations. Grounds may include steps requested before a contract, performance of a contract, legal obligations, consent where required and legitimate interests assessed against individual rights. Optional marketing requires the appropriate lawful basis and an easy opt-out. We do not sell personal information or provide it to advertisers."
  },
  {
    "title": "AI processing and human review",
    "body": "Authorised staff can submit contact, quote or job-application content to Lovable AI Gateway for a summary and draft reply. Relevant text is transmitted to the gateway and its model provider, and the summary and draft are stored with staff access controls. Staff should minimise or redact unnecessary personal information first. Outputs are reviewed by people; the system does not send replies or make recruitment decisions automatically. Model requests disable provider-side response storage where supported; this does not mean that every service log or operational record is deleted immediately. Contact us to request manual, non-AI handling; requests already processed cannot be retroactively unprocessed."
  },
  {
    "title": "Recipients and international transfers",
    "body": "Information is accessible to authorised Daylight personnel and contracted service providers for hosting, account authentication, file storage and AI processing where that feature is used. Professional advisers, authorities or a successor business may receive information only where lawful and necessary, with appropriate safeguards. Providers may process data outside Kenya. Before such processing, Daylight must use the transfer safeguards required by applicable law, including appropriate contractual protections or another lawful transfer basis. Details relevant to a particular engagement can be requested before sensitive data is shared."
  },
  {
    "title": "Security and confidentiality",
    "body": "We use role-based access, client-record restrictions and private project-file storage, together with appropriate operational safeguards. No online service is completely risk-free. Staff access should be limited to legitimate work purposes and credentials kept confidential. If a personal-data breach occurs, we will assess the impact, take containment steps and notify the competent authority and affected individuals where required by Kenyan law, including the applicable notification deadlines. Processor incidents are reported to the relevant client controller as required."
  },
  {
    "title": "Retention and deletion",
    "body": "Information is retained only as long as necessary for its stated purpose, contractual duties, disputes and applicable legal recordkeeping. Unsuccessful enquiries and applications should be reviewed for deletion or anonymisation when their purpose ends; longer recruitment retention requires an appropriate basis. Financial and project records may need longer retention under applicable tax or other law. We do not promise a universal retention period where obligations differ. Deletion requests are assessed against legal holds, backups and lawful retention; where a request cannot be fully met, we explain the reason and restrict unnecessary use."
  },
  {
    "title": "Your rights and complaints",
    "body": "Subject to applicable law, you may request access, correction, erasure, restriction, objection or portability, and withdraw consent where processing relies on it. Withdrawal does not invalidate prior lawful processing. We verify identity proportionately and respond within the applicable statutory period; any lawful extension or refusal will be explained. You may ask for human review of a decision and complain to Kenya’s Office of the Data Protection Commissioner without first exhausting our complaint process. Contract terms do not waive these rights."
  },
  {
    "title": "Cookies, account storage and children",
    "body": "Essential account and preference storage is used to maintain sign-in, security and your selected appearance. Optional analytics or advertising technologies require appropriate disclosure and consent where legally required; this notice is not permission to introduce them without notice. The site is intended for business contacts and adult applicants, not for children to submit data independently. If a service must handle children’s data, the parties must first agree the required safeguards, authorisations and age-appropriate practices."
  },
  {
    "title": "Accuracy, client duties and notice changes",
    "body": "Keep your contact details accurate and ensure you have authority and a lawful basis to share another person’s information. Client-controlled systems require an agreed allocation of controller and processor duties, including assistance with rights requests, incidents, subprocessors and end-of-service data return. We will update this notice when actual practices change and provide additional notice for material changes where required. A new notice does not by itself authorise an incompatible new use of information already collected."
  }
];
function LegalPage() { return <SiteLayout><PageHero eyebrow="Legal" title="Privacy policy" description="How Daylight uses and protects personal information, including AI-assisted correspondence."/><Section className="max-w-3xl space-y-8"><p className="text-sm text-muted-foreground">Updated 18 October 2026 · Draft for qualified Kenyan legal review before adoption.</p>{sections.map((section,index) => <section key={section.title}><h2 className="font-display text-xl font-semibold">{index+1}. {section.title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p></section>)}</Section></SiteLayout>; }
