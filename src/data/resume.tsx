import { Icons } from "@/components/icons";
import { Docker } from "@/components/ui/svgs/docker";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Python } from "@/components/ui/svgs/python";
import { Typescript } from "@/components/ui/svgs/typescript";
import {
  FileText,
  HomeIcon,
  Images,
  NotebookIcon,
  Youtube,
} from "lucide-react";

export const DATA = {
  name: "Salim Diallo",
  initials: "SD",
  url: "https://salimdiallo.com",
  location: "Rabat, Maroc",
  locationLink: "https://www.google.com/maps/place/Rabat",
  description:
    "Étudiant ingénieur INSEA en Data & Software Engineering. Full-stack, data, IA. Freelance & collaborations.",
  summary:
    "Élève ingénieur à l'[INSEA](https://insea.ac.ma) (Rabat) en **Data & Software Engineering**. Je construis des apps full-stack (**Django, Next.js, TypeScript**), des pipelines de données en **Python**, et des solutions IA (**RAG, fine-tuning, MCP**). [Stage au HCP](#work), [MCPC 2025](#hackathons), et plusieurs projets freelance livrés (scraping, automatisation N8N, assistants IA).",
  avatarUrl: "/images/avatar.jpg",
  skills: [
    // Data & IA (mis en avant)
    { name: "Python", icon: Python },
    { name: "SQL" },
    { name: "Apache Airflow" },
    { name: "Pandas" },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "MongoDB" },
    { name: "Oracle" },
    { name: "RAG / LLMs" },
    { name: "Fine-tuning" },
    { name: "MCP" },
    // Software & Web
    { name: "TypeScript", icon: Typescript },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Django" },
    { name: "Tailwind CSS" },
    { name: "Docker", icon: Docker },
    { name: "N8N" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Accueil" },
    { href: "/gallery", icon: Images, label: "Galerie" },
    { href: "/videos", icon: Youtube, label: "Vidéos" },
    { href: "/docs", icon: FileText, label: "Documents" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "sidymamadousalim@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/salimdiallo",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sidy-mohamed-salim-diallo-855696264/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Calendar: {
        name: "Cal.com",
        url: "https://cal.com/sidy-mohamed-salim-diallo-nkvfem/30min?overlayCalendar=true",
        icon: Icons.globe,
        navbar: true,
      },
      email: {
        name: "Email",
        url: "mailto:sidymamadousalim@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Projets Freelance",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Data, IA & Full-Stack Developer",
      logoUrl: "",
      start: "2022",
      end: "Présent",
      description:
        "Apps web sur mesure (gestion d'agence, e-commerce voyage). Solutions IA pour extraction et assistance aux études : scraping, nettoyage et pipelines de données.",
    },
    {
      company: "Haut Commissariat au Plan",
      href: "https://www.hcp.ma",
      badges: [],
      location: "Rabat, Maroc",
      title: "Stage de découverte du monde professionnel",
      logoUrl: "",
      start: "Juillet 2025",
      end: "Juillet 2025",
      description:
        "Stage de découverte en administration centrale : observation des missions, outils statistiques, processus de gestion des données.",
    },
  ],
  education: [
    {
      school: "Institut National de Statistique et d'Économie Appliquée (INSEA)",
      href: "https://insea.ac.ma",
      degree: "Ingénieur d'État — Data & Software Engineering",
      logoUrl: "",
      start: "2023",
      end: "Présent",
    },
    {
      school: "Faculté des Sciences et Techniques — USMBA, Fès",
      href: "https://www.fst-usmba.ac.ma",
      degree: "DEUST MIP — Mathématiques, Informatique & Physique",
      logoUrl: "",
      start: "2021",
      end: "2023",
    },
    {
      school: "Formation continue",
      href: "#",
      degree:
        "Auto-apprentissage IA (RAG, fine-tuning, LLMs, MCP), automatisation N8N, Django, Next.js",
      logoUrl: "",
      start: "2022",
      end: "Présent",
    },
  ],
  projects: [
    {
      title: "LouraTech — Gestion d'agence",
      href: "#",
      dates: "2024 - 2025",
      active: true,
      description:
        "App web de gestion d'agence : clients, employés, projets, facturation, dashboards.",
      technologies: ["Django", "PostgreSQL", "Tailwind CSS", "HTMX"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Agence de voyage — Sénégal",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "Site d'agence de voyage : catalogue de tours au Sénégal, réservation et paiement en ligne.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "AI Study Assistant",
      href: "#",
      dates: "2024 - 2025",
      active: true,
      description:
        "LLM + RAG : flashcards et quiz adaptatifs générés depuis tes cours et PDFs. Révisions espacées.",
      technologies: ["Python", "RAG", "LangChain", "Next.js"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Car Data Scraper",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "Scraping multi-sources de données auto, nettoyage, déduplication et stockage SQL pour analyse.",
      technologies: ["Python", "BeautifulSoup", "Playwright", "PostgreSQL"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Automation Gmail → Notion",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "Workflow N8N : Gmail → extraction LLM → base Notion structurée.",
      technologies: ["N8N", "Notion API", "Gmail API", "OpenAI"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Crypto Price Tracker",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "Suivi temps réel des cours crypto, alertes personnalisées, historique. Event-driven + WebSockets.",
      technologies: ["Next.js", "TypeScript", "WebSockets", "Redis"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Telegram Mass Sender Bot",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "Bot Telegram : campagnes en masse, templating, planification, reporting de livraison.",
      technologies: ["Python", "Telegram Bot API", "PostgreSQL"],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Portfolio personnel",
      href: "https://salimdiallo.dev",
      dates: "2025",
      active: true,
      description:
        "Ce portfolio — vitrine software, data et IA. Next.js + Tailwind.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Magic UI"],
      links: [
        {
          type: "Website",
          href: "https://salimdiallo.dev",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],

  clubs: [
    {
      name: "Forum Génie Entreprise — INSEA",
      role: "Chef de cellule Communication & IT",
      timeframe: "2024 — Présent",
      description:
        "Pilotage de la com' digitale et de l'IT du club. Co-organisation du Forum Génie Entreprise — grand forum inter-écoles INSEA × INPT × ENSIAS.",
      href: "#",
    },
    {
      name: "Innovation Edge — INSEA",
      role: "Membre",
      timeframe: "2024 — Présent",
      description:
        "Co-organisation du Game of Code : compétition de programmation et d'IA pour fédérer les étudiants autour de l'innovation tech.",
      href: "#",
    },
  ],

  certifications: [
    {
      slug: "google-data-analytics",
      name: "Google Data Analytics — Coursera",
      issuer: "Google / Coursera",
      date: "2025",
      credentialUrl: "#",
      tags: ["Data", "SQL", "Python"],
      // Image (.jpg/.png) ou PDF (.pdf) du certificat à déposer dans /public/certifications/
      file: "/certifications/google-data-analytics.jpg",
    },
    {
      slug: "datacamp-sql-associate",
      name: "DataCamp — SQL Associate",
      issuer: "DataCamp",
      date: "2025",
      credentialUrl: "#",
      tags: ["SQL", "Data"],
      file: "/certifications/datacamp-sql-associate.pdf",
    },
    {
      slug: "langchain-llm",
      name: "DeepLearning.AI — LangChain for LLM Application Development",
      issuer: "DeepLearning.AI",
      date: "2025",
      credentialUrl: "#",
      tags: ["LLM", "RAG", "LangChain"],
      file: "/certifications/langchain-llm.jpg",
    },
  ],

  hackathons: [
    {
      title: "Moroccan Collegiate Programming Contest 2025",
      dates: "Novembre 2025",
      location: "Maroc",
      description:
        "Concours national de programmation compétitive en équipe : résolution de problèmes algo sous contrainte de temps. Stratégies de competitive programming, communication et pensée critique.",
      image: "",
      links: [],
    },
    {
      title: "Hack Health — Université Mohammed V",
      dates: "2025",
      location: "Rabat",
      description:
        "Hackathon e-santé UM5 : prototypage d'une solution numérique pour un cas d'usage médical concret, du brainstorming au pitch final.",
      image: "",
      links: [],
    },
    {
      title: "Game of Code — INSEA",
      dates: "2025",
      location: "Rabat",
      description:
        "Compétition INSEA dédiée à l'IA et au code. Participation côté organisation (Innovation Edge) et résolution de challenges algorithmiques.",
      image: "",
      links: [],
    },
  ],

  gallery: [
    { src: "/images/gallery/horizontal-1.jpg", alt: "Photo horizontale 1", orientation: "horizontal" as const },
    { src: "/images/gallery/vertical-4.jpg", alt: "Photo verticale 4", orientation: "vertical" as const },
    { src: "/images/gallery/horizontal-3.jpg", alt: "Photo horizontale 3", orientation: "horizontal" as const },
    { src: "/images/gallery/vertical-1.jpg", alt: "Photo verticale 1", orientation: "vertical" as const },
    { src: "/images/gallery/vertical-2.jpg", alt: "Photo verticale 2", orientation: "vertical" as const },
    { src: "/images/gallery/horizontal-2.jpg", alt: "Photo horizontale 2", orientation: "horizontal" as const },
    { src: "/images/gallery/horizontal-4.jpg", alt: "Photo horizontale 4", orientation: "horizontal" as const },
    { src: "/images/gallery/vertical-3.jpg", alt: "Photo verticale 3", orientation: "vertical" as const },
  ],

  videos: [
    {
      title:
        "INSEA's 'Game of Codes' to Foster AI Innovation and Coding Excellence",
      description:
        "Présentation de l'événement Game of Codes à l'INSEA, dédié à l'innovation IA et à l'excellence en programmation.",
      url: "https://youtu.be/L-F5F05l4ps?si=V-A7WEuMScbwqhcp",
    },
    {
      title: "Vidéo de présentation du projet MOO",
      description:
        "Démo du projet de Modélisation Orientée Objet : rétro-ingénierie de Watiqa.ma.",
      url: "https://youtu.be/nHS6NYS2_hk?si=J6yiVsLzBd7kl_Kl",
    },
    {
      title:
        "Analyseur de grammaires régulières — Technique de compilation",
      description:
        "Présentation du projet d'analyseur de grammaires régulières réalisé en cours de compilation.",
      url: "https://youtu.be/rKRsC-Jb8_k?si=1no4cOwx2lkdpJ2w",
    },
    {
      title:
        "Un parcours inspirant : de l'INSEA à Gitex grâce à la tech et l'automatisation",
      description:
        "Itinéraire et leçons apprises sur la tech, l'automatisation et l'entrepreneuriat étudiant.",
      url: "https://youtu.be/qNPdUfyEDdQ?si=KwvnXlzgTgm7SiFV",
    },
  ],

  docs: [
    {
      slug: "analyseur-grammaires-regulieres",
      title: "Analyseur de Grammaires Régulières",
      description:
        "Rapport du projet de technique de compilation : conception et implémentation d'un analyseur de grammaires régulières.",
      category: "Compilation",
      file: "/docs/Compilation.pdf",
      date: "Décembre 2025",
      tags: ["Compilation", "INSEA", "2ème année", "DSE"],
    },
    {
      slug: "retro-ingenierie-watiqa",
      title: "Rétro-ingénierie de Watiqa.ma",
      description:
        "Rapport du projet de Modélisation Orientée Objet : rétro-ingénierie du portail Watiqa.ma et conception UML.",
      category: "Modélisation Orientée Objet",
      file: "/docs/ProjetMOO_final.pdf",
      date: "Décembre 2025",
      tags: ["MOO", "INSEA", "2ème année", "DSE"],
    },
  ],
} as const;
