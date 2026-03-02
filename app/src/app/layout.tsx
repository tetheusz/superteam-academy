import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { AppShell } from "./shell";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://academy.superteam.fun"
  ),
  title: {
    default: "Superteam Academy — Learn Solana, Earn On-Chain",
    template: "%s | Superteam Academy",
  },
  description:
    "Master Solana development with interactive courses, code challenges, and on-chain NFT credentials. Earn XP, climb the leaderboard, and prove your skills.",
  keywords: [
    "Solana",
    "blockchain",
    "learn",
    "academy",
    "NFT",
    "credentials",
    "Anchor",
    "Rust",
    "DeFi",
    "Superteam",
  ],
  openGraph: {
    title: "Superteam Academy",
    description: "Learn Solana. Earn on-chain.",
    type: "website",
    locale: "en_US",
    siteName: "Superteam Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Superteam Academy",
    description: "Learn Solana. Earn on-chain.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050a18",
  width: "device-width",
  initialScale: 1,
};

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <AppShell>{children}</AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
