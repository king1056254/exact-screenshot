import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

async function listOrThrow<T>(promise: PromiseLike<{ data: T | null; error: { message: string } | null }>) {
  const { data, error } = await promise;
  if (error) throw new Error(error.message);
  return (data ?? []) as T;
}

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: () =>
    listOrThrow(supabase.from("services").select("*").eq("published", true).order("sort_order")),
});

export const industriesQuery = queryOptions({
  queryKey: ["industries"],
  queryFn: () =>
    listOrThrow(supabase.from("industries").select("*").eq("published", true).order("sort_order")),
});

export const technologiesQuery = queryOptions({
  queryKey: ["technologies"],
  queryFn: () =>
    listOrThrow(
      supabase.from("technologies").select("*").eq("published", true).order("sort_order"),
    ),
});

export const portfolioQuery = queryOptions({
  queryKey: ["portfolio"],
  queryFn: () =>
    listOrThrow(
      supabase.from("portfolio_projects").select("*").eq("published", true).order("sort_order"),
    ),
});

export const productsQuery = queryOptions({
  queryKey: ["saas_products"],
  queryFn: () =>
    listOrThrow(
      supabase.from("saas_products").select("*").eq("published", true).order("sort_order"),
    ),
});

export const postsQuery = queryOptions({
  queryKey: ["blog_posts"],
  queryFn: () =>
    listOrThrow(
      supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false }),
    ),
});

export const teamQuery = queryOptions({
  queryKey: ["team_members"],
  queryFn: () =>
    listOrThrow(
      supabase.from("team_members").select("*").eq("published", true).order("sort_order"),
    ),
});

export const testimonialsQuery = queryOptions({
  queryKey: ["testimonials"],
  queryFn: () =>
    listOrThrow(
      supabase.from("testimonials").select("*").eq("published", true).order("sort_order"),
    ),
});

export const faqsQuery = queryOptions({
  queryKey: ["faqs"],
  queryFn: () =>
    listOrThrow(supabase.from("faqs").select("*").eq("published", true).order("sort_order")),
});

export const jobsQuery = queryOptions({
  queryKey: ["job_openings"],
  queryFn: () =>
    listOrThrow(supabase.from("job_openings").select("*").eq("status", "Open").order("title")),
});
