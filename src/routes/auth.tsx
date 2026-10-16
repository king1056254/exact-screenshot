import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteLayout, Section } from "@/components/site/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Daylight client portal" },
      { name: "description", content: "Sign in to the Daylight client portal to follow your projects and invoices." },
      { property: "og:title", content: "Sign in — Daylight" },
      { property: "og:description", content: "Access the Daylight client portal." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, isStaff, loading } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    setBusy(true);
    const { error } =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin, data: { full_name: String(fd.get("name") ?? "") } },
          });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    if (mode === "up") toast.success("Check your email to confirm your account.");
  }

  return (
    <SiteLayout>
      <Section className="max-w-md">
        {loading ? null : user ? (
          <div className="rounded-xl border border-border bg-card p-8">
            <h1 className="text-2xl font-semibold">You're signed in</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {user.email} · {isStaff ? "Staff account" : "Client account"}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Your {isStaff ? "admin area" : "client portal"} is being built and will appear here shortly.
            </p>
            <Button variant="outline" className="mt-6" onClick={() => supabase.auth.signOut()}>
              Sign out
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5 rounded-xl border border-border bg-card p-8">
            <h1 className="text-2xl font-semibold">{mode === "in" ? "Sign in" : "Create an account"}</h1>
            {mode === "up" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" minLength={8} required />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
            </Button>
            <button
              type="button"
              onClick={() => setMode(mode === "in" ? "up" : "in")}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
            >
              {mode === "in" ? "New client? Create an account" : "Already have an account? Sign in"}
            </button>
          </form>
        )}
      </Section>
    </SiteLayout>
  );
}
