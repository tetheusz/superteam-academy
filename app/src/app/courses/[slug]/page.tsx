import { notFound } from "next/navigation";
import Link from "next/link";
import { CourseLayout } from "../../../components/courses/CourseLayout";
import { CMSService } from "@/services/cms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnrollButton } from "@/components/courses/EnrollButton";

type Params = {
  params: {
    slug: string;
  };
};

export default async function CoursePage({ params }: Params) {
  const course = await CMSService.getCourseBySlug(params.slug);

  if (!course) {
    return notFound();
  }

  const firstLessonId = course.modules[0]?.lessons[0]?.id || "";

  return (
    <CourseLayout
      course={course}
      sidebar={
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <EnrollButton courseId={course.id} courseSlug={course.slug} firstLessonId={firstLessonId} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">
                Modules &amp; Lessons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {course.modules.map((module, mi) => (
                  <li key={module.id}>
                    <div className="text-xs font-semibold flex items-center gap-2">
                      <Badge variant="secondary" className="h-5 w-5 p-0 text-[10px] justify-center shrink-0">
                        {mi + 1}
                      </Badge>
                      {module.title}
                    </div>
                    <ol className="mt-2 ml-7 space-y-1.5">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <Link
                            href={`/courses/${course.slug}/lessons/${lesson.id}`}
                            className="text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            {lesson.title}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      }
    >
      <div className="space-y-4 text-sm text-muted-foreground">
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">About this course</h2>
          <p className="leading-relaxed">
            {course.description}
          </p>
          <p className="leading-relaxed">
            This course covers {course.totalLessons} hands-on lessons across {course.modules.length} modules.
            Complete every lesson to earn <span className="font-medium text-primary">{course.totalLessons * course.xpPerLesson} XP</span> and unlock your on-chain credential NFT.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-border/50">
          <h3 className="text-sm font-semibold text-foreground">What you&apos;ll learn</h3>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
            <li>Understand the Solana programming model</li>
            <li>Build and deploy smart contracts using Anchor</li>
            <li>Interact with on-chain programs from a frontend</li>
            <li>Manage tokens, NFTs, and account data</li>
          </ul>
        </div>
      </div>
    </CourseLayout>
  );
}
