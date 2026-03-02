import type { ReactNode } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Zap,
  BookOpen,
  Clock,
} from "lucide-react";
import type { Course } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  course: Course;
  sidebar?: ReactNode;
  children: ReactNode;
};

export function CourseLayout({ course, sidebar, children }: Props) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/courses" className="hover:text-primary transition-colors">
            Courses
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{course.title}</span>
        </nav>
        <h1 className="mt-2 text-2xl font-bold">{course.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          {course.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Main content */}
        <Card>
          <CardContent className="p-5">{children}</CardContent>
        </Card>

        {/* Sidebar */}
        <aside className="space-y-4">
          {sidebar}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">
                Course Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  XP per lesson
                </span>
                <Badge variant="default" className="text-[10px]">{course.xpPerLesson} XP</Badge>
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
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
