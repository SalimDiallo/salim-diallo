import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Code2, Database, Workflow, type LucideIcon } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

type CategoryKey = "data" | "software" | "devops";

type CategoryMeta = {
  label: string;
  icon: LucideIcon;
  // Tailwind classes — kept literal so JIT picks them up.
  pill: string;
  iconWrap: string;
};

const PILL = "border-border bg-card hover:bg-accent/40 hover:ring-border";
const ICON_WRAP = "border-border bg-background text-foreground";

const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  data: { label: "data", icon: Database, pill: PILL, iconWrap: ICON_WRAP },
  software: { label: "software", icon: Code2, pill: PILL, iconWrap: ICON_WRAP },
  devops: { label: "devops", icon: Workflow, pill: PILL, iconWrap: ICON_WRAP },
};

const CATEGORY_ORDER: CategoryKey[] = ["data", "software", "devops"];

type Skill = (typeof DATA.skills)[number];

export default function SkillsSection() {
  // Group skills by category, falling back to "software" if missing.
  const grouped: Record<CategoryKey, Skill[]> = {
    data: [],
    software: [],
    devops: [],
  };
  for (const skill of DATA.skills) {
    const raw =
      "category" in skill && typeof skill.category === "string"
        ? skill.category
        : "software";
    const safe: CategoryKey = (
      CATEGORY_ORDER as string[]
    ).includes(raw)
      ? (raw as CategoryKey)
      : "software";
    grouped[safe].push(skill);
  }

  let globalIndex = 0;

  return (
    <div className="flex min-h-0 flex-col gap-y-5">
      <BlurFade delay={BLUR_FADE_DELAY * 9}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span aria-hidden className="text-muted-foreground">●</span>
          Compétences
          <span className="font-mono bg-card border border-border rounded-md px-2 py-0.5 text-muted-foreground text-sm">
            {DATA.skills.length}
          </span>
        </h2>
      </BlurFade>

      <div className="flex flex-col gap-5">
        {CATEGORY_ORDER.map((key) => {
          const meta = CATEGORIES[key];
          const items = grouped[key];
          if (!items || items.length === 0) return null;
          const HeaderIcon = meta.icon;

          return (
            <div key={key} className="flex flex-col gap-2.5">
              <BlurFade delay={BLUR_FADE_DELAY * (10 + globalIndex * 0.5)}>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-7 rounded-md border flex items-center justify-center",
                      meta.iconWrap,
                    )}
                  >
                    <HeaderIcon className="size-3.5" aria-hidden />
                  </span>
                  <span className="font-mono text-sm font-medium text-foreground">
                    {meta.label}
                  </span>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    ({items.length})
                  </span>
                </div>
              </BlurFade>

              <div className="flex flex-wrap gap-2">
                {items.map((skill) => {
                  const Icon = "icon" in skill ? skill.icon : null;
                  globalIndex += 1;
                  return (
                    <BlurFade
                      key={skill.name}
                      delay={BLUR_FADE_DELAY * 10 + globalIndex * 0.04}
                    >
                      <div
                        className={cn(
                          "border ring-2 ring-transparent rounded-xl h-8 w-fit px-3 flex items-center gap-2 transition-all duration-200",
                          meta.pill,
                        )}
                      >
                        {Icon && (
                          <Icon className="size-4 rounded overflow-hidden object-contain" />
                        )}
                        <span className="text-foreground text-sm font-medium">
                          {skill.name}
                        </span>
                      </div>
                    </BlurFade>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
