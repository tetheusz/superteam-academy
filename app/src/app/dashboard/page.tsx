"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useI18n } from "../../i18n/I18nProvider";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Trophy,
  Flame,
  Hash,
  Target,
  Code2,
  BookOpen,
  ChevronRight,
  Sparkles,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { StreakCalendar } from "@/components/gamification/streak-calendar";
import { LevelProgress } from "@/components/gamification/level-progress";

const MOCK_COURSES = [
  {
    id: "solana-fundamentals",
    title: "Solana Fundamentals",
    progress: 50,
    totalLessons: 8,
    completedLessons: 4,
    nextLesson: "Account Model",
    xpEarned: 200,
    difficulty: "Beginner" as const,
  },
  {
    id: "anchor-dev",
    title: "Anchor Development",
    progress: 17,
    totalLessons: 12,
    completedLessons: 2,
    nextLesson: "Program Derived Addresses",
    xpEarned: 100,
    difficulty: "Intermediate" as const,
  },
];

const MOCK_ACHIEVEMENTS = [
  {
    id: "first-lesson",
    name: "First Steps",
    icon: Target,
    description: "Complete your first lesson",
    earned: true,
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    icon: Flame,
    description: "7-day learning streak",
    earned: true,
  },
  {
    id: "first-challenge",
    name: "Code Champion",
    icon: Code2,
    description: "Pass your first code challenge",
    earned: true,
  },
  {
    id: "course-complete",
    name: "Course Completer",
    icon: Trophy,
    description: "Complete a full course",
    earned: false,
  },
  {
    id: "speed-runner",
    name: "Speed Runner",
    icon: Zap,
    description: "Complete a lesson in under 5 minutes",
    earned: false,
  },
  {
    id: "streak-30",
    name: "Monthly Master",
    icon: Sparkles,
    description: "30-day learning streak",
    earned: false,
  },
];

const MOCK_STREAK_DAYS = (() => {
  const days: string[] = [];
  const today = new Date();
  for (let i = 0; i < 3; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  // Add some older days
  for (const offset of [5, 6, 7, 10, 11, 12, 15]) {
    const d = new Date(today);
    d.setDate(d.getDate() - offset);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
})();

const RECOMMENDED = [
  {
    id: "defi-tokens",
    title: "DeFi & Tokens",
    description: "Token-2022, AMMs, and DeFi patterns",
    difficulty: "Advanced",
    lessons: 10,
    xp: 4000,
  },
];

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const { t } = useI18n();

  const totalXp = 300;
  const currentStreak = 3;
  const rank = 42;

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
          <h1 className="text-xl font-bold">{t("dashboard.connect.title")}</h1>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {t("dashboard.connect.desc")}
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold">{t("nav.dashboard")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("dashboard.subtitle")}
        </p>
      </motion.div>

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: t("dashboard.stats.totalXp"),
            value: totalXp,
            icon: Zap,
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: t("dashboard.stats.level"),
            value: Math.floor(Math.sqrt(totalXp / 100)),
            icon: Trophy,
            color: "text-secondary",
            bg: "bg-secondary/10",
          },
          {
            label: t("dashboard.stats.streak"),
            value: currentStreak,
            icon: Flame,
            color: "text-warning",
            bg: "bg-warning/10",
          },
          {
            label: t("dashboard.stats.rank"),
            value: rank,
            icon: Hash,
            color: "text-accent",
            bg: "bg-accent/10",
            prefix: "#",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                    />
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {stat.label}
                  </p>
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
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <Card>
          <CardContent className="p-5">
            <LevelProgress totalXp={totalXp} />
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left column: Courses + Recommended */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active courses */}
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {t("dashboard.activeCourses")}
            </h2>
            <div className="mt-4 grid gap-4">
              {MOCK_COURSES.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <Link href={`/courses/${course.id}`}>
                    <Card className="group cursor-pointer hover:border-primary/30 hover:shadow-[0_0_20px_rgba(20,241,149,0.06)] transition-all">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                              {course.title}
                            </h3>
                            <Badge variant="outline" className="text-[10px]">
                              {course.difficulty}
                            </Badge>
                          </div>
                          <span className="text-xs font-medium text-primary">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress
                          value={course.progress}
                          className="mt-3 h-1.5"
                        />
                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {course.completedLessons}/{course.totalLessons}{" "}
                            {t("dashboard.lessons")}
                          </span>
                          <span>{course.xpEarned} {t("dashboard.xpEarned")}</span>
                        </div>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <span>
                            {t("dashboard.next")}{" "}
                            <span className="text-foreground font-medium">
                              {course.nextLesson}
                            </span>
                          </span>
                          <ChevronRight className="ml-auto h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              {t("dashboard.recommendedNext")}
            </h2>
            <div className="mt-4 grid gap-4">
              {RECOMMENDED.map((course) => (
                <Link key={course.id} href="/courses">
                  <Card className="group cursor-pointer border-dashed hover:border-secondary/30 transition-all">
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <h3 className="text-sm font-semibold group-hover:text-secondary transition-colors">
                          {course.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {course.description}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-[10px]">
                            {course.difficulty}
                          </Badge>
                          <span>{course.lessons} {t("dashboard.lessons")}</span>
                          <span>{course.xp.toLocaleString('en-US')} XP</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Streak + Achievements */}
        <div className="space-y-6">
          {/* Streak calendar */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Flame className="h-4 w-4 text-warning" />
                {t("dashboard.streakCalendar")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StreakCalendar
                activeDays={MOCK_STREAK_DAYS}
                currentStreak={currentStreak}
                longestStreak={12}
              />
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Trophy className="h-4 w-4 text-secondary" />
                {t("dashboard.achievements")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {MOCK_ACHIEVEMENTS.map((ach) => (
                  <div
                    key={ach.id}
                    className={`flex flex-col items-center rounded-lg p-2.5 text-center transition-all ${ach.earned
                      ? "bg-primary/5 border border-primary/20"
                      : "bg-muted/20 border border-border opacity-40"
                      }`}
                    title={ach.description}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${ach.earned
                        ? "bg-primary/10"
                        : "bg-muted/30"
                        }`}
                    >
                      <ach.icon
                        className={`h-4 w-4 ${ach.earned ? "text-primary" : "text-muted-foreground"
                          }`}
                      />
                    </div>
                    <span className="mt-1.5 text-[9px] font-medium leading-tight">
                      {ach.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity feed */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{t("dashboard.recentActivity")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    text: 'Completed "Account Model"',
                    xp: "+25 XP",
                    time: "2h ago",
                  },
                  {
                    text: 'Passed challenge "Hello Solana"',
                    xp: "+50 XP",
                    time: "Yesterday",
                  },
                  {
                    text: "Started Anchor Development",
                    xp: "",
                    time: "2d ago",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-muted-foreground">{item.text}</span>
                    <div className="flex items-center gap-2">
                      {item.xp && (
                        <span className="font-medium text-primary">
                          {item.xp}
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
        </div>
      </div>
    </main>
  );
}
