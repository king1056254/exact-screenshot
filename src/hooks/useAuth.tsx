import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Role = "super_admin" | "admin" | "staff" | "client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      if (!nextSession?.user) {
        setRoles([]);
        setLoading(false);
        return;
      }
      setTimeout(() => {
        void supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", nextSession.user.id)
          .then(({ data }) => {
            setRoles((data ?? []).map((r) => r.role as Role));
            setLoading(false);
          });
      }, 0);
    });

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (!data.session?.user) setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const isStaff = roles.some((r) => r === "super_admin" || r === "admin" || r === "staff");
  const isAdmin = roles.some((r) => r === "super_admin" || r === "admin");

  return { session, user, roles, loading, isStaff, isAdmin };
}
