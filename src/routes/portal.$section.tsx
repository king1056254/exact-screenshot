import { createFileRoute, notFound } from '@tanstack/react-router';
import { PortalView, portalSections } from '@/components/workspace/PortalView';
import { resources } from '@/lib/workspace';

export const Route = createFileRoute('/portal/$section')({
  beforeLoad: ({ params }) => { if (!portalSections.some(section => section === params.section)) throw notFound(); },
  head: ({ params }) => ({ meta: [
    { title: `${resources[params.section]?.title ?? 'Account'} — Daylight client workspace` },
    { name: 'description', content: `Your private Daylight ${resources[params.section]?.title.toLowerCase() ?? 'account'} records.` },
    { property: 'og:title', content: `${resources[params.section]?.title ?? 'Account'} — Daylight` },
    { property: 'og:description', content: 'Private client delivery and account records.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
    { name: 'robots', content: 'noindex,nofollow' },
  ] }),
  component: PortalSection,
});
function PortalSection() { const { section } = Route.useParams(); return <PortalView key={section} section={section}/>; }