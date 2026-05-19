"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function tooltipLabel(label: string, href: string): string {
  if (href === "/") return "~";
  if (href.startsWith("/#")) return href.slice(1);
  if (href.startsWith("/")) return href;
  return label.toLowerCase();
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <Dock className="z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 border border-border bg-card/90 backdrop-blur-xl">
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          const isAnchor = item.href.startsWith("/#");
          const targetPath = isAnchor ? "/" : item.href;
          const isActive =
            !isExternal &&
            (item.href === "/"
              ? pathname === "/"
              : pathname === targetPath ||
                pathname.startsWith(`${targetPath}/`));

          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  <DockIcon
                    className={cn(
                      "rounded-3xl cursor-pointer size-full p-0 backdrop-blur-3xl border transition-colors",
                      isActive
                        ? "bg-foreground/5 text-foreground border-foreground/30"
                        : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted border-border",
                    )}
                  >
                    <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-md border border-border bg-card text-foreground px-2.5 py-1 text-xs font-mono shadow-none"
              >
                <p>{tooltipLabel(item.label, item.href)}</p>
                <TooltipArrow className="fill-card" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-md border border-border bg-card text-foreground px-2.5 py-1 text-xs font-mono shadow-none"
          >
            <p>theme</p>
            <TooltipArrow className="fill-card" />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
