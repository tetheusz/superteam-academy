import { notFound } from "next/navigation";
import Link from "next/link";
import { CMSService } from "@/services/cms";
import { CourseLayout } from "../../../../../components/courses/CourseLayout";
import { LessonInteractive } from "@/components/courses/LessonInteractive";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Module, Lesson } from "@/types";

type Params = {
  params: {
    slug: string;
    lessonId: string;
  };
};

export default async function LessonPage({ params }: Params) {
  const course = await CMSService.getCourseBySlug(params.slug);

  if (!course) {
    return notFound();
  }

  const allLessons = course.modules.flatMap((m: Module) => m.lessons);
  const currentIndex = allLessons.findIndex((l: Lesson) => l.id === params.lessonId);
  const lesson = allLessons[currentIndex];

  if (!lesson) {
    return notFound();
  }

  const currentModule = course.modules.find((m: Module) =>
    m.lessons.some((l: Lesson) => l.id === params.lessonId)
  );

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <CourseLayout
      course={course}
      sidebar={
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">
              Lesson Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div>
              <span className="text-muted-foreground">Module:</span>
              <p className="font-medium mt-0.5">{currentModule?.title}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Type</span>
              <Badge variant={lesson.isChallenge ? "destructive" : "secondary"} className="text-[10px]">
                {lesson.isChallenge ? "Challenge" : "Lesson"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">XP Reward</span>
              <span className="flex items-center gap-1 font-medium text-primary">
                <Zap className="h-3 w-3" />
                {course.xpPerLesson}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {currentIndex + 1}/{allLessons.length}
              </span>
            </div>
          </CardContent>
        </Card>
      }
    >
      <LessonInteractive lesson={lesson} xpReward={course.xpPerLesson} />

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
        {prevLesson ? (
          <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs">
            <Link
              href={`/courses/${course.slug}/lessons/${prevLesson.id}`}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              {prevLesson.title}
            </Link>
          </Button>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs">
            <Link
              href={`/courses/${course.slug}/lessons/${nextLesson.id}`}
            >
              {nextLesson.title}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        ) : (
          <Button asChild size="sm" className="gap-1.5 text-xs">
            <Link href={`/courses/${course.slug}`}>
              Complete Course
            </Link>
          </Button>
        )}
      </div>
    </CourseLayout>
  );
}
