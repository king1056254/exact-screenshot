
-- ROLES
create type public.app_role as enum ('super_admin','admin','staff','client');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.is_staff(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role in ('super_admin','admin','staff'))
$$;

create or replace function public.is_admin(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role in ('super_admin','admin'))
$$;

create policy "profiles self read" on public.profiles for select to authenticated using (id = auth.uid() or public.is_staff(auth.uid()));
create policy "profiles self insert" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "profiles self update" on public.profiles for update to authenticated using (id = auth.uid() or public.is_admin(auth.uid()));
create policy "roles read own" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.is_admin(auth.uid()));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- CONTENT TABLES
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null, slug text not null unique, summary text, description text,
  icon text, features text[] default '{}', sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.industries (
  id uuid primary key default gen_random_uuid(),
  name text not null, slug text not null unique, summary text, description text,
  icon text, sort_order int not null default 0, published boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null, category text not null default 'Backend', sort_order int not null default 0,
  published boolean not null default true, created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null, slug text not null unique, client_name text, industry text,
  summary text, problem text, solution text, outcome text,
  technologies text[] default '{}', features text[] default '{}',
  status text not null default 'Live', live_url text, cover_url text,
  featured boolean not null default false, sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.saas_products (
  id uuid primary key default gen_random_uuid(),
  name text not null, slug text not null unique, tagline text, description text,
  features text[] default '{}', status text not null default 'Coming Soon',
  product_url text, cover_url text, sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null, slug text not null unique, excerpt text, body text,
  category text, tags text[] default '{}', cover_url text, author_name text,
  published boolean not null default false, published_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null, role text, bio text, photo_url text, linkedin_url text,
  sort_order int not null default 0, published boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null, company text, role text, quote text not null, rating int default 5,
  photo_url text, sort_order int not null default 0, published boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null, answer text not null, category text default 'General',
  sort_order int not null default 0, published boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.job_openings (
  id uuid primary key default gen_random_uuid(),
  title text not null, slug text not null unique, department text, location text,
  employment_type text default 'Full-time', description text, requirements text[] default '{}',
  status text not null default 'Open',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.company_settings (
  id uuid primary key default gen_random_uuid(),
  company_name text not null default 'Daylight', tagline text, description text,
  email text, phone text, address text, whatsapp text,
  linkedin_url text, twitter_url text, github_url text,
  updated_at timestamptz not null default now()
);

-- public-readable content
do $$
declare t text;
begin
  foreach t in array array['services','industries','technologies','portfolio_projects','saas_products','blog_posts','team_members','testimonials','faqs','job_openings','company_settings']
  loop
    execute format('grant select on public.%I to anon, authenticated;', t);
    execute format('grant all on public.%I to service_role;', t);
    execute format('grant insert, update, delete on public.%I to authenticated;', t);
    execute format('alter table public.%I enable row level security;', t);
    execute format('create policy "public read %1$s" on public.%1$I for select using (true);', t);
    execute format('create policy "admin write %1$s" on public.%1$I for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));', t);
    execute format('create trigger touch_%1$s before update on public.%1$I for each row execute function public.touch_updated_at();', t);
  end loop;
end $$;

-- LEADS
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, phone text, company text,
  subject text, message text not null, status text not null default 'New',
  created_at timestamptz not null default now()
);
create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, phone text, company text, country text default 'Kenya',
  project_type text, budget_range text, timeline text, details text,
  status text not null default 'New', created_at timestamptz not null default now()
);
create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.job_openings(id) on delete set null,
  name text not null, email text not null, phone text, portfolio_url text,
  cover_letter text, cv_url text, status text not null default 'Received',
  created_at timestamptz not null default now()
);
do $$
declare t text;
begin
  foreach t in array array['contact_messages','quote_requests','job_applications']
  loop
    execute format('grant insert on public.%I to anon, authenticated;', t);
    execute format('grant select, update, delete on public.%I to authenticated;', t);
    execute format('grant all on public.%I to service_role;', t);
    execute format('alter table public.%I enable row level security;', t);
    execute format('create policy "anyone submit %1$s" on public.%1$I for insert with check (true);', t);
    execute format('create policy "staff read %1$s" on public.%1$I for select to authenticated using (public.is_staff(auth.uid()));', t);
    execute format('create policy "admin manage %1$s" on public.%1$I for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));', t);
  end loop;
end $$;

-- CLIENT PORTAL
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  company_name text not null, contact_name text, email text, phone text,
  industry text, notes text, status text not null default 'Active',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.client_projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null, description text, status text not null default 'In Progress',
  progress int not null default 0, start_date date, expected_completion date,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.client_projects(id) on delete cascade,
  title text not null, description text, status text not null default 'Pending',
  due_date date, sort_order int not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.project_documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.client_projects(id) on delete cascade,
  title text not null, file_path text, file_type text, visible_to_client boolean not null default true,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create table public.project_messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.client_projects(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete set null,
  sender_name text, body text not null, created_at timestamptz not null default now()
);
create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid references public.client_projects(id) on delete set null,
  subject text not null, description text, priority text not null default 'Normal',
  status text not null default 'Open',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid references public.client_projects(id) on delete set null,
  currency text not null default 'KES', subtotal numeric(12,2) not null default 0,
  tax numeric(12,2) not null default 0, total numeric(12,2) not null default 0,
  status text not null default 'Draft', issue_date date default current_date, due_date date,
  notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  description text not null, quantity numeric(10,2) not null default 1,
  unit_price numeric(12,2) not null default 0, amount numeric(12,2) not null default 0
);
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  amount numeric(12,2) not null, method text default 'M-Pesa', reference text,
  paid_at timestamptz not null default now()
);

create or replace function public.owns_client(_client_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.clients c where c.id = _client_id and c.user_id = auth.uid())
$$;
create or replace function public.owns_project(_project_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.client_projects p join public.clients c on c.id = p.client_id
    where p.id = _project_id and c.user_id = auth.uid())
$$;
create or replace function public.owns_invoice(_invoice_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.invoices i join public.clients c on c.id = i.client_id
    where i.id = _invoice_id and c.user_id = auth.uid())
$$;

do $$
declare t text;
begin
  foreach t in array array['clients','client_projects','project_milestones','project_documents','project_messages','support_tickets','invoices','invoice_items','payments']
  loop
    execute format('grant select, insert, update, delete on public.%I to authenticated;', t);
    execute format('grant all on public.%I to service_role;', t);
    execute format('alter table public.%I enable row level security;', t);
    execute format('create policy "staff all %1$s" on public.%1$I for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));', t);
  end loop;
end $$;

create policy "client reads own client" on public.clients for select to authenticated using (user_id = auth.uid());
create policy "client reads own projects" on public.client_projects for select to authenticated using (public.owns_client(client_id));
create policy "client reads own milestones" on public.project_milestones for select to authenticated using (public.owns_project(project_id));
create policy "client reads own documents" on public.project_documents for select to authenticated using (visible_to_client and public.owns_project(project_id));
create policy "client reads own messages" on public.project_messages for select to authenticated using (public.owns_project(project_id));
create policy "client sends messages" on public.project_messages for insert to authenticated with check (public.owns_project(project_id) and sender_id = auth.uid());
create policy "client reads own tickets" on public.support_tickets for select to authenticated using (public.owns_client(client_id));
create policy "client creates tickets" on public.support_tickets for insert to authenticated with check (public.owns_client(client_id));
create policy "client reads own invoices" on public.invoices for select to authenticated using (public.owns_client(client_id));
create policy "client reads own invoice items" on public.invoice_items for select to authenticated using (public.owns_invoice(invoice_id));
create policy "client reads own payments" on public.payments for select to authenticated using (public.owns_invoice(invoice_id));

create trigger touch_clients before update on public.clients for each row execute function public.touch_updated_at();
create trigger touch_client_projects before update on public.client_projects for each row execute function public.touch_updated_at();
create trigger touch_support_tickets before update on public.support_tickets for each row execute function public.touch_updated_at();
create trigger touch_invoices before update on public.invoices for each row execute function public.touch_updated_at();

-- SEED
insert into public.company_settings (company_name, tagline, description, email, phone, address, linkedin_url)
values ('Daylight','Software that runs the business','Daylight is a Kenyan software company building custom business software, web and mobile applications, and its own SaaS products.','daylightcompany13@gmail.co','+254 700 000 000','Nairobi, Kenya','https://linkedin.com');

insert into public.services (title, slug, summary, description, icon, features, sort_order) values
('Custom Business Software','custom-business-software','Systems built around how your business actually works.','We design and build operational systems — inventory, POS, HR, school management, membership, logistics — tailored to your workflows instead of forcing you into someone else''s.','Boxes','{"Requirements & process mapping","Custom database design","Role-based access","Reporting dashboards"}',1),
('Web Applications','web-applications','Fast, secure web platforms and company websites.','From marketing sites to complex portals, we build responsive web applications engineered for speed, search visibility and reliability.','Globe','{"Company websites","Client portals","Admin dashboards","SEO & performance"}',2),
('Mobile Applications','mobile-applications','Android and iOS apps that people actually use.','Native and cross-platform mobile apps with offline support, payments and clean interfaces.','Smartphone','{"Android & iOS","Offline-first","Push notifications","App store deployment"}',3),
('SaaS Development','saas-development','Turn a product idea into a subscription business.','Multi-tenant architecture, billing, onboarding and analytics — the full stack behind a software product.','Layers','{"Multi-tenant architecture","Subscription billing","Usage analytics","Product onboarding"}',4),
('AI & Automation','ai-automation','Remove the repetitive work from your operations.','Document processing, chat assistants, smart search and workflow automation wired into your existing systems.','Sparkles','{"AI assistants","Document processing","Workflow automation","Smart search"}',5),
('E-Commerce','e-commerce','Sell online with payments that work in Kenya.','Online stores with M-Pesa and card payments, inventory sync, delivery and order management.','ShoppingCart','{"M-Pesa & card payments","Inventory sync","Order management","Delivery tracking"}',6),
('API & Integrations','api-integrations','Make your systems talk to each other.','We connect payment providers, accounting tools, SMS gateways and third-party platforms into one coherent flow.','Plug','{"Payment gateways","SMS & email gateways","Accounting sync","Third-party APIs"}',7),
('Cloud, Deployment & Support','cloud-deployment-support','We stay after launch.','Deployment, monitoring, backups, security updates and ongoing support so your system keeps running.','Server','{"Cloud deployment","Monitoring & backups","Security updates","Ongoing support"}',8);

insert into public.industries (name, slug, summary, icon, sort_order) values
('SMEs','smes','Operational systems for growing businesses.','Building2',1),
('Schools','schools','Student, fee and academic management platforms.','GraduationCap',2),
('Churches & Organizations','churches-organizations','Membership, giving and event systems.','Users',3),
('NGOs','ngos','Programme, beneficiary and reporting tools.','HeartHandshake',4),
('Startups','startups','MVPs and product engineering from zero to launch.','Rocket',5),
('Retail','retail','POS, inventory and online storefronts.','Store',6),
('Professional Services','professional-services','Client, billing and case management.','Briefcase',7);

insert into public.technologies (name, category, sort_order) values
('PHP','Backend',1),('Laravel','Backend',2),('Node.js','Backend',3),('Python','Backend',4),
('React','Frontend',5),('TypeScript','Frontend',6),('Tailwind CSS','Frontend',7),
('PostgreSQL','Database',8),('MySQL','Database',9),('Redis','Database',10),
('Android','Mobile',11),('iOS','Mobile',12),('Flutter','Mobile',13),
('Docker','DevOps',14),('Linux VPS','DevOps',15),('GitHub Actions','DevOps',16),
('M-Pesa Daraja','Integrations',17),('Stripe','Integrations',18),('Africa''s Talking','Integrations',19);

insert into public.portfolio_projects (title, slug, client_name, industry, summary, problem, solution, outcome, technologies, features, status, featured, sort_order) values
('Shulesoft Academic Portal','shulesoft-academic-portal','Sample School Group','Schools','A school management portal for fees, results and parent communication.','Fee tracking lived in spreadsheets and parents had no visibility into balances or results.','A single portal with student records, fee statements, results publishing and SMS notifications to parents.','Fee collection cycles shortened and the office stopped rebuilding reports by hand.','{"Laravel","MySQL","Tailwind CSS"}','{"Student records","Fee statements","Results publishing","Parent SMS"}','Live',true,1),
('Mauzo Retail POS','mauzo-retail-pos','Sample Retail Chain','Retail','Point of sale and inventory across multiple shop branches.','Stock counts differed between branches and daily sales were reconciled manually.','An offline-capable POS with central inventory, branch transfers and daily sales reporting.','Stock accuracy improved and branch reports arrive automatically each evening.','{"React","Node.js","PostgreSQL"}','{"Offline POS","Multi-branch stock","M-Pesa payments","Daily reports"}','Live',true,2),
('Jamii Church Platform','jamii-church-platform','Sample Church','Churches & Organizations','Membership, giving and events for a growing congregation.','Member records and giving were spread across notebooks and phone messages.','A membership database with giving records, small groups, events and giving statements.','Leadership can see attendance and giving trends in one place.','{"Laravel","MySQL","Alpine.js"}','{"Member directory","Giving records","Events","Statements"}','Live',false,3),
('Afya Clinic Manager','afya-clinic-manager','Sample Clinic','Professional Services','Patient scheduling, records and billing for a private clinic.','Paper files slowed down consultations and billing errors were common.','Digital patient records, appointment scheduling, prescriptions and invoicing in one system.','Consultation turnaround improved and billing is now traceable per visit.','{"React","Node.js","PostgreSQL"}','{"Patient records","Scheduling","Prescriptions","Billing"}','In Development',false,4);

insert into public.saas_products (name, slug, tagline, description, features, status, sort_order) values
('Daylight Books','daylight-books','Simple accounting for Kenyan small businesses','Invoicing, expenses, M-Pesa reconciliation and tax-ready reports built for SMEs.','{"Invoicing & quotes","M-Pesa reconciliation","Expense tracking","Tax-ready reports"}','In Development',1),
('Daylight Desk','daylight-desk','Support ticketing for small teams','A lightweight helpdesk with email, WhatsApp and web intake in one shared inbox.','{"Shared inbox","WhatsApp intake","SLA timers","Customer history"}','Coming Soon',2),
('Daylight Sites','daylight-sites','Managed websites for organizations','Hosted, maintained and updated websites for schools, churches and small businesses.','{"Managed hosting","Content editing","SEO basics","Monthly maintenance"}','Beta',3);

insert into public.blog_posts (title, slug, excerpt, body, category, tags, author_name, published, published_at) values
('Why custom software beats another spreadsheet','why-custom-software-beats-spreadsheets','Spreadsheets are where good processes go to quietly break. Here is how to know when it is time to build.','Spreadsheets are excellent until three people need the same file at once. This piece walks through the signals that a business has outgrown them: duplicated data entry, month-end reconciliations that take days, and reports nobody trusts. We look at what a purpose-built system changes, what it costs, and how to phase the move so operations never stop.','Engineering','{"custom software","operations"}','Daylight Team',true,now() - interval '10 days'),
('Accepting M-Pesa payments in your product','accepting-mpesa-payments','A practical look at integrating Daraja into a production application without surprises.','M-Pesa integration looks simple until you meet timeouts, duplicate callbacks and reconciliation. We cover STK push, callback idempotency, ledger design and what to log so support can answer customer questions confidently.','Integrations','{"m-pesa","payments","api"}','Daylight Team',true,now() - interval '24 days'),
('What we look for before starting a project','discovery-before-development','Discovery is not paperwork. It is the cheapest place to be wrong.','Before a line of code, we map the process, the people and the data. This post explains our discovery checklist and why projects that skip it almost always cost more.','Process','{"discovery","planning"}','Daylight Team',true,now() - interval '40 days');

insert into public.team_members (name, role, bio, sort_order) values
('Placeholder Founder','Founder & Lead Engineer','Replace this with a real team member profile.',1),
('Placeholder Engineer','Software Engineer','Replace this with a real team member profile.',2);

insert into public.testimonials (name, company, role, quote, sort_order) values
('Sample Client','Sample Retail Chain','Operations Manager','They understood our branch operations before proposing anything. The system fits how we actually work.',1),
('Sample Client','Sample School Group','Administrator','Fee statements that used to take days now take minutes. Parents finally have visibility.',2),
('Sample Client','Sample Church','Church Administrator','Clear communication throughout, and they stayed with us after launch.',3);

insert into public.faqs (question, answer, category, sort_order) values
('How long does a typical project take?','A focused website takes 2–4 weeks. A custom business system usually runs 8–16 weeks depending on scope, and we deliver in phases so you see progress early.','Projects',1),
('What does a project cost?','Small websites start around KSh 50,000. Custom business systems typically range from KSh 300,000 upwards. We give a fixed quote after discovery.','Pricing',2),
('Do you support the system after launch?','Yes. We offer monthly maintenance covering hosting, monitoring, backups, security updates and a set number of support hours.','Support',3),
('Who owns the code?','You do. On final payment, source code and infrastructure access are handed over to you.','Legal',4),
('Can you work with our existing system?','Often yes. We can integrate with your current tools through APIs, or migrate your data into a new system.','Projects',5);

insert into public.job_openings (title, slug, department, location, employment_type, description, requirements, status) values
('Laravel Engineer','laravel-engineer','Engineering','Nairobi (Hybrid)','Full-time','Build and maintain client business systems end to end.','{"3+ years PHP/Laravel","Strong SQL","Experience with payment integrations"}','Open'),
('Frontend Engineer','frontend-engineer','Engineering','Nairobi (Hybrid)','Full-time','Build interfaces that are fast, accessible and pleasant to use.','{"React & TypeScript","Strong CSS fundamentals","Eye for detail"}','Open'),
('Product Designer','product-designer','Design','Remote (Kenya)','Contract','Design product interfaces for our SaaS products and client systems.','{"Portfolio of shipped product work","Figma","Systems thinking"}','Open');
