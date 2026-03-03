import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  BookOpen,
  Zap,
  BarChart2,
  GraduationCap,
  Star,
} from "lucide-react";
import { CMSService } from "@/services/cms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnrollButton } from "@/components/courses/EnrollButton";
import { CurriculumAccordion } from "@/components/courses/CurriculumAccordion";

const DIFFICULTY_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Beginner", color: "text-green-400 bg-green-400/10 border-green-400/30" },
  2: { label: "Intermediate", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" },
  3: { label: "Advanced", color: "text-red-400 bg-red-400/10 border-red-400/30" },
};

type Params = { params: { slug: string } };

export default async function CoursePage({ params }: Params) {
  const course = await CMSService.getCourseBySlug(params.slug);
  if (!course) return notFound();

  const firstLessonId = course.modules[0]?.lessons[0]?.id || "";
  const diff = DIFFICULTY_LABELS[course.difficulty] ?? DIFFICULTY_LABELS[1];
  const totalXp = course.totalLessons * course.xpPerLesson;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/courses" className="hover:text-primary transition-colors">
          Courses
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{course.title}</span>
      </nav>

      {/* ── HERO HEADER ─────────────────────────────────────── */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/8 via-background to-secondary/8 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className={`text-[11px] ${diff.color}`}
              >
                {diff.label}
              </Badge>
              <Badge variant="outline" className="text-[11px] text-muted-foreground">
                {course.modules.length} modules
              </Badge>
            </div>

            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              {course.title}
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              {course.description}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 pt-1 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                {course.totalLessons} lessons
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                {course.durationHours}h estimated
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                {totalXp} XP total
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                {course.instructor}
              </span>
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="w-full sm:w-64 shrink-0">
            <Card className="border-primary/20 bg-black/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-medium">
                    Earn <span className="text-primary">{totalXp} XP</span> + NFT credential
                  </span>
                </div>
                <EnrollButton
                  courseId={course.id}
                  courseSlug={course.slug}
                  firstLessonId={firstLessonId}
                />
                <p className="text-center text-[10px] text-muted-foreground">
                  Free · On-chain verified · Soulbound NFT
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ───────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        {/* Curriculum accordion — main content */}
        <div className="order-2 lg:order-1">
          <CurriculumAccordion
            modules={course.modules}
            courseSlug={course.slug}
            xpPerLesson={course.xpPerLesson}
          />
        </div>

        {/* Sidebar */}
        <aside className="order-1 lg:order-2 space-y-4">
          {/* Course stats card */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">
                Course Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <BarChart2 className="h-3.5 w-3.5 text-primary" />
                  Difficulty
                </span>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${diff.color}`}
                >
                  {diff.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  XP per lesson
                </span>
                <span className="font-medium text-primary">
                  {course.xpPerLesson} XP
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" />
                  Total lessons
                </span>
                <span className="font-medium">{course.totalLessons}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  Duration
                </span>
                <span className="font-medium">{course.durationHours}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Instructor
                </span>
                <span className="font-medium truncate max-w-[120px]">
                  {course.instructor}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* What you'll learn */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">
                What you&apos;ll learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  Understand the Solana programming model
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  Build and deploy smart contracts using Anchor
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  Interact with on-chain programs from a frontend
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  Manage tokens, NFTs, and account data
                </li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
