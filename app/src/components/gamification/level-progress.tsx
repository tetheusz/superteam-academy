"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface LevelProgressProps {
    totalXp: number;
    className?: string;
}

function deriveLevelInfo(xp: number) {
    const level = Math.floor(Math.sqrt(xp / 100));
    const xpForCurrentLevel = level * level * 100;
    const xpForNextLevel = (level + 1) * (level + 1) * 100;
    const xpInLevel = xp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    const progressPct = xpNeeded > 0 ? Math.min((xpInLevel / xpNeeded) * 100, 100) : 0;

    return { level, xpForNextLevel, xpInLevel, xpNeeded, progressPct };
}

export function LevelProgress({ totalXp, className }: LevelProgressProps) {
    const { level, xpForNextLevel, xpInLevel, xpNeeded, progressPct } =
        deriveLevelInfo(totalXp);

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-xs font-bold text-primary-foreground shadow-lg">
                        {level}
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Level {level}</p>
                        <p className="text-xs text-muted-foreground">
                            {totalXp.toLocaleString('en-US')} XP total
                        </p>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">
                    {xpInLevel.toLocaleString('en-US')} / {xpNeeded.toLocaleString('en-US')} XP
                </p>
            </div>

            <Progress value={progressPct} className="h-2.5" />

            <p className="text-[10px] text-muted-foreground text-right">
                {(xpNeeded - xpInLevel).toLocaleString('en-US')} XP to Level {level + 1}
            </p>
        </div>
    );
}

export { deriveLevelInfo };
