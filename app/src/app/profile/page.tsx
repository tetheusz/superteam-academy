"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useI18n } from "../../i18n/I18nProvider";
import { motion } from "framer-motion";
import {
    User,
    Zap,
    Trophy,
    Award,
    Flame,
    ExternalLink,
    Settings,
    Lock,
    Copy,
    Check,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { LevelProgress } from "@/components/gamification/level-progress";

const MOCK_CREDENTIALS = [
    {
        id: "cred-1",
        trackName: "Solana Fundamentals",
        level: 1,
        coursesCompleted: 1,
        totalXp: 400,
        mint: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
        explorerUrl: "https://explorer.solana.com/address/Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr?cluster=devnet",
    },
];

const MOCK_SKILLS = [
    { name: "Rust", level: 60, color: "from-orange-400 to-red-500" },
    { name: "Anchor", level: 40, color: "from-violet-400 to-purple-500" },
    { name: "TypeScript", level: 70, color: "from-blue-400 to-cyan-500" },
    { name: "Token-2022", level: 20, color: "from-emerald-400 to-green-500" },
    { name: "DeFi", level: 10, color: "from-amber-400 to-yellow-500" },
];

const MOCK_ACTIVITY = [
    { text: 'Completed "Account Model"', xp: 25, time: "2h ago" },
    { text: 'Earned "First Steps" achievement', xp: 0, time: "2h ago" },
    { text: "Started Anchor Development", xp: 0, time: "2d ago" },
    { text: 'Passed challenge "Hello Solana"', xp: 50, time: "3d ago" },
    { text: "Enrolled in Solana Fundamentals", xp: 0, time: "1w ago" },
];

export default function ProfilePage() {
    const { publicKey } = useWallet();
    const { t } = useI18n();
    const [copied, setCopied] = useState(false);

    if (!publicKey) {
        return (
            <main className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                        <Lock className="h-7 w-7 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold">{t("profile.connect.title")}</h1>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                        {t("profile.connect.desc")}
                    </p>
                </motion.div>
            </main>
        );
    }

    const walletStr = publicKey.toBase58();
    const shortWallet = `${walletStr.slice(0, 4)}...${walletStr.slice(-4)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(walletStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-8">
            {/* Profile header */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary">
                                <User className="h-8 w-8 text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-xl font-bold">{t("profile.role")}</h1>
                                <div className="mt-1 flex items-center gap-2">
                                    <code className="text-xs text-muted-foreground font-mono">
                                        {shortWallet}
                                    </code>
                                    <button
                                        onClick={handleCopy}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                        title="Copy full address"
                                    >
                                        {copied ? (
                                            <Check className="h-3 w-3 text-primary" />
                                        ) : (
                                            <Copy className="h-3 w-3" />
                                        )}
                                    </button>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {t("profile.bio")}
                                </p>
                            </div>
                            <Button asChild variant="outline" size="sm" className="self-start gap-2">
                                <Link href="/settings">
                                    <Settings className="h-3.5 w-3.5" />
                                    {t("profile.edit")}
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                    { label: t("profile.stats.totalXp"), value: 300, icon: Zap, color: "text-primary", bg: "bg-primary/10" },
                    { label: t("profile.stats.level"), value: 1, icon: Trophy, color: "text-secondary", bg: "bg-secondary/10" },
                    { label: t("profile.stats.credentials"), value: 1, icon: Award, color: "text-accent", bg: "bg-accent/10" },
                    { label: t("profile.stats.streak"), value: 3, icon: Flame, color: "text-warning", bg: "bg-warning/10" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                    >
                        <Card>
                            <CardContent className="flex items-center gap-3 p-4">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-lg font-bold">
                                        <AnimatedCounter value={stat.value} />
                                    </p>
                                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Level progress */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
            >
                <Card>
                    <CardContent className="p-5">
                        <LevelProgress totalXp={300} />
                    </CardContent>
                </Card>
            </motion.div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
                {/* Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm">{t("profile.skills")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {MOCK_SKILLS.map((skill) => (
                                <div key={skill.name}>
                                    <div className="flex items-center justify-between text-xs mb-1.5">
                                        <span className="font-medium">{skill.name}</span>
                                        <span className="text-muted-foreground">{skill.level}%</span>
                                    </div>
                                    <Progress value={skill.level} className="h-2" indicatorClassName={`bg-gradient-to-r ${skill.color}`} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm">{t("profile.recentActivity")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {MOCK_ACTIVITY.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start justify-between gap-2 text-xs"
                                    >
                                        <div className="flex items-start gap-2">
                                            <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                            <span className="text-muted-foreground">{item.text}</span>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {item.xp > 0 && (
                                                <span className="font-medium text-primary">
                                                    +{item.xp} XP
                                                </span>
                                            )}
                                            <span className="text-[10px] text-muted-foreground">
                                                {item.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Credentials */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-8"
            >
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    {t("profile.credentials.title")}
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {MOCK_CREDENTIALS.map((cred) => (
                        <Card
                            key={cred.id}
                            className="group hover:border-primary/30 hover:shadow-[0_0_20px_rgba(20,241,149,0.06)] transition-all"
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                                        <Trophy className="h-6 w-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">{cred.trackName}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {t("profile.credentials.level")} {cred.level} · {cred.coursesCompleted} {t("profile.credentials.courses")} ·{" "}
                                            {cred.totalXp} {t("profile.credentials.xp")}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-3">
                                    <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs h-8">
                                        <Link href={`/certificates/${cred.mint}`}>
                                            {t("profile.credentials.view")}
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs h-8">
                                        <a href={cred.explorerUrl} target="_blank" rel="noreferrer">
                                            {t("profile.credentials.explorer")}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.div>
        </main>
    );
}
