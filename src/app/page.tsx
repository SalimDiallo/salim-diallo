/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import CertificationsSummary from "@/components/section/certifications-summary";
import ClubsSection from "@/components/section/clubs-section";
import ContactSection from "@/components/section/contact-section";
import ExploreSection from "@/components/section/explore-section";
import HackathonsSection from "@/components/section/hackathons-section";
import HeroHeading from "@/components/section/hero-heading";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl">
          <div className="gap-6 flex flex-col-reverse md:flex-row md:items-start md:justify-between">
            <div className="flex-1 min-w-0">
              <HeroHeading
                firstName={DATA.name.split(" ")[0]}
                lastName={DATA.name.split(" ").slice(1).join(" ")}
                location={DATA.location}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="shrink-0">
              <div className="relative group">
                {/* Soft glow */}
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-linear-to-tr from-emerald-500/20 via-foreground/10 to-transparent blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* Gradient ring */}
                <div
                  aria-hidden
                  className="absolute -inset-1 rounded-full bg-linear-to-br from-foreground via-muted-foreground to-foreground/30 opacity-90"
                />
                <Avatar className="relative size-28 md:size-36 rounded-full shadow-xl ring-4 ring-background transition-transform duration-500 group-hover:scale-[1.03]">
                  <AvatarImage
                    alt={DATA.name}
                    src={DATA.avatarUrl}
                    className="rounded-full"
                  />
                  <AvatarFallback className="font-display font-bold text-lg">
                    {DATA.initials}
                  </AvatarFallback>
                </Avatar>
                {/* Live status dot */}
                <span
                  className="absolute bottom-1 right-1 md:bottom-1.5 md:right-1.5 flex size-3.5 md:size-4"
                  aria-label="Disponible"
                >
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                  <span className="relative size-3.5 md:size-4 rounded-full bg-emerald-500 ring-2 ring-background" />
                </span>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">À propos</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Expériences professionnelles</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Études</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target={education.href.startsWith("http") ? "_blank" : undefined}
                  rel={education.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Compétences</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => {
              const Icon = "icon" in skill ? skill.icon : null;
              return (
                <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                    {Icon && <Icon className="size-4 rounded overflow-hidden object-contain" />}
                    <span className="text-foreground text-sm font-medium">{skill.name}</span>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>
      <section id="certifications">
        <BlurFade delay={BLUR_FADE_DELAY * 10.3}>
          <CertificationsSummary />
        </BlurFade>
      </section>
      <section id="clubs">
        <BlurFade delay={BLUR_FADE_DELAY * 10.6}>
          <ClubsSection />
        </BlurFade>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection limit={4} showSeeAll />
        </BlurFade>
      </section>
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>
      <section id="explore">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <ExploreSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
