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
    let active = true;
    let version = 0;
    const resolve = async (nextSession: Session | null) => {
      const current = ++version;
      if (!active) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setRoles([]);
      if (!nextSession?.user) { setLoading(false); return; }
      setLoading(true);
      try {
        const { data, error } = await supabase.from('user_roles').select('role').eq('user_id', nextSession.user.id);
        if (active && current === version) setRoles(error ? [] : (data ?? []).map(r => r.role as Role));
      } finally { if (active && current === version) setLoading(false); }
    };
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (_event === 'TOKEN_REFRESHED') { setSession(nextSession); return; }
      setTimeout(() => { void resolve(nextSession); }, 0);
    });

    void supabase.auth.getSession().then(({ data }) => {
      void resolve(data.session);
    });

    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  const isStaff = roles.some((r) => r === "super_admin" || r === "admin" || r === "staff");
  const isAdmin = roles.some((r) => r === "super_admin" || r === "admin");

  return { session, user, roles, loading, isStaff, isAdmin };
}
