"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    ChevronRight,
    PlayCircle,
    Code2,
    BookOpen,
    Zap,
    Lock,
    CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Module, Lesson } from "@/types";

interface CurriculumAccordionProps {
    modules: Module[];
    courseSlug: string;
    xpPerLesson: number;
    /** ids of completed lessons (future: from on-chain/local state) */
    completedLessons?: string[];
}

function LessonRow({
    lesson,
    courseSlug,
    xp,
    index,
    isCompleted,
}: {
    lesson: Lesson;
    courseSlug: string;
    xp: number;
    index: number;
    isCompleted: boolean;
}) {
    const isChallenge = lesson.isChallenge;

    return (
        <Link
            href={`/courses/${courseSlug}/lessons/${lesson.id}`}
            className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-all hover:border-primary/20 hover:bg-primary/5"
        >
            {/* Lesson number / check */}
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/60 text-[10px] font-semibold text-muted-foreground group-hover:border-primary/40">
                {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                    <span>{index + 1}</span>
                )}
            </div>

            {/* Type icon */}
            <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${isChallenge
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-primary/10 text-primary"
                    }`}
            >
                {isChallenge ? (
                    <Code2 className="h-3.5 w-3.5" />
                ) : (
                    <PlayCircle className="h-3.5 w-3.5" />
                )}
            </div>

            {/* Title + badges */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="truncate text-sm font-medium group-hover:text-primary/90 transition-colors">
                    {lesson.title}
                </span>
                {isChallenge && (
                    <Badge
                        variant="outline"
                        className="shrink-0 border-yellow-500/40 bg-yellow-500/10 text-[10px] text-yellow-400"
                    >
                        Challenge
                    </Badge>
                )}
            </div>

            {/* Meta */}
            <div className="flex shrink-0 items-center gap-3 text-[11px] text-muted-foreground">
                <span className="hidden sm:block">{lesson.durationMinutes}min</span>
                <span className="flex items-center gap-0.5 text-primary font-medium">
                    <Zap className="h-3 w-3" />+{isChallenge ? xp * 2 : xp} XP
                </span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </Link>
    );
}

function ModuleItem({
    module,
    courseSlug,
    xpPerLesson,
    index,
    defaultOpen,
    completedLessons,
}: {
    module: Module;
    courseSlug: string;
    xpPerLesson: number;
    index: number;
    defaultOpen: boolean;
    completedLessons: string[];
}) {
    const [open, setOpen] = useState(defaultOpen);
    const completedCount = module.lessons.filter((l) =>
        completedLessons.includes(l.id)
    ).length;
    const totalXp = module.lessons.reduce(
        (sum, l) => sum + (l.isChallenge ? xpPerLesson * 2 : xpPerLesson),
        0
    );

    return (
        <div className="overflow-hidden rounded-xl border border-border/50 bg-black/20 backdrop-blur-sm transition-colors hover:border-border">
            {/* Module header */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
            >
                {/* Index badge */}
                <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${completedCount === module.lessons.length && module.lessons.length > 0
                            ? "bg-primary text-black"
                            : "border border-border/60 text-muted-foreground"
                        }`}
                >
                    {completedCount === module.lessons.length && module.lessons.length > 0 ? (
                        <CheckCircle2 className="h-4 w-4" />
                    ) : (
                        index + 1
                    )}
                </div>

                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{module.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {module.lessons.length} lessons · +{totalXp} XP total
                        {completedCount > 0 && (
                            <span className="ml-2 text-primary">
                                · {completedCount}/{module.lessons.length} done
                            </span>
                        )}
                    </p>
                </div>

                {/* Progress pill */}
                {completedCount > 0 && (
                    <div className="hidden sm:block">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-primary/15">
                            <div
                                className="h-full rounded-full bg-primary"
                                style={{
                                    width: `${(completedCount / module.lessons.length) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Chevron */}
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-muted-foreground"
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </button>

            {/* Lesson list */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-border/30 px-2 pb-2 pt-1 space-y-0.5">
                            {module.lessons.map((lesson, li) => (
                                <LessonRow
                                    key={lesson.id}
                                    lesson={lesson}
                                    courseSlug={courseSlug}
                                    xp={xpPerLesson}
                                    index={li}
                                    isCompleted={completedLessons.includes(lesson.id)}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function CurriculumAccordion({
    modules,
    courseSlug,
    xpPerLesson,
    completedLessons = [],
}: CurriculumAccordionProps) {
    const [expandAll, setExpandAll] = useState(false);

    const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
    const completedCount = modules
        .flatMap((m) => m.lessons)
        .filter((l) => completedLessons.includes(l.id)).length;

    return (
        <div className="space-y-3">
            {/* Section header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-base font-bold">Curriculum</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {modules.length} modules · {totalLessons} lessons
                        {completedCount > 0 && (
                            <span className="ml-1 text-primary">
                                ({completedCount} completed)
                            </span>
                        )}
                    </p>
                </div>
                <button
                    onClick={() => setExpandAll((e) => !e)}
                    className="text-xs text-primary hover:underline underline-offset-2 transition-all"
                >
                    {expandAll ? "Collapse all" : "Expand all"}
                </button>
            </div>

            {/* Accordion items */}
            <div className="space-y-2">
                {modules.map((module, i) => (
                    <ModuleItem
                        key={module.id}
                        module={module}
                        courseSlug={courseSlug}
                        xpPerLesson={xpPerLesson}
                        index={i}
                        defaultOpen={i === 0 || expandAll}
                        completedLessons={completedLessons}
                    />
                ))}
            </div>

            {/* Footer stats */}
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border/30 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                    {totalLessons} lessons
                </span>
                <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    {modules.flatMap((m) => m.lessons).reduce(
                        (s, l) => s + (l.isChallenge ? xpPerLesson * 2 : xpPerLesson),
                        0
                    )}{" "}
                    XP total
                </span>
                <span className="flex items-center gap-1.5">
                    <Code2 className="h-3.5 w-3.5 text-yellow-400" />
                    {modules.flatMap((m) => m.lessons).filter((l) => l.isChallenge).length}{" "}
                    challenges
                </span>
                <span className="flex items-center gap-1.5 ml-auto">
                    <Lock className="h-3.5 w-3.5" />
                    NFT credential on completion
                </span>
            </div>
        </div>
    );
}
