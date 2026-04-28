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
    "Élève ingénieur à l'[INSEA](https://insea.ac.ma) (Rabat) en **Data & Software Engineering**. Mon terrain de jeu : **pipelines de données** (Python, **SQL**, **Apache Airflow**, Pandas), **modélisation** (PostgreSQL, MongoDB, Oracle) et **IA appliquée** (RAG, fine-tuning, MCP). En complément, je livre des apps full-stack (Django, Next.js, TypeScript) pour mettre la data au service du produit. [Stage au HCP](#work), [MCPC 2025](#hackathons), et plusieurs projets freelance (scraping, ETL, automatisation **N8N**, assistants IA).",
  avatarUrl: "/images/avatar.jpg",
  skills: [
    // Data & IA (mis en avant)
    { name: "Python", icon: Python, category: "data" },
    { name: "SQL", category: "data" },
    { name: "Apache Airflow", category: "data" },
    { name: "Pandas / NumPy / Matplotlib", category: "data" },
    { name: "NLP", category: "data" },
    { name: "PostgreSQL", icon: Postgresql, category: "data" },
    { name: "MongoDB", category: "data" },
    { name: "Oracle", category: "data" },
    { name: "RAG / LLMs", category: "data" },
    { name: "Fine-tuning", category: "data" },
    { name: "MCP", category: "data" },
    { name: "N8N", category: "data" },
    // Software & Web
    { name: "TypeScript", icon: Typescript, category: "software" },
    { name: "Next.js", icon: NextjsIconDark, category: "software" },
    { name: "Django", category: "software" },
    { name: "Tailwind CSS", category: "software" },
    // DevOps & Automatisation
    { name: "Docker", icon: Docker, category: "devops" },
    { name: "Git & GitHub", category: "devops" },
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
      logoUrl: "/images/work/freelance.png",
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
      logoUrl: "/images/work/hcp.png",
      // start: "Juillet 2025",
      end: "Juillet 2025",
      description:
        "Stage de découverte en administration centrale : observation des missions, outils statistiques, processus de gestion des données.",
    },
    {
      company: "Faculté des Sciences et Techniques — USMBA, Fès",
      href: "https://www.fst-usmba.ac.ma",
      badges: [],
      location: "Fès, Maroc",
      title: "Stagiaire Développeur — Application de gestion du département Informatique",
      logoUrl: "/images/work/fst.png",
      start: "Mars 2023",
      end: "Mai 2023",
      description:
        "Stage de 3 mois : conception et développement d'une application web de gestion des matériels informatiques du département. Gestion des affectations, suivi du parc matériel, modélisation de la base de données, back-end et interfaces de saisie/consultation.",
    },
  ],
  education: [
    {
      school: "Institut National de Statistique et d'Économie Appliquée (INSEA)",
      href: "https://insea.ac.ma",
      degree: "Ingénieur d'État — Data & Software Engineering",
      logoUrl: "/images/education/insea.png",
      start: "2024",
      end: "Présent",
    },
    {
      school: "Faculté des Sciences et Techniques — USMBA, Fès",
      href: "https://www.fst-usmba.ac.ma",
      degree: "DEUST MIP — Mathématiques, Informatique & Physique",
      logoUrl: "/images/education/fst.png",
      start: "2021",
      end: "2023",
    },
    {
      school: "Certifications & Formations en ligne",
      href: "#certifications",
      degree:
        "DataCamp SQL Associate, Data Engineer with Python, et autres certifications en data, IA et développement",
      logoUrl: "/images/education/certification.png",
      start: "2022",
      end: "Présent",
    },
  ],
  projects: [
    {
      title: "LouraTech — Gestion d'agence",
      href: "https://www.louratech.org/",
      dates: "2024 - 2025",
      active: true,
      description:
        "App web de gestion d'agence : clients, employés, projets, facturation, dashboards.",
      technologies: ["Django", "PostgreSQL", "Tailwind CSS", "HTMX"],
      links: [],
      image: "/images/projects/louratech.png",
      video: "",
    },
    {
      title: "Agence de voyage — Sénégal",
      href: "https://www.senegalpremiumtour.com/",
      dates: "2024",
      active: true,
      description:
        "Site d'agence de voyage : catalogue de tours au Sénégal, réservation et paiement en ligne.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      links: [],
      image: "/images/projects/senetour.png",
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
      image: "/images/projects/revise.png",
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
      image: "/images/projects/carforSale.png",
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
      image: "/images/projects/n8n.png",
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
      image: "/images/projects/CryptoApp.png",
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
      image: "/images/projects/telegram.png",
      video: "",
    },
    // {
    //   title: "Portfolio personnel",
    //   href: "https://salimdiallo.dev",
    //   dates: "2025",
    //   active: true,
    //   description:
    //     "Ce portfolio — vitrine software, data et IA. Next.js + Tailwind.",
    //   technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Magic UI"],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://salimdiallo.dev",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video: "",
    // },
  ],

  clubs: [
    {
      name: "Forum GENI Entreprise — INSEA",
      role: "Chef de cellule Communication & IT",
      timeframe: "2024 — Présent",
      logoUrl: "/images/club/forum.png",
      description:
        "Pilotage de la com' digitale et de l'IT du club. Co-organisation du Forum Génie Entreprise — grand forum inter-écoles INSEA × INPT × ENSIAS.",
      href: "https://forumgenientreprise.com/",
    },
    {
      name: "Innovation Edge — INSEA",
      role: "Membre",
      timeframe: "2024 — 2025",
      logoUrl: "/images/club/edge.png",
      description:
        "Co-organisation du Game of Code : compétition de programmation et d'IA pour fédérer les étudiants autour de l'innovation tech.",
      href: "https://inseainnovationedge.com/",
    },
  ],

  certifications: [
    {
      slug: "datacamp-associate-data-engineer-sql",
      name: "Associate Data Engineer in SQL (Career Track)",
      issuer: "DataCamp",
      date: "Mars 2026",
      credentialUrl:
        "https://www.datacamp.com/completed/statement-of-accomplishment/track/c3443331169e08c2e49774ccf25ca672f3fc2643?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa&utm_source=copylink",
      tags: ["Data Engineering", "SQL", "Snowflake", "Career Track"],
      // Image (.jpg/.png) ou PDF (.pdf) du certificat à déposer dans /public/certifications/
      file: "/certifications/datacamp-associate-data-engineer-sql.pdf",
    },
    {
      slug: "coursera-genai-fine-tuning-llms",
      name: "GenAI For Business Analysis: Fine-Tuning LLMs",
      issuer: "Coursera Project Network",
      date: "Septembre 2025",
      credentialUrl: "https://coursera.org/verify/JI9VUUIYL952",
      tags: ["GenAI", "LLM", "Fine-Tuning"],
      file: "/certifications/coursera-genai-fine-tuning-llms.pdf",
    },
    {
      slug: "datacamp-understanding-data-visualization",
      name: "Understanding Data Visualization",
      issuer: "DataCamp",
      date: "Mars 2026",
      credentialUrl: "#",
      tags: ["Data Viz", "Storytelling"],
      file: "/certifications/datacamp-understanding-data-visualization.pdf",
    },
    {
      slug: "coursera-power-bi-beginners",
      name: "Power BI for Beginners: Build Your First Report",
      issuer: "Coursera Project Network",
      date: "Septembre 2025",
      credentialUrl: "https://coursera.org/verify/RPLECDX3I8IX",
      tags: ["Power BI", "BI", "Reporting"],
      file: "/certifications/coursera-power-bi-beginners-first-report.pdf",
    },
    {
      slug: "datacamp-intro-snowflake-sql",
      name: "Introduction to Snowflake SQL",
      issuer: "DataCamp",
      date: "Mars 2026",
      credentialUrl: "#",
      tags: ["Snowflake", "SQL", "Cloud Data"],
      file: "/certifications/datacamp-intro-snowflake-sql.pdf",
    },
    {
      slug: "coursera-ibm-python-project-data-engineering",
      name: "Python Project for Data Engineering",
      issuer: "IBM (Coursera)",
      date: "Janvier 2025",
      credentialUrl: "https://coursera.org/verify/3YJ2DQVGL0AN",
      tags: ["Python", "Data Engineering", "ETL"],
      file: "/certifications/coursera-ibm-python-project-data-engineering.pdf",
    },
    {
      slug: "datacamp-data-warehousing-concepts",
      name: "Data Warehousing Concepts",
      issuer: "DataCamp",
      date: "Mars 2026",
      credentialUrl: "#",
      tags: ["Data Warehouse", "ETL", "Modeling"],
      file: "/certifications/datacamp-data-warehousing-concepts.pdf",
    },
    {
      slug: "coursera-ibm-python-data-science",
      name: "Python for Data Science, AI & Development",
      issuer: "IBM (Coursera)",
      date: "Janvier 2025",
      credentialUrl: "https://coursera.org/verify/BA16EI4TDQ2U",
      tags: ["Python", "Data Science", "AI"],
      file: "/certifications/coursera-ibm-python-data-science.pdf",
    },
    {
      slug: "datacamp-database-design",
      name: "Database Design",
      issuer: "DataCamp",
      date: "Février 2026",
      credentialUrl: "#",
      tags: ["Database", "Modeling", "Normalization"],
      file: "/certifications/datacamp-database-design.pdf",
    },
    {
      slug: "coursera-ibm-intro-data-engineering",
      name: "Introduction to Data Engineering",
      issuer: "IBM (Coursera)",
      date: "Décembre 2024",
      credentialUrl: "https://coursera.org/verify/46J6HCN8GH5B",
      tags: ["Data Engineering", "Foundations"],
      file: "/certifications/coursera-ibm-intro-data-engineering.pdf",
    },
    {
      slug: "datacamp-intro-relational-databases-sql",
      name: "Introduction to Relational Databases in SQL",
      issuer: "DataCamp",
      date: "Février 2026",
      credentialUrl: "#",
      tags: ["SQL", "Relational DB"],
      file: "/certifications/datacamp-intro-relational-databases-sql.pdf",
    },
    {
      slug: "coursera-ibm-git-github",
      name: "Getting Started with Git and GitHub",
      issuer: "IBM (Coursera)",
      date: "Décembre 2024",
      credentialUrl: "https://coursera.org/verify/9SWUATNKK97H",
      tags: ["Git", "GitHub", "DevOps"],
      file: "/certifications/coursera-ibm-git-github.pdf",
    },
    {
      slug: "datacamp-joining-data-sql",
      name: "Joining Data in SQL",
      issuer: "DataCamp",
      date: "Février 2026",
      credentialUrl: "#",
      tags: ["SQL", "Joins"],
      file: "/certifications/datacamp-joining-data-sql.pdf",
    },
  ],

  hackathons: [
    {
      title: "Moroccan Collegiate Programming Contest 2025 - UM6P College Computing",
      dates: "Novembre 2025",
      location: "Maroc",
      description:
        "Concours national de programmation compétitive en équipe : résolution de problèmes algo sous contrainte de temps. Stratégies de competitive programming, communication et pensée critique.",
      image: "",
      links: [],
    },
    {
      title: "HealthCare Hackaton — Université Mohammed V",
      dates: "Février 2026",
      location: "Rabat",
      description:
        "Hackathon e-santé UM5 : prototypage d'une solution numérique pour un cas d'usage médical concret, du brainstorming au pitch final.",
      image: "",
      links: [],
    },
    {
      title: "Game of Code — INSEA (Membre Organisation)",
      dates: "2024",
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
