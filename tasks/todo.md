# TODO — Refonte sobre + touche geek (branche `dev`)

Demande utilisateur : couleurs plus sobres (surtout retirer les gradients),
moins de texte sur la page d'accueil + sections, et ajouter une touche geek
(monospace, préfixes terminal, ASCII box-drawing, curseur clignotant).
Portée : **page d'accueil + sections uniquement** (pas `/videos`, `/blog`, etc.).

## 1. Neutraliser les gradients

- [ ] `src/app/page.tsx:38` — supprimer `bg-linear-to-tr from-emerald-500/20 via-foreground/10` (glow autour de l'avatar)
- [ ] `src/app/page.tsx:43` — supprimer `bg-linear-to-br from-foreground via-muted-foreground` (ring avatar) → ring simple `border-border`
- [ ] `src/components/section/certifications-summary.tsx:50` — `bg-linear-to-br from-card via-card to-accent/30` → `bg-card`
- [ ] `src/components/section/certifications-summary.tsx:53` — supprimer le blur emerald-500/10
- [ ] `src/components/section/projects-section.tsx:36,42` — gradients h-px → simple `bg-border`
- [ ] `src/components/section/hackathons-section.tsx:24,30` — idem

## 2. Désaturer les accents emerald (garder uniquement sur le status dot)

- [ ] `src/components/section/skills-section.tsx` — pills `data` : emerald → neutre (`border-border bg-card`), garder dot mono pour la catégorie
- [ ] `src/components/section/skills-section.tsx` — pills `software` (sky) et `devops` (amber) : neutraliser aussi pour cohérence
- [ ] `src/components/section/certifications-summary.tsx:56` — icône Trophy `text-emerald-600` → `text-foreground`
- [ ] Garder `bg-emerald-500` sur le status dot de `hero-heading.tsx` (seul point d'accent vert)

## 3. Touche geek

- [ ] `src/app/page.tsx` — préfixes terminal sur les h2 (`$ about`, `$ work`, `$ skills`, ...) en font-mono, muted-foreground pour le `$`
- [ ] `src/components/section/hero-heading.tsx` — caret clignotant `█` après le nom (animate-pulse)
- [ ] `src/components/section/projects-section.tsx` — remplacer le bandeau "Mes Projets" centré par un séparateur ASCII (`── projects ──`) en mono
- [ ] `src/components/section/hackathons-section.tsx` — idem
- [ ] Headings de sections en `font-mono` (h2 home) pour le vibe terminal

## 4. Réduire les textes

- [ ] `src/components/section/hackathons-section.tsx` — titre `J'aime construire...` + paragraphe → 1 ligne courte
- [ ] `src/components/section/projects-section.tsx` — titre + description → 1 ligne courte
- [ ] `src/components/section/explore-section.tsx` — descriptions tiles → plus concises
- [ ] `src/components/section/contact-section.tsx` — paragraphe → plus court

## 5. Vérification

- [ ] `npm run build` ou `npm run lint`
- [ ] Demander à l'utilisateur de vérifier visuellement (golden path home)
