"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "../../i18n/I18nProvider";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  Zap,
  Clock,
  ChevronRight,
  Filter,
} from "lucide-react";
import { CMSService } from "@/services/cms";
import type { Course } from "../../types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const getDifficultyLabel = (difficulty: number, t: any) => {
  switch (difficulty) {
    case 1:
      return t("courses.filter.beginner");
    case 2:
      return t("courses.filter.intermediate");
    case 3:
      return t("courses.filter.advanced");
    default:
      return "";
  }
};
const difficultyVariants: Record<number, "default" | "secondary" | "destructive"> = {
  1: "default",
  2: "secondary",
  3: "destructive",
};

export default function CoursesPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<string>("0");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      const data = await CMSService.getCourses();
      setCourses(data);
      setLoading(false);
    }
    loadCourses();
  }, []);

  const filtered = useMemo(
    () =>
      courses.filter((course) => {
        const matchDifficulty =
          difficulty === "0" || course.difficulty === Number(difficulty);
        const q = search.toLowerCase();
        const matchSearch =
          q.length === 0 ||
          course.title.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q);
        return matchDifficulty && matchSearch;
      }),
    [search, difficulty, courses]
  );


  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            {t("courses.title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("courses.subtitle")}
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("courses.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 md:w-56"
            />
          </div>
          <Tabs
            value={difficulty}
            onValueChange={setDifficulty}
          >
            <TabsList>
              <TabsTrigger value="0">{t("courses.filter.all")}</TabsTrigger>
              <TabsTrigger value="1">{t("courses.filter.beginner")}</TabsTrigger>
              <TabsTrigger value="2">{t("courses.filter.intermediate")}</TabsTrigger>
              <TabsTrigger value="3">{t("courses.filter.advanced")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </motion.div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <Link href={`/courses/${course.slug}`}>
              <Card className="group h-full cursor-pointer hover:border-primary/30 hover:shadow-[0_0_25px_rgba(20,241,149,0.08)] transition-all">
                <CardContent className="flex h-full flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={difficultyVariants[course.difficulty]}>
                      {getDifficultyLabel(course.difficulty, t)}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {course.durationHours}h
                    </span>
                  </div>

                  <h2 className="mt-3 text-base font-semibold group-hover:text-primary transition-colors">
                    {course.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground flex-1">
                    {course.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.totalLessons} {t("courses.stats.lessons")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-primary" />
                      {course.xpPerLesson} {t("courses.stats.xpPerLesson")}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{t("courses.stats.totalXp")}</span>
                      <span className="font-medium text-primary">
                        {course.totalLessons * course.xpPerLesson}
                      </span>
                    </div>
                    <Progress value={0} className="h-1" />
                  </div>

                  <div className="mt-3 flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("courses.startLearning")}
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <Search className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              {t("courses.emptySearch")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
