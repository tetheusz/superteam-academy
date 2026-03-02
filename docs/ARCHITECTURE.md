# Architecture

> Technical architecture of the Superteam Academy LMS frontend.

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │ Landing  │ │Dashboard │ │ Courses  │ │Leaderboard│  │
│  │  page    │ │  page    │ │  pages   │ │   page    │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └─────┬─────┘  │
│       └────────────┼───────────┼──────────────┘         │
│                    ▼           ▼                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │            Component Layer                       │    │
│  │  shadcn/ui · Gamification · CourseLayout · Editor│    │
│  └─────────────────────┬───────────────────────────┘    │
│                        ▼                                │
│  ┌─────────────────────────────────────────────────┐    │
│  │           Service Layer (interfaces)             │    │
│  │  LearningProgressService · EnrollmentService     │    │
│  │  LeaderboardService · CredentialService          │    │
│  └────────────┬───────────────────┬────────────────┘    │
│               ▼                   ▼                     │
│  ┌──────────────────┐  ┌──────────────────────────┐    │
│  │  Solana Modules   │  │   Local Stubs            │    │
│  │  (program, xp,    │  │   (localStorage,         │    │
│  │   credentials,    │  │    mock data)             │    │
│  │   enrollment)     │  │                          │    │
│  └────────┬─────────┘  └──────────────────────────┘    │
└───────────┼─────────────────────────────────────────────┘
            ▼
  ┌──────────────────┐
  │  Solana Devnet    │
  │  Token-2022 (XP)  │
  │  Metaplex Core    │
  │  (Credentials)    │
  └──────────────────┘
```

## Layers

### Page Layer (`src/app/`)

Each route is a Next.js App Router page. Pages marked `"use client"` use React hooks for wallet state and animations.

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Landing page with hero, features, tracks |
| `/courses` | Static | Filterable course catalog |
| `/courses/[slug]` | Dynamic (SSR) | Course detail with module sidebar |
| `/courses/[slug]/lessons/[id]` | Dynamic (SSR) | Lesson content + CodeMirror editor |
| `/dashboard` | Static | XP stats, streaks, achievements |
| `/leaderboard` | Static | Ranked XP table with podium |
| `/profile` | Static | Skills, credentials, activity feed |
| `/settings` | Static | Profile, accounts, theme, language |
| `/certificates/[id]` | Dynamic (SSR) | On-chain certificate viewer |

### Component Layer (`src/components/`)

```
components/
├── ui/                    # shadcn/ui primitives (Radix-based)
│   ├── button.tsx         # CVA variants: default, outline, ghost, solana-glow
│   ├── card.tsx           # Card, CardHeader, CardTitle, CardContent, CardFooter
│   ├── badge.tsx          # Variants: default, secondary, destructive, outline
│   ├── tabs.tsx           # Radix Tabs with active indicator
│   ├── progress.tsx       # Gradient indicator with custom className
│   ├── dialog.tsx         # Modal overlay with accessible focus trap
│   ├── accordion.tsx      # Collapsible sections with chevron animation
│   ├── tooltip.tsx        # Hover info with aria labels
│   ├── avatar.tsx         # Image with fallback initials
│   ├── skeleton.tsx       # Pulse loading placeholder
│   ├── input.tsx          # Text input with focus ring
│   └── animated-counter.tsx # rAF-based count-up animation
├── gamification/
│   ├── streak-calendar.tsx  # 28-day activity grid + milestone badges
│   ├── level-progress.tsx   # XP progress bar with level formula
│   └── xp-animation.tsx     # Floating +XP overlay effect
├── layout/
│   └── SiteHeader.tsx       # Sticky header with wallet, language, nav
├── courses/
│   └── CourseLayout.tsx     # 2-column layout with breadcrumb
├── editor/
│   └── CodeEditor.tsx       # CodeMirror 6 (Rust, TS, JSON)
└── auth/
    └── AuthProvider.tsx     # NextAuth session wrapper
```

### Service Layer (`src/services/`)

All data access goes through typed interfaces. This enables:
- **Swappable implementations** (stubs → Devnet → mainnet)
- **Type safety** across the app
- **Testability** with mock services

```typescript
interface LearningProgressService {
  getProgress(wallet, courseId): Promise<CourseProgress | null>;
  completeLesson(wallet, courseId, lessonIndex): Promise<CourseProgress>;
  getXpSummary(wallet): Promise<XpSummary>;
  getStreakData(wallet): Promise<StreakData>;
  getLeaderboard(timeframe): Promise<LeaderboardEntry[]>;
  getCredentials(wallet): Promise<CredentialSummary[]>;
}
```

**`DevnetLearningProgressService`** (current default):
- XP: reads Token-2022 ATA balance via `@solana/spl-token`
- Credentials: Helius DAS API `getAssetsByOwner`
- Completion: localStorage fallback (on-chain requires backend signer)

### Solana Layer (`src/solana/`)

| Module | Responsibility |
|--------|---------------|
| `program.ts` | Program ID, PDA derivation, bitmap helpers, level formula |
| `xp.ts` | Token-2022 balance reader, leaderboard indexer |
| `credentials.ts` | Helius DAS API client for Metaplex Core NFTs |
| `enrollment.ts` | Transaction builder for wallet-signed enrollment |
| `WalletProvider.tsx` | Multi-wallet provider (Phantom, Solflare, Torus) |

## Design System

### Color Tokens

```css
--primary: #14F195       /* Solana green */
--secondary: #9945FF     /* Solana purple */
--accent: #00D1FF        /* Cyan accent */
--background: #050a18    /* Deep navy */
--card: #0d1325          /* Card surface */
--border: rgba(255,255,255,0.06)
```

### Animation Strategy

- **Page transitions**: Framer Motion `initial/animate` with staggered delays
- **Counters**: `requestAnimationFrame` eased count-up
- **Hover**: CSS transitions on border-color, shadow, opacity
- **Loading**: Tailwind `animate-pulse` on Skeleton components
- **XP gains**: CSS `@keyframes xp-float` for floating overlay

### Icon System

All icons use **Lucide React** SVG components (no emoji in production UI). Benefits:
- Consistent 24×24 grid
- Tree-shakeable (only imports what's used)
- Customizable via className (size, color)

## Data Flow

```
User Action → Page Component → Service Interface → Implementation
                                                    ├── DevnetLearningProgressService
                                                    │   ├── Solana RPC (xp.ts, credentials.ts)
                                                    │   └── localStorage fallback
                                                    └── StubLearningProgressService
                                                        └── In-memory mock data
```

## Key Design Decisions

1. **shadcn/ui over raw Radix**: Provides pre-styled, composable components with CVA variants while keeping full Radix accessibility
2. **Lucide over emoji**: Consistent sizing, themeable, tree-shakeable
3. **Service interfaces**: Decouples UI from data source; easy to swap stubs for real on-chain calls
4. **Static-first**: 6 of 9 pages are static (prerendered), only dynamic pages need SSR
5. **Devnet-first**: All on-chain code targets Devnet for safe development
6. **localStorage fallback**: Lesson completion falls back gracefully when on-chain signer is unavailable
