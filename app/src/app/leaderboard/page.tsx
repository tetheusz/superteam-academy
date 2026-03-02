"use client";

import { useState } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Flame,
  Crown,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import type { LeaderboardTimeframe } from "../../services/models";

const MOCK_LEADERBOARD = [
  { rank: 1, wallet: "7xKX..3f9e", displayName: "SolDev Master", xp: 12500, level: 11, streak: 42 },
  { rank: 2, wallet: "4vRz..8b2d", displayName: "Anchor Pro", xp: 10200, level: 10, streak: 30 },
  { rank: 3, wallet: "9mNx..1c7a", displayName: "RustLover", xp: 8700, level: 9, streak: 21 },
  { rank: 4, wallet: "2pQj..5e4f", displayName: "TokenWiz", xp: 7100, level: 8, streak: 14 },
  { rank: 5, wallet: "6kLm..9d3b", displayName: "ChainBuilder", xp: 5400, level: 7, streak: 10 },
  { rank: 6, wallet: "8nWx..2a1c", displayName: "DeFi Explorer", xp: 4200, level: 6, streak: 7 },
  { rank: 7, wallet: "3bYz..7f8e", displayName: "NFT Creator", xp: 3100, level: 5, streak: 5 },
  { rank: 8, wallet: "1cRt..4g6h", displayName: "ValidatorFan", xp: 2400, level: 4, streak: 3 },
  { rank: 9, wallet: "5dSu..8i0j", displayName: "SPL Learner", xp: 1800, level: 4, streak: 2 },
  { rank: 10, wallet: "0eVv..1k2l", displayName: "NewDev", xp: 900, level: 3, streak: 1 },
];

const PODIUM_ORDER = [1, 0, 2]; // silver, gold, bronze visual positions
const RANK_COLORS = [
  { bg: "bg-gradient-to-br from-yellow-400 to-amber-500", text: "text-amber-900", border: "border-yellow-400/30", icon: Crown },
  { bg: "bg-gradient-to-br from-gray-300 to-gray-400", text: "text-gray-800", border: "border-gray-300/30", icon: Medal },
  { bg: "bg-gradient-to-br from-amber-600 to-orange-700", text: "text-orange-100", border: "border-amber-600/30", icon: Medal },
];

export default function LeaderboardPage() {
  const { t } = useI18n();
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>("all");

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            {t("nav.leaderboard")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("leaderboard.subtitle")}
          </p>
        </div>
        <Tabs
          value={timeframe}
          onValueChange={(v) => setTimeframe(v as LeaderboardTimeframe)}
        >
          <TabsList>
            <TabsTrigger value="weekly">{t("leaderboard.timeframe.weekly")}</TabsTrigger>
            <TabsTrigger value="monthly">{t("leaderboard.timeframe.monthly")}</TabsTrigger>
            <TabsTrigger value="all">{t("leaderboard.timeframe.all")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Top 3 podium */}
      <div className="mt-10 grid grid-cols-3 gap-4 items-end">
        {PODIUM_ORDER.map((idx, position) => {
          const entry = MOCK_LEADERBOARD[idx];
          const isFirst = idx === 0;
          const rankStyle = RANK_COLORS[idx];

          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: position * 0.15,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Card
                className={`text-center transition-all hover:shadow-lg ${isFirst ? "sm:-mt-6 border-primary/20" : ""
                  } ${rankStyle.border}`}
              >
                <CardContent className="p-5">
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${rankStyle.bg} ${isFirst ? "h-14 w-14" : ""}`}
                  >
                    <rankStyle.icon
                      className={`${isFirst ? "h-7 w-7" : "h-5 w-5"} ${rankStyle.text}`}
                    />
                  </div>
                  <p className="mt-3 text-sm font-bold">{entry.displayName}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {entry.wallet}
                  </p>
                  <p className="mt-2 text-xl font-bold gradient-text">
                    <AnimatedCounter value={entry.xp} duration={1200} />
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    XP · {t("leaderboard.level")} {entry.level}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-warning">
                    <Flame className="h-3 w-3" />
                    {entry.streak} {t("leaderboard.days")}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Full rankings table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">{t("leaderboard.rank")}</th>
                <th className="px-4 py-3 text-left font-medium">{t("leaderboard.learner")}</th>
                <th className="px-4 py-3 text-right font-medium">{t("leaderboard.xp")}</th>
                <th className="hidden px-4 py-3 text-right font-medium sm:table-cell">
                  {t("leaderboard.level")}
                </th>
                <th className="hidden px-4 py-3 text-right font-medium sm:table-cell">
                  {t("leaderboard.streak")}
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.map((entry, i) => (
                <motion.tr
                  key={entry.rank}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.03 }}
                  className={`border-b border-border/40 transition-colors hover:bg-primary/5 ${i < 3 ? "bg-primary/[0.02]" : ""
                    }`}
                >
                  <td className="px-4 py-3 font-medium">
                    <span
                      className={
                        i < 3
                          ? "gradient-text font-bold"
                          : "text-muted-foreground"
                      }
                    >
                      #{entry.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-xs font-bold">
                        {entry.displayName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{entry.displayName}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {entry.wallet}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    <div className="flex items-center justify-end gap-1">
                      <Zap className="h-3 w-3 text-primary" />
                      {entry.xp.toLocaleString('en-US')}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-right sm:table-cell">
                    <Badge variant="outline" className="text-[10px]">
                      {t("leaderboard.level")} {entry.level}
                    </Badge>
                  </td>
                  <td className="hidden px-4 py-3 text-right sm:table-cell">
                    <div className="flex items-center justify-end gap-1 text-xs text-warning">
                      <Flame className="h-3 w-3" />
                      {entry.streak}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </Card>
      </motion.div>

      {/* Your position */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6"
      >
        <Card className="border-primary/20 bg-primary/[0.02]">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                Y
              </div>
              <div>
                <p className="text-sm font-medium">{t("leaderboard.yourPosition")}</p>
                <p className="text-[10px] text-muted-foreground">
                  {t("leaderboard.connect")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-primary flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  #42
                </p>
                <p className="text-[10px] text-muted-foreground">300 XP</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
