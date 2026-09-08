import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";

const groups = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/careers", label: "Careers" },
      { to: "/blog", label: "Insights" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "What we do",
    links: [
      { to: "/services", label: "Services" },
      { to: "/work", label: "Our work" },
      { to: "/products", label: "SaaS products" },
      { to: "/technologies", label: "Technologies" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/industries", label: "Industries" },
      { to: "/faq", label: "FAQ" },
      { to: "/quote", label: "Request a quote" },
      { to: "/privacy", label: "Privacy policy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
                D
              </span>
              <span className="font-display text-lg font-semibold">Daylight</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A Kenyan software company building custom business systems, web and mobile
              applications, and our own SaaS products.
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> daylightcompany13@gmail.co
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Nairobi, Kenya
              </p>
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-sm font-semibold">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Daylight. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
