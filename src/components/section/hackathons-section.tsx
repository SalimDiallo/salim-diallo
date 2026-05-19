/* eslint-disable @next/next/no-img-element */
import {
  Timeline,
  TimelineConnectItem,
  TimelineItem,
} from "@/components/timeline";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { Trophy } from "lucide-react";
import Link from "next/link";

type HackathonLink = {
  href: string;
  title: string;
  icon?: React.ReactNode;
};

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-6 w-full">
        <div className="flex flex-col gap-y-2">
          <div className="font-mono text-xs text-muted-foreground flex items-center gap-2 overflow-hidden">
            <span aria-hidden>#</span>
            <span aria-hidden>──</span>
            <span>hackathons</span>
            <span aria-hidden className="flex-1 truncate text-border">
              ──────────────────────────────────────────────
            </span>
          </div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span aria-hidden className="text-muted-foreground">●</span>
            Hackathons &amp; concours
          </h2>
          <p className="text-sm text-muted-foreground">
            Construire vite, en équipe, sous contrainte.
          </p>
        </div>
        <Timeline>
          {DATA.hackathons.map((hackathon) => (
            <TimelineItem
              key={hackathon.title + hackathon.dates}
              className="w-full flex items-start justify-between gap-10"
            >
              <TimelineConnectItem className="flex items-start justify-center">
                {hackathon.image ? (
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                  />
                ) : (
                  <div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none flex items-center justify-center text-muted-foreground">
                    <Trophy className="size-4" aria-hidden />
                  </div>
                )}
              </TimelineConnectItem>
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                {hackathon.dates && (
                  <time className="text-xs text-muted-foreground">
                    {hackathon.dates}
                  </time>
                )}
                {hackathon.title && (
                  <h3 className="font-semibold leading-none">
                    {hackathon.title}
                  </h3>
                )}
                {hackathon.location && (
                  <p className="text-sm text-muted-foreground">
                    {hackathon.location}
                  </p>
                )}
                {hackathon.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                    {hackathon.description}
                  </p>
                )}
                {hackathon.links && hackathon.links.length > 0 && (
                  <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                    {(hackathon.links as readonly HackathonLink[]).map(
                      (link, idx) => (
                        <Link
                          href={link.href}
                          key={idx}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground">
                            {link.icon}
                            {link.title}
                          </Badge>
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
