"use client";

import { cn } from "@/lib/utils";

interface StreakCalendarProps {
    activeDays: string[];
    currentStreak: number;
    longestStreak: number;
    className?: string;
}

function getCalendarDays(): { date: string; dayOfWeek: number }[] {
    const days: { date: string; dayOfWeek: number }[] = [];
    const today = new Date();

    for (let i = 27; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        days.push({
            date: d.toISOString().split("T")[0],
            dayOfWeek: d.getDay(),
        });
    }
    return days;
}

export function StreakCalendar({
    activeDays,
    currentStreak,
    longestStreak,
    className,
}: StreakCalendarProps) {
    const days = getCalendarDays();
    const activeSet = new Set(activeDays);
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className={cn("space-y-4", className)}>
            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <div>
                        <p className="font-bold text-foreground">{currentStreak} days</p>
                        <p className="text-xs text-muted-foreground">Current streak</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-foreground">{longestStreak} days</p>
                    <p className="text-xs text-muted-foreground">Longest streak</p>
                </div>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1.5">
                {["S", "M", "T", "W", "T", "F", "S"].map((label, i) => (
                    <div
                        key={`label-${i}`}
                        className="flex h-6 items-center justify-center text-[10px] text-muted-foreground"
                    >
                        {label}
                    </div>
                ))}
                {days.map(({ date }) => {
                    const isActive = activeSet.has(date);
                    const isToday = date === today;

                    return (
                        <div
                            key={date}
                            className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full text-xs transition-all",
                                isActive
                                    ? "bg-primary text-primary-foreground font-bold shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                                    : "bg-muted text-muted-foreground",
                                isToday && !isActive && "ring-1 ring-primary text-primary",
                                isToday && isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                            )}
                            title={date}
                        >
                            {new Date(date + "T12:00:00").getDate()}
                        </div>
                    );
                })}
            </div>

            {/* Milestones */}
            <div className="flex gap-2">
                {[7, 30, 100].map((milestone) => (
                    <div
                        key={milestone}
                        className={cn(
                            "flex-1 rounded-lg border px-2 py-1.5 text-center text-xs",
                            currentStreak >= milestone
                                ? "border-primary text-primary"
                                : "border-border bg-muted text-muted-foreground"
                        )}
                    >
                        <span className="font-semibold">{milestone}d</span>
                        <span className="ml-1">
                            {currentStreak >= milestone ? "✓" : ""}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
