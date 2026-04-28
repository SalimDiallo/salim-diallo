import { DATA } from "@/data/resume";
import Link from "next/link";

export default function SiteFooter() {
  const socials = Object.entries(DATA.contact.social).filter(
    ([, social]) => social.navbar,
  );
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 pt-8 border-t border-border/60">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
        {/* Left — copyright + meta */}
        <div className="flex flex-col gap-1">
          <p className="font-mono">
            <span className="text-foreground/70">©</span> {year}{" "}
            <span className="text-foreground/80">{DATA.name}</span>
          </p>
          <p className="font-mono text-[11px] tracking-tight">
            {DATA.location} 
          </p>
        </div>

        {/* Right — socials */}
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {socials.map(([key, social]) => {
            const Icon = social.icon;
            const isExternal = social.url.startsWith("http");
            return (
              <li key={key}>
                <Link
                  href={social.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  className="group inline-flex items-center gap-1.5 hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                >
                  <Icon className="size-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="font-mono text-[11px] tracking-tight">
                    {social.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
