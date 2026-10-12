import type { L } from "./i18n"

export const CONTACT_EMAIL = "hello@marloa.com"

export const ui = {
  designPortfolio: { en: "Design Portfolio", es: "Portafolio de diseño" },
  home: { en: "HOME", es: "INICIO" },
  contact: { en: "CONTACT", es: "CONTACTO" },
  about: { en: "ABOUT ME", es: "SOBRE MÍ" },
  projects: { en: "PROJECTS", es: "PROYECTOS" },
  hello: { en: "Hello!", es: "¡Hola!" },
  education: { en: "EDUCATION", es: "EDUCACIÓN" },
  hardSkills: { en: "HARD SKILLS", es: "HABILIDADES" },
  languages: { en: "LANGUAGES", es: "IDIOMAS" },
  spanish: { en: "Spanish", es: "Español" },
  motherTongue: { en: "Mother tongue", es: "Lengua materna" },
  english: { en: "English", es: "Inglés" },
  bio1: {
    en: "Hello! I’m a 24 year old designer, as well as programmer and videogame developer, who graduated from Animation and Interaction Design. I’m currently based in Puebla, Mx. working in “Laboratorio Satelital”, a risograph studio and as a freelancer.",
    es: "¡Hola! Soy una diseñadora de 24 años, además de programadora y desarrolladora de videojuegos, egresada de Diseño de Animación e Interacción. Actualmente vivo en Puebla, Mx. y trabajo en “Laboratorio Satelital”, un estudio de risografía, y como freelance.",
  },
  bio2: {
    en: "My journey started in an indie game studio in Puebla, working as an intern on the game “Remnants of the Rift”, from August 2022 to May 2025 and at the same time started to work as a freelancer. In May 2025 I decided to take a new turn in my career and started my own risograph studio, to then make it a multidisciplinary studio to help designers and artists explore more.",
    es: "Mi camino comenzó en un estudio indie de videojuegos en Puebla, como practicante en el juego “Remnants of the Rift”, de agosto de 2022 a mayo de 2025, y al mismo tiempo comencé a trabajar como freelance. En mayo de 2025 decidí darle un nuevo giro a mi carrera y fundé mi propio estudio de risografía, para convertirlo después en un estudio multidisciplinario que ayude a diseñadores y artistas a explorar más.",
  },
  bio3: {
    en: "I consider myself as a hardworking, creative, curious and empathic person, willing to learn and experiencing new perspectives and ways of working.",
    es: "Me considero una persona trabajadora, creativa, curiosa y empática, con ganas de aprender y de experimentar nuevas perspectivas y formas de trabajar.",
  },
  edu1: { en: "Interaction and Animation Design B.A.", es: "Licenciatura en Diseño de Animación e Interacción" },
  edu1b: { en: "Universidad Iberoamericana Puebla", es: "Universidad Iberoamericana Puebla" },
  edu1c: { en: "Aug 2019 - Dec 2023", es: "Ago 2019 - Dic 2023" },
  edu2: {
    en: "Master in Management, Valuation and Appraisal in Contemporary Art",
    es: "Máster en Gestión, Valoración y Tasación de Arte Contemporáneo",
  },
  edu2b: { en: "Euroinnova and Nebrija College", es: "Euroinnova y Universidad Nebrija" },
  edu2c: { en: "Jan 2026 - Present", es: "Ene 2026 - Actualidad" },
  seeAll: { en: "See all projects", es: "Ver todos los proyectos" },
  back: { en: "← Back", es: "← Volver" },
  noProjects: { en: "Projects coming soon.", es: "Proyectos próximamente." },
  next: { en: "Next project →", es: "Siguiente proyecto →" },
  prev: { en: "← Previous project", es: "← Proyecto anterior" },
  role: { en: "Role", es: "Rol" },
  year: { en: "Year", es: "Año" },
  category: { en: "Category", es: "Categoría" },
  contactTitle: { en: "Contact me", es: "Contáctame" },
  contactText: {
    en: "Have a project in mind, want to collaborate or just say hi? Write to me and let’s make something together.",
    es: "¿Tienes un proyecto en mente, quieres colaborar o solo saludar? Escríbeme y hagamos algo juntos.",
  },
  formName: { en: "Name", es: "Nombre" },
  formEmail: { en: "Your email", es: "Tu correo" },
  formSubject: { en: "Subject", es: "Asunto" },
  formMessage: { en: "Message", es: "Mensaje" },
  formSend: { en: "SEND MESSAGE", es: "ENVIAR MENSAJE" },
  formNote: {
    en: "This will open your email app with the message ready to send.",
    es: "Se abrirá tu app de correo con el mensaje listo para enviar.",
  },
  location: { en: "Puebla, Mx.", es: "Puebla, Mx." },
  scrollDown: { en: "Scroll down", es: "Bajar" },
} satisfies Record<string, L>

export type Category = {
  slug: string
  label: L
  left: number
  top: number
}

export const categories: Category[] = [
  { slug: "web-design", label: { en: "Web Design", es: "Diseño Web" }, left: 11.7, top: 31.9 },
  { slug: "graphic-design", label: { en: "Graphic Design", es: "Diseño Gráfico" }, left: 80, top: 27.9 },
  { slug: "unity-development", label: { en: "Unity Development", es: "Desarrollo en Unity" }, left: 11, top: 53 },
  { slug: "media", label: { en: "Photography, Video, Motion Graphics", es: "Fotografía, Video, Motion Graphics" }, left: 87, top: 45.4 },
  { slug: "web-development", label: { en: "Web Development", es: "Desarrollo Web" }, left: 86.5, top: 68 },
  { slug: "editorial-design", label: { en: "Editorial Design", es: "Diseño Editorial" }, left: 14, top: 74 },
]

export const heroLines: Record<string, L[]> = {
  media: [
    { en: "Photography", es: "Fotografía" },
    { en: "Video", es: "Video" },
    { en: "Motion Graphics", es: "Motion Graphics" },
  ],
}

export type Project = {
  slug: string
  year: number
  category: string
  title: L
  summary: L
  role: L
  cover?: string
  images?: string[]
}

export const projects: Project[] = [
  {
    slug: "portfolio-site",
    year: 2026,
    category: "web-development",
    title: { en: "Portfolio Site", es: "Sitio de portafolio" },
    summary: {
      en: "An art portfolio built with React and Vite, designed around playful typography and a narrative that captures the artist's vision.",
      es: "Un portafolio de arte hecho con React y Vite, diseñado alrededor de una tipografía lúdica y una narrativa que se parezca al artista.",
    },
    role: { en: "Design & Development", es: "Diseño y desarrollo" },
    cover: "/projects/portfolio-site/cover.jpg",
    images: ["/projects/portfolio-site/1.png", "/projects/portfolio-site/2.png", "/projects/portfolio-site/3.png", "/projects/portfolio-site/4.png", "/projects/portfolio-site/5.png"],
  },
  {
    slug: "studio-web",
    year: 2026,
    category: "web-design",
    title: { en: "Risograph Studio Website", es: "Sitio del estudio de risografía" },
    summary: {
      en: "Interface design for a risograph studio: catalog, service requests and a gallery of printed work.",
      es: "Diseño de interfaz para un estudio de risografía: catálogo, solicitudes de servicio y galería de trabajos impresos.",
    },
    role: { en: "UI Design", es: "Diseño UI" },
  },
  {
    slug: "riso-zine",
    year: 2026,
    category: "editorial-design",
    title: { en: "Riso Zine", es: "Zine en riso" },
    summary: {
      en: "A small-run editorial piece printed in two spot colors, exploring layout and overprint.",
      es: "Una pieza editorial de tiraje corto impresa en dos tintas directas, explorando maquetación y sobreimpresión.",
    },
    role: { en: "Editorial Design", es: "Diseño editorial" },
  },
  {
    slug: "remnants-of-the-rift",
    year: 2025,
    category: "unity-development",
    title: { en: "Remnants of the Rift", es: "Remnants of the Rift" },
    summary: {
      en: "Gameplay and interaction work as an intern at an indie game studio in Puebla, built in Unity.",
      es: "Trabajo de gameplay e interacción como practicante en un estudio indie de Puebla, desarrollado en Unity.",
    },
    role: { en: "Unity Developer", es: "Desarrolladora en Unity" },
  },
  {
    slug: "laboratorio-satelital",
    year: 2025,
    category: "graphic-design",
    title: { en: "Laboratorio Satelital", es: "Laboratorio Satelital" },
    summary: {
      en: "Identity and printed pieces for a risograph studio that helps designers and artists explore.",
      es: "Identidad y piezas impresas para un estudio de risografía que ayuda a diseñadores y artistas a explorar.",
    },
    role: { en: "Brand & Graphic Design", es: "Marca y diseño gráfico" },
  },
  {
    slug: "motion-reel",
    year: 2025,
    category: "media",
    title: { en: "Motion Reel", es: "Reel de motion" },
    summary: {
      en: "A selection of motion graphics, short videos and photography.",
      es: "Una selección de motion graphics, videos cortos y fotografía.",
    },
    role: { en: "Motion & Video", es: "Motion y video" },
  },
  {
    slug: "game-ui-kit",
    year: 2024,
    category: "web-design",
    title: { en: "Game UI Kit", es: "Kit de UI para juegos" },
    summary: {
      en: "A reusable interface kit for indie game menus and HUDs.",
      es: "Un kit de interfaz reutilizable para menús y HUDs de juegos indie.",
    },
    role: { en: "UI Design", es: "Diseño UI" },
  },
]
