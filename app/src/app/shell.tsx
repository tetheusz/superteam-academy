"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "../i18n/I18nProvider";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SolanaWalletProvider } from "../solana/WalletProvider";
import { AuthProvider } from "../components/auth/AuthProvider";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <I18nProvider>
        <SolanaWalletProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
        </SolanaWalletProvider>
      </I18nProvider>
    </AuthProvider>
  );
}

