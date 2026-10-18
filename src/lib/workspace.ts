import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Generic form descriptors intentionally use the existing database client and RLS.
export const workspaceDb: SupabaseClient = supabase;
export type RecordRow = Record<string, unknown> & { id: string };
export type Field = { key: string; label: string; type?: 'text' | 'textarea' | 'number' | 'date' | 'boolean' | 'array'; required?: boolean; ref?: string };
export type Resource = { table: string; title: string; fields: Field[]; adminOnly?: boolean };
const f = (key: string, type: Field['type'] = 'text', required = false, ref?: string): Field => ({ key, label: key.replaceAll('_', ' ').replace(/^./, c => c.toUpperCase()), ...(type ? {type} : {}), required, ...(ref ? {ref} : {}) });
const publishing = [f('published', 'boolean'), f('sort_order', 'number')];
export const resources: Record<string, Resource> = {
 services: { table: 'services', title: 'Services', adminOnly: true, fields: [f('title','text',true),f('slug','text',true),f('summary','textarea'),f('description','textarea'),f('features','array'),...publishing] },
 industries: { table:'industries', title:'Industries',adminOnly:true,fields:[f('name','text',true),f('slug','text',true),f('summary','textarea'),f('description','textarea'),...publishing]},
 technologies:{table:'technologies',title:'Technologies',adminOnly:true,fields:[f('name','text',true),f('category'),...publishing]},
 work:{table:'portfolio_projects',title:'Portfolio',adminOnly:true,fields:[f('title','text',true),f('slug','text',true),f('client_name'),f('industry'),f('summary','textarea'),f('problem','textarea'),f('solution','textarea'),f('outcome','textarea'),f('technologies','array'),f('features','array'),f('status'),f('live_url'),f('cover_url'),f('featured','boolean'),...publishing]},
 products:{table:'saas_products',title:'Products',adminOnly:true,fields:[f('name','text',true),f('slug','text',true),f('tagline'),f('description','textarea'),f('features','array'),f('status'),f('product_url'),...publishing]},
 blog:{table:'blog_posts',title:'Insights',adminOnly:true,fields:[f('title','text',true),f('slug','text',true),f('excerpt','textarea'),f('body','textarea'),f('category'),f('tags','array'),f('author_name'),f('published_at','date'),f('published','boolean')]},
 team:{table:'team_members',title:'Team',adminOnly:true,fields:[f('name','text',true),f('role'),f('bio','textarea'),...publishing]},
 testimonials:{table:'testimonials',title:'Testimonials',adminOnly:true,fields:[f('name','text',true),f('company'),f('role'),f('quote','textarea',true),f('rating','number'),...publishing]},
 faqs:{table:'faqs',title:'FAQs',adminOnly:true,fields:[f('question','text',true),f('answer','textarea',true),f('category'),...publishing]},
 jobs:{table:'job_openings',title:'Job openings',adminOnly:true,fields:[f('title','text',true),f('slug','text',true),f('department'),f('location'),f('employment_type'),f('description','textarea'),f('requirements','array'),f('status')]},
 settings:{table:'company_settings',title:'Company details',adminOnly:true,fields:[f('company_name','text',true),f('tagline'),f('description','textarea'),f('email'),f('phone'),f('address'),f('whatsapp'),f('linkedin_url'),f('twitter_url'),f('github_url')]},
 contacts:{table:'contact_messages',title:'Contact submissions',fields:[f('name','text',true),f('email','text',true),f('company'),f('subject'),f('message','textarea',true),f('status')]},
 quotes:{table:'quote_requests',title:'Quote requests',fields:[f('name','text',true),f('email','text',true),f('company'),f('project_type'),f('budget_range'),f('timeline'),f('details','textarea'),f('status')]},
 applications:{table:'job_applications',title:'Job applications',fields:[f('name','text',true),f('email','text',true),f('job_id','text',false,'job_openings'),f('portfolio_url'),f('cover_letter','textarea'),f('status')]},
 clients:{table:'clients',title:'Clients',fields:[f('company_name','text',true),f('contact_name'),f('email'),f('phone'),f('industry'),f('notes','textarea'),f('status')]},
 projects:{table:'client_projects',title:'Projects',fields:[f('client_id','text',true,'clients'),f('name','text',true),f('description','textarea'),f('status'),f('progress','number'),f('start_date','date'),f('expected_completion','date')]},
 milestones:{table:'project_milestones',title:'Milestones',fields:[f('project_id','text',true,'client_projects'),f('title','text',true),f('description','textarea'),f('status'),f('due_date','date'),f('sort_order','number')]},
 documents:{table:'project_documents',title:'Documents',fields:[f('project_id','text',true,'client_projects'),f('title','text',true),f('visible_to_client','boolean')]},
 messages:{table:'project_messages',title:'Messages',fields:[f('project_id','text',true,'client_projects'),f('body','textarea',true)]},
 tickets:{table:'support_tickets',title:'Support tickets',fields:[f('client_id','text',true,'clients'),f('project_id','text',false,'client_projects'),f('subject','text',true),f('description','textarea'),f('priority'),f('status')]},
 invoices:{table:'invoices',title:'Invoices',fields:[f('invoice_number','text',true),f('client_id','text',true,'clients'),f('project_id','text',false,'client_projects'),f('currency'),f('subtotal','number'),f('tax','number'),f('status'),f('issue_date','date'),f('due_date','date'),f('notes','textarea')]},
 items:{table:'invoice_items',title:'Invoice line items',fields:[f('invoice_id','text',true,'invoices'),f('description','text',true),f('quantity','number'),f('unit_price','number')]},
 payments:{table:'payments',title:'Payment records',fields:[f('invoice_id','text',true,'invoices'),f('amount','number',true),f('method'),f('reference')]},
};
export const labelOf = (row: Record<string, unknown>) => String(row['title'] ?? row['name'] ?? row['company_name'] ?? row['invoice_number'] ?? row['subject'] ?? row['question'] ?? row['description'] ?? row['body'] ?? row['company_name'] ?? row['id']);
export function invoiceTotal(subtotal: number, tax: number) { return Math.round((subtotal + tax) * 100) / 100; }
export function progressValid(progress: number) { return Number.isInteger(progress) && progress >= 0 && progress <= 100; }