import type { MessageKey } from "./en";
import { messages as enMessages } from "./en";

const translated: Partial<Record<MessageKey, string>> = {
  // Navigation
  "nav.courses": "Cursos",
  "nav.dashboard": "Panel",
  "nav.leaderboard": "Clasificación",
  "nav.profile": "Perfil",
  "nav.signIn": "Entrar",
  "nav.signOut": "Salir",
  "nav.language": "Idioma",

  // Home Hero
  "home.hero.badge": "En vivo en Solana Devnet",
  "home.hero.title1": "Aprende Solana.",
  "home.hero.title2": "Gana en-cadena.",
  "home.hero.subtitle": "Domina el desarrollo blockchain con cursos interactivos, desafíos de código reales y credenciales NFT verificables — todo en Solana.",
  "home.hero.startLearning": "Empezar a Aprender",
  "home.hero.viewSource": "Ver Código",

  // Home Stats
  "home.stats.lessons": "Lecciones",
  "home.stats.xp": "XP Disponible",
  "home.stats.tracks": "Rutas de Estudio",
  "home.stats.languages": "Idiomas",

  // Home Features
  "home.features.badge": "Características de la Plataforma",
  "home.features.title1": "Por qué",
  "home.features.title2": "Superteam Academy?",
  "home.features.subtitle": "Construida por desarrolladores, para desarrolladores que desean lanzar programas reales en Solana.",
  "home.features.progress.title": "Progreso En-Cadena",
  "home.features.progress.desc": "Cada lección y recompensa de XP se registra en Solana. Tus logros son verificables, transparentes y genuinamente tuyos.",
  "home.features.credentials.title": "Credenciales NFT",
  "home.features.credentials.desc": "Gana certificados NFT soulbound. Demuestra tus habilidades en-cadena, visibles en Phantom, Backpack y cualquier billetera.",
  "home.features.gamified.title": "Aprendizaje Gamificado",
  "home.features.gamified.desc": "El sistema de XP, niveles, rachas, logros y clasificaciones hacen que el aprendizaje sea adictivo y gratificante.",
  "home.features.interactive.title": "Desafíos Interactivos",
  "home.features.interactive.desc": "Escribe Rust y TypeScript de verdad en el navegador. Comentarios instantáneos, ejecutores de pruebas y soluciones guiadas.",
  "home.features.multilingual.title": "Multilingüe",
  "home.features.multilingual.desc": "Soporte completo para PT-BR, ES y EN. Aprende en tu idioma nativo con traducciones impulsadas por la comunidad.",
  "home.features.open.title": "Abierto y Componible",
  "home.features.open.desc": "Totalmente de código abierto en Solana. Cualquier frontend puede integrarse. Tus datos están en-cadena, no bloqueados en una plataforma.",

  // Home Tracks
  "home.tracks.badge": "Rutas Estructuradas",
  "home.tracks.title1": "Rutas de",
  "home.tracks.title2": "Aprendizaje",
  "home.tracks.subtitle": "Ve de cero a implementar programas de producción en Solana.",
  "home.tracks.difficulty.beginner": "Principiante",
  "home.tracks.difficulty.intermediate": "Intermedio",
  "home.tracks.difficulty.advanced": "Avanzado",
  "home.tracks.viewCourses": "Ver cursos",
  "home.tracks.fundamentals.title": "Fundamentos de Solana",
  "home.tracks.fundamentals.desc": "Domina cuentas, transacciones, programas y el entorno de ejecución de Solana desde cero.",
  "home.tracks.anchor.title": "Desarrollo con Anchor",
  "home.tracks.anchor.desc": "Construye programas a nivel de producción con el marco Anchor y PDAs.",
  "home.tracks.defi.title": "DeFi y Tokens",
  "home.tracks.defi.desc": "Token-2022, AMMs, protocolos de préstamos y patrones avanzados de DeFi.",

  // Home Process
  "home.process.badge": "Proceso Simple",
  "home.process.title1": "Cómo",
  "home.process.title2": "funciona",
  "home.process.step": "Paso",
  "home.process.step1.title": "Conecta la Billetera",
  "home.process.step1.desc": "Vincula tu billetera Solana para comenzar. Phantom, Backpack o Solflare.",
  "home.process.step2.title": "Elige una Ruta",
  "home.process.step2.desc": "Elige entre Fundamentos, Anchor o DeFi — según tu nivel.",
  "home.process.step3.title": "Programa y Aprende",
  "home.process.step3.desc": "Completa lecciones interactivas y desafíos de código. Gana XP por cada uno.",
  "home.process.step4.title": "Obtén Credenciales",
  "home.process.step4.desc": "Consigue NFTs soulbound como prueba de tus habilidades. Visibles en tu billetera para siempre.",

  // Home Testimonials
  "home.testimonials.badge": "Comunidad",
  "home.testimonials.title1": "Lo que dicen los",
  "home.testimonials.title2": "constructores",
  "home.testimonials.1.text": "Por fin una plataforma que enseña Solana de la manera correcta — práctica, con desafíos de código reales. Las credenciales NFT cambian el juego para mi portafolio.",
  "home.testimonials.1.role": "Desarrolladora Full Stack",
  "home.testimonials.2.text": "La ruta de Anchor me llevó de cero a desplegar mi primer programa en 2 semanas. La gamificación me hizo volver a diario.",
  "home.testimonials.2.role": "Constructor DeFi",
  "home.testimonials.3.text": "Los desafíos de código son exigentes y están bien diseñados. Cada uno enseña un patrón real que usarás en producción. Me encanta el sistema de XP.",
  "home.testimonials.3.role": "Auditor de Smart Contracts",

  // Home CTA
  "home.cta.ready": "Listo para",
  "home.cta.build": "construir en Solana?",
  "home.cta.subtitle": "Conecta tu billetera, elige un curso y comienza a ganar XP. Tu progreso vive en-cadena para siempre.",

  // Footer
  "home.footer.desc": "La plataforma de aprendizaje de código abierto para desarrolladores de Solana. Creada por Superteam Brazil para la comunidad global.",
  "home.footer.platform": "Plataforma",
  "home.footer.resources": "Recursos",
  "home.footer.copyright": "© 2025 Superteam Academy. Hecho en Solana. Licencia MIT.",
  "home.footer.opensource": "Abierto e impulsado por la comunidad",

  // Courses Catalog
  "courses.title": "Cursos",
  "courses.subtitle": "Explora rutas de aprendizaje para ir desde cero hasta lanzar en Solana.",
  "courses.searchPlaceholder": "Buscar cursos...",
  "courses.filter.all": "Todos",
  "courses.filter.beginner": "Principiante",
  "courses.filter.intermediate": "Intermedio",
  "courses.filter.advanced": "Avanzado",
  "courses.stats.lessons": "lecciones",
  "courses.stats.xpPerLesson": "XP / lección",
  "courses.stats.totalXp": "XP total disponible",
  "courses.startLearning": "Empezar a aprender",
  "courses.emptySearch": "Ningún curso coincide con tus filtros. Intenta ajustar tu búsqueda.",

  // Dashboard
  "dashboard.connect.title": "Conecta tu Billetera",
  "dashboard.connect.desc": "Conecta tu billetera de Solana para ver tu panel de aprendizaje, seguir tu progreso y ganar XP.",
  "dashboard.title": "Panel",
  "dashboard.subtitle": "Sigue tu progreso, XP y logros.",
  "dashboard.stats.totalXp": "XP Total",
  "dashboard.stats.level": "Nivel",
  "dashboard.stats.streak": "Racha de días",
  "dashboard.stats.rank": "Ranking Global",
  "dashboard.activeCourses": "Cursos Activos",
  "dashboard.recommendedNext": "Recomendado",
  "dashboard.streakCalendar": "Calendario de racha",
  "dashboard.achievements": "Logros",
  "dashboard.recentActivity": "Actividad Reciente",
  "dashboard.lessons": "lecciones",
  "dashboard.xpEarned": "XP ganado",
  "dashboard.next": "Siguiente: ",

  // Leaderboard
  "leaderboard.subtitle": "Mejores alumnos clasificados por XP ganado en-cadena.",
  "leaderboard.timeframe.weekly": "Esta Semana",
  "leaderboard.timeframe.monthly": "Este Mes",
  "leaderboard.timeframe.all": "Todo el Tiempo",
  "leaderboard.level": "Nivel",
  "leaderboard.days": "días",
  "leaderboard.rank": "Ranking",
  "leaderboard.learner": "Alumno",
  "leaderboard.xp": "XP",
  "leaderboard.streak": "Racha",
  "leaderboard.yourPosition": "Tu Posición",
  "leaderboard.connect": "Conecta la billetera para ver tu rango",

  // Profile
  "profile.connect.title": "Conecta tu Billetera",
  "profile.connect.desc": "Conecta tu billetera de Solana para ver tu perfil.",
  "profile.role": "Desarrollador de Solana",
  "profile.bio": "Construyendo el futuro del aprendizaje descentralizado.",
  "profile.edit": "Editar Perfil",
  "profile.stats.totalXp": "XP Total",
  "profile.stats.level": "Nivel",
  "profile.stats.credentials": "Credenciales",
  "profile.stats.streak": "Racha",
  "profile.skills": "Habilidades",
  "profile.recentActivity": "Actividad Reciente",
  "profile.credentials.title": "Credenciales (NFTs en-cadena)",
  "profile.credentials.level": "Nivel",
  "profile.credentials.courses": "cursos",
  "profile.credentials.xp": "XP",
  "profile.credentials.view": "Ver Certificado",
  "profile.credentials.explorer": "Explorador"
};

export const messages: Record<MessageKey, string> = {
  ...enMessages,
  ...translated
};

