export type Difficulty = 1 | 2 | 3;
export type CourseId = string;
export type LessonId = string;
export type TrackId = number;

export interface Lesson {
    id: LessonId;
    title: string;
    durationMinutes: number;
    isChallenge: boolean;
    content?: string;
    starterCode?: string;
    solution?: string;
    hint?: string;
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Course {
    id: CourseId;
    slug: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    durationHours: number;
    trackId: TrackId;
    xpPerLesson: number;
    totalLessons: number;
    instructor: string;
    modules: Module[];
}
