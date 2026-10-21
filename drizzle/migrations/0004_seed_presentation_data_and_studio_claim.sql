
-- Removable presentation data (every row marked is_demo = true)
insert into public.clients (id, company_name, contact_name, email, phone, industry, notes, status, is_demo) values
 ('11111111-1111-4111-8111-111111111111','Savannah Coffee Roasters','Mary Wanjiru','mary.wanjiru@savannahcoffee.demo','+254 711 111 111','Food & Beverage','Sample client for presentation. Replace with real accounts.','Active',true),
 ('22222222-2222-4222-8222-222222222222','Mwangi Properties Group','Peter Mwangi','peter.mwangi@mwangiproperties.demo','+254 722 222 222','Real Estate','Sample client for presentation. Replace with real accounts.','Active',true),
 ('33333333-3333-4333-8333-333333333333','Zawadi Crafts Collective','Amina Hassan','amina.hassan@zawadicrafts.demo','+254 733 333 333','Retail & E-commerce','Sample client for presentation. Replace with real accounts.','Archived',true);

insert into public.client_projects (id, client_id, name, description, status, progress, start_date, expected_completion, is_demo) values
 ('aaaa1111-0000-4000-8000-000000000001','11111111-1111-4111-8111-111111111111','E-commerce platform & inventory sync','Online storefront, order management and warehouse inventory synchronisation.','In Progress',65,current_date - 80,current_date + 40,true),
 ('aaaa1111-0000-4000-8000-000000000002','11111111-1111-4111-8111-111111111111','Loyalty mobile app (Phase 1)','Customer loyalty program with points, offers and push notifications.','Planned',10,current_date + 14,current_date + 120,true),
 ('aaaa1111-0000-4000-8000-000000000003','22222222-2222-4222-8222-222222222222','Property listing portal','Public listings, agent dashboards and enquiry routing.','In Progress',45,current_date - 50,current_date + 60,true),
 ('aaaa1111-0000-4000-8000-000000000004','33333333-3333-4333-8333-333333333333','Order management dashboard','Internal dashboard for artisan orders, stock and delivery tracking.','Completed',100,current_date - 160,current_date - 30,true);

insert into public.project_milestones (project_id, title, description, status, due_date, sort_order, is_demo) values
 ('aaaa1111-0000-4000-8000-000000000001','Kickoff & discovery','Requirements workshops and technical audit.','Completed',current_date - 70,1,true),
 ('aaaa1111-0000-4000-8000-000000000001','Design system & storefront mockups','Brand-aligned UI kit and page designs.','Completed',current_date - 45,2,true),
 ('aaaa1111-0000-4000-8000-000000000001','Storefront build','Catalogue, cart, checkout and order emails.','In Progress',current_date + 10,3,true),
 ('aaaa1111-0000-4000-8000-000000000001','Inventory integration','Warehouse sync and low-stock alerts.','Pending',current_date + 30,4,true),
 ('aaaa1111-0000-4000-8000-000000000001','Launch & staff training','Go-live checklist, training and handover.','Pending',current_date + 40,5,true),
 ('aaaa1111-0000-4000-8000-000000000003','Requirements & agent workflows','Listing intake, approval and enquiry flows documented.','Completed',current_date - 35,1,true),
 ('aaaa1111-0000-4000-8000-000000000003','Portal UI build','Listings pages, agent dashboard and search.','In Progress',current_date + 15,2,true),
 ('aaaa1111-0000-4000-8000-000000000003','Payments & enquiry routing','Deposit payments and agent assignment.','Pending',current_date + 45,3,true);

insert into public.project_documents (project_id, title, file_path, file_type, visible_to_client, is_demo) values
 ('aaaa1111-0000-4000-8000-000000000001','Signed contract — Phase 2','demo/documents/savannah-contract.pdf','application/pdf',true,true),
 ('aaaa1111-0000-4000-8000-000000000001','Requirements brief v3','demo/documents/savannah-brief.docx','application/vnd.openxmlformats-officedocument.wordprocessingml.document',true,true),
 ('aaaa1111-0000-4000-8000-000000000001','Internal build notes','demo/documents/savannah-internal-notes.md','text/markdown',false,true),
 ('aaaa1111-0000-4000-8000-000000000003','Listing portal proposal','demo/documents/mwangi-proposal.pdf','application/pdf',true,true);

insert into public.project_messages (project_id, sender_id, sender_name, body, is_demo) values
 ('aaaa1111-0000-4000-8000-000000000001',null,'Daylight Studio','Welcome to the project workspace. Weekly progress notes and deliverables will appear here — reply any time and our team is notified.',true),
 ('aaaa1111-0000-4000-8000-000000000001',null,'Mary Wanjiru','Thank you! The storefront designs look great. Can we include mobile money checkout at launch?',true),
 ('aaaa1111-0000-4000-8000-000000000003',null,'Peter Mwangi','Could we schedule the agent dashboard walkthrough this week?',true);

insert into public.support_tickets (client_id, project_id, subject, description, priority, status, is_demo) values
 ('11111111-1111-4111-8111-111111111111','aaaa1111-0000-4000-8000-000000000001','Preview link shows outdated prices','The staging storefront still lists last season''s coffee prices. Please refresh the product data.','High','Open',true),
 ('22222222-2222-4222-8222-222222222222','aaaa1111-0000-4000-8000-000000000003','Agent photo uploads','Several agents cannot upload profile photos larger than 2 MB.','Normal','In Review',true),
 ('33333333-3333-4333-8333-333333333333','aaaa1111-0000-4000-8000-000000000004','Report export dates','Exported order reports showed wrong date ranges — confirmed resolved after the fix.','Low','Resolved',true);

insert into public.invoices (id, invoice_number, client_id, project_id, currency, subtotal, tax, total, status, issue_date, due_date, notes, is_demo) values
 ('bbbb1111-0000-4000-8000-000000000001','DL-2026-0142','11111111-1111-4111-8111-111111111111','aaaa1111-0000-4000-8000-000000000001','KES',420000,67200,487200,'Sent',current_date - 10,current_date + 20,'Milestone 3 — storefront build. Payable within 30 days.',true),
 ('bbbb1111-0000-4000-8000-000000000002','DL-2026-0118','22222222-2222-4222-8222-222222222222','aaaa1111-0000-4000-8000-000000000003','KES',250000,40000,290000,'Paid',current_date - 35,current_date - 5,'Milestone 1 — requirements & workflows.',true),
 ('bbbb1111-0000-4000-8000-000000000003','DL-2026-0155','33333333-3333-4333-8333-333333333333','aaaa1111-0000-4000-8000-000000000004','KES',150000,24000,174000,'Draft',current_date,current_date + 30,'Final handover — pending client confirmation.',true);

insert into public.invoice_items (invoice_id, description, quantity, unit_price, amount, is_demo) values
 ('bbbb1111-0000-4000-8000-000000000001','UX & UI design — storefront',1,120000,120000,true),
 ('bbbb1111-0000-4000-8000-000000000001','Storefront development',1,200000,200000,true),
 ('bbbb1111-0000-4000-8000-000000000001','Inventory integration',1,100000,100000,true),
 ('bbbb1111-0000-4000-8000-000000000002','Requirements & agent workflows',1,130000,130000,true),
 ('bbbb1111-0000-4000-8000-000000000002','Portal UI build — milestone 1',1,120000,120000,true),
 ('bbbb1111-0000-4000-8000-000000000003','Final handover & documentation',1,150000,150000,true);

insert into public.payments (invoice_id, amount, method, reference, paid_at, is_demo) values
 ('bbbb1111-0000-4000-8000-000000000002',290000,'M-Pesa','QGH7XK2M90',now() - interval '6 days',true);

insert into public.contact_messages (name, email, phone, company, subject, message, status, created_at, is_demo) values
 ('Asha Njeri','asha.njeri@brightpathacademy.demo','+254 745 123 456','Brightpath Academy','School management system','We run three campuses and need a single system for admissions, fees and parent communication. What would a rollout look like for us?','New',now() - interval '2 days',true),
 ('Tom Otieno','tom.otieno@harborlogistics.demo','+254 799 654 321','Harbor Logistics','Fleet tracking integration','We already use a fleet tracking provider and would like it connected to our order system. Do you handle such integrations?','New',now() - interval '5 days',true);

insert into public.quote_requests (name, email, phone, company, country, project_type, budget_range, timeline, details, status, created_at, is_demo) values
 ('Grace Kamau','grace.kamau@kilimofresh.demo','+254 701 234 567','Kilimo Fresh','Kenya','Custom software','KES 500,000 – 1,000,000','2–3 months','We need a produce aggregation platform linking farmers to buyers, with M-Pesa collections and basic reporting.','New',now() - interval '1 day',true),
 ('Brian Otieno','brian.otieno@sunsetclinics.demo','+254 712 987 654','Sunset Clinics','Kenya','Web application','KES 1,000,000 – 2,500,000','3–6 months','A patient records and appointment system for four clinics, with role-based access for receptionists, nurses and doctors.','New',now() - interval '3 days',true);

insert into public.job_applications (job_id, name, email, phone, portfolio_url, cover_letter, status, created_at, is_demo) values
 ((select id from public.job_openings where slug='laravel-engineer'),'Daniel Kimani','daniel.kimani@developers.demo','+254 720 456 789','https://portfolio.demo/daniel-kimani','Six years building Laravel systems for Kenyan SMEs, most recently a wholesale distribution platform with M-Pesa reconciliation. Comfortable owning features end to end.','Received',now() - interval '2 days',true),
 ((select id from public.job_openings where slug='frontend-engineer'),'Faith Wambui','faith.wambui@designers.demo','+254 733 222 888','https://portfolio.demo/faith-wambui','Frontend engineer focused on React and TypeScript. Built customer-facing dashboards for a fintech and led the move to a shared design system.','Received',now() - interval '4 days',true);

-- One-time studio claim: only works while no staff-level account exists.
create or replace function public.claim_studio_access()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  available boolean;
begin
  if auth.uid() is null then
    raise exception 'Sign in first.';
  end if;
  perform pg_advisory_xact_lock(918273645);
  available := not exists (
    select 1 from public.user_roles where role in ('super_admin','admin','staff')
  );
  if available then
    insert into public.user_roles (user_id, role)
    values (auth.uid(), 'super_admin')
    on conflict (user_id, role) do nothing;
    insert into public.user_roles (user_id, role)
    values (auth.uid(), 'admin')
    on conflict (user_id, role) do nothing;
  end if;
  return available;
end $$;
revoke execute on function public.claim_studio_access() from public, anon;
grant execute on function public.claim_studio_access() to authenticated;
