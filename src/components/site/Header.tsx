import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Insights" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { user, isStaff } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
            D
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Daylight</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground ${
                pathname.startsWith(item.to) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Switch theme"
            className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to={user ? (isStaff ? '/admin' : '/portal') : '/auth'} className="hidden sm:block">
            <Button variant="outline" size="sm">
              {user ? (isStaff ? "Admin" : "Client portal") : "Sign in"}
            </Button>
          </Link>
          <Link to="/quote" className="hidden sm:block">
            <Button size="sm" className="gap-1.5">
              Start a project <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-md border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="border-b border-border/60 py-3 text-sm text-muted-foreground">
              Contact
            </Link>
            <div className="flex gap-2 py-4">
              <Link to="/quote" onClick={() => setOpen(false)} className="flex-1">
                <Button className="w-full">Start a project</Button>
              </Link>
              <Link to={user ? (isStaff ? '/admin' : '/portal') : '/auth'} onClick={() => setOpen(false)} className="flex-1">
                <Button variant="outline" className="w-full">
                  {user ? "My account" : "Sign in"}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
