import type { MessageKey } from "./en";
import { messages as enMessages } from "./en";

const translated: Partial<Record<MessageKey, string>> = {
  // Navigation
  "nav.courses": "Cursos",
  "nav.dashboard": "Dashboard",
  "nav.leaderboard": "Ranking",
  "nav.profile": "Perfil",
  "nav.signIn": "Entrar",
  "nav.signOut": "Sair",
  "nav.language": "Idioma",

  // Home Hero
  "home.hero.badge": "Ao vivo na Solana Devnet",
  "home.hero.title1": "Aprenda Solana.",
  "home.hero.title2": "Ganhe on-chain.",
  "home.hero.subtitle": "Domine o desenvolvimento blockchain com cursos interativos, desafios de código reais e credenciais NFT verificáveis — tudo na Solana.",
  "home.hero.startLearning": "Começar a Aprender",
  "home.hero.viewSource": "Ver Código",

  // Home Stats
  "home.stats.lessons": "Aulas",
  "home.stats.xp": "XP Disponível",
  "home.stats.tracks": "Trilhas de Estudo",
  "home.stats.languages": "Idiomas",

  // Home Features
  "home.features.badge": "Recursos da Plataforma",
  "home.features.title1": "Por que a",
  "home.features.title2": "Superteam Academy?",
  "home.features.subtitle": "Desenvolvida por devs, para devs que querem lançar programas reais na Solana.",
  "home.features.progress.title": "Progresso On-Chain",
  "home.features.progress.desc": "Cada aula e XP recebido é registrado na Solana. Suas conquistas são verificáveis, transparentes e realmente suas.",
  "home.features.credentials.title": "Credenciais NFT",
  "home.features.credentials.desc": "Ganhe certificados NFT soulbound. Prove suas habilidades on-chain, visíveis na Phantom, Backpack e qualquer carteira.",
  "home.features.gamified.title": "Aprendizado Gamificado",
  "home.features.gamified.desc": "Sistema de XP, níveis, ofensivas, conquistas e ranking tornam o aprendizado viciante e recompensador.",
  "home.features.interactive.title": "Desafios Interativos",
  "home.features.interactive.desc": "Escreva Rust e TypeScript reais no navegador. Feedback instantâneo, executores de teste e soluções guiadas.",
  "home.features.multilingual.title": "Multilíngue",
  "home.features.multilingual.desc": "Suporte completo para PT-BR, ES e EN. Aprenda em seu idioma nativo com traduções da comunidade.",
  "home.features.open.title": "Aberto & Componível",
  "home.features.open.desc": "Totalmente open-source na Solana. Qualquer frontend pode integrar. Seus dados estão on-chain, não travados em uma plataforma.",

  // Home Tracks
  "home.tracks.badge": "Caminhos Estruturados",
  "home.tracks.title1": "Trilhas de",
  "home.tracks.title2": "Aprendizado",
  "home.tracks.subtitle": "Vá do zero a implantação de programas Solana de produção.",
  "home.tracks.difficulty.beginner": "Iniciante",
  "home.tracks.difficulty.intermediate": "Intermediário",
  "home.tracks.difficulty.advanced": "Avançado",
  "home.tracks.viewCourses": "Ver cursos",
  "home.tracks.fundamentals.title": "Fundamentos da Solana",
  "home.tracks.fundamentals.desc": "Domine contas, transações, programas e o ambiente de execução da Solana do zero.",
  "home.tracks.anchor.title": "Desenvolvimento com Anchor",
  "home.tracks.anchor.desc": "Crie programas de nível de produção com o framework Anchor e PDAs.",
  "home.tracks.defi.title": "DeFi & Tokens",
  "home.tracks.defi.desc": "Token-2022, AMMs, protocolos de empréstimo e padrões avançados de DeFi.",

  // Home Process
  "home.process.badge": "Processo Simples",
  "home.process.title1": "Como",
  "home.process.title2": "funciona",
  "home.process.step": "Passo",
  "home.process.step1.title": "Conecte a Carteira",
  "home.process.step1.desc": "Vincule sua carteira Solana para começar. Phantom, Backpack ou Solflare.",
  "home.process.step2.title": "Escolha uma Trilha",
  "home.process.step2.desc": "Escolha entre Fundamentos, Anchor ou DeFi — de acordo com seu nível.",
  "home.process.step3.title": "Programe & Aprenda",
  "home.process.step3.desc": "Conclua aulas interativas e desafios de código. Ganhe XP em cada um.",
  "home.process.step4.title": "Ganhe Credenciais",
  "home.process.step4.desc": "Receba NFTs soulbound provando suas habilidades. Visíveis em sua carteira para sempre.",

  // Home Testimonials
  "home.testimonials.badge": "Comunidade",
  "home.testimonials.title1": "O que os builders",
  "home.testimonials.title2": "dizem",
  "home.testimonials.1.text": "Finalmente uma plataforma que ensina Solana do jeito certo — na prática, com desafios reais de código. As credenciais NFT são um divisor de águas para o meu portfólio.",
  "home.testimonials.1.role": "Desenvolvedora Full Stack",
  "home.testimonials.2.text": "A trilha de Anchor me levou do zero a lançar meu primeiro programa em 2 semanas. A gamificação me fez voltar todos os dias.",
  "home.testimonials.2.role": "Builder DeFi",
  "home.testimonials.3.text": "Os desafios de código são difíceis e bem projetados. Cada um ensina um padrão real que você usará em produção. Amei o sistema de XP.",
  "home.testimonials.3.role": "Auditor de Smart Contracts",

  // Home CTA
  "home.cta.ready": "Pronto para",
  "home.cta.build": "construir na Solana?",
  "home.cta.subtitle": "Conecte sua carteira, escolha um curso e comece a ganhar XP. O seu progresso vive on-chain para sempre.",

  // Footer
  "home.footer.desc": "A plataforma de aprendizado open-source para desenvolvedores Solana. Construída pela Superteam Brasil para a comunidade global.",
  "home.footer.platform": "Plataforma",
  "home.footer.resources": "Recursos",
  "home.footer.copyright": "© 2025 Superteam Academy. Feito na Solana. Licença MIT.",
  "home.footer.opensource": "Aberto e movido pela comunidade",

  // Courses Catalog
  "courses.title": "Cursos",
  "courses.subtitle": "Explore trilhas de aprendizado para ir do zero ao lançamento na Solana.",
  "courses.searchPlaceholder": "Buscar cursos...",
  "courses.filter.all": "Todos",
  "courses.filter.beginner": "Iniciante",
  "courses.filter.intermediate": "Intermediário",
  "courses.filter.advanced": "Avançado",
  "courses.stats.lessons": "lições",
  "courses.stats.xpPerLesson": "XP / lição",
  "courses.stats.totalXp": "Total de XP disponível",
  "courses.startLearning": "Começar a aprender",
  "courses.emptySearch": "Nenhum curso encontrado. Tente ajustar sua busca.",

  // Dashboard
  "dashboard.connect.title": "Conecte sua Carteira",
  "dashboard.connect.desc": "Conecte sua carteira Solana para ver seu painel de aprendizado, acompanhar o progresso e ganhar XP.",
  "dashboard.title": "Painel",
  "dashboard.subtitle": "Acompanhe seu progresso, XP e conquistas.",
  "dashboard.stats.totalXp": "XP Total",
  "dashboard.stats.level": "Nível",
  "dashboard.stats.streak": "Ofensiva (Dias)",
  "dashboard.stats.rank": "Ranking Global",
  "dashboard.activeCourses": "Cursos Ativos",
  "dashboard.recommendedNext": "Recomendado",
  "dashboard.streakCalendar": "Calendário de Ofensiva",
  "dashboard.achievements": "Conquistas",
  "dashboard.recentActivity": "Atividade Recente",
  "dashboard.lessons": "lições",
  "dashboard.xpEarned": "XP ganho",
  "dashboard.next": "Próximo: ",

  // Leaderboard
  "leaderboard.subtitle": "Principais alunos classificados por XP ganho on-chain.",
  "leaderboard.timeframe.weekly": "Esta Semana",
  "leaderboard.timeframe.monthly": "Este Mês",
  "leaderboard.timeframe.all": "Todos os Tempos",
  "leaderboard.level": "Nível",
  "leaderboard.days": "dias",
  "leaderboard.rank": "Ranking",
  "leaderboard.learner": "Aluno",
  "leaderboard.xp": "XP",
  "leaderboard.streak": "Ofensiva",
  "leaderboard.yourPosition": "Sua Posição",
  "leaderboard.connect": "Conecte a carteira para ver seu rank",

  // Profile
  "profile.connect.title": "Conecte sua Carteira",
  "profile.connect.desc": "Conecte sua carteira Solana para ver seu perfil.",
  "profile.role": "Desenvolvedor Solana",
  "profile.bio": "Construindo o futuro do aprendizado descentralizado.",
  "profile.edit": "Editar Perfil",
  "profile.stats.totalXp": "XP Total",
  "profile.stats.level": "Nível",
  "profile.stats.credentials": "Credenciais",
  "profile.stats.streak": "Ofensiva",
  "profile.skills": "Habilidades",
  "profile.recentActivity": "Atividade Recente",
  "profile.credentials.title": "Credenciais (NFTs on-chain)",
  "profile.credentials.level": "Nível",
  "profile.credentials.courses": "cursos",
  "profile.credentials.xp": "XP",
  "profile.credentials.view": "Ver Certificado",
  "profile.credentials.explorer": "Explorador"
};

export const messages: Record<MessageKey, string> = {
  ...enMessages,
  ...translated
};

