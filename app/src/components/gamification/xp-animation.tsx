"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface XPAnimationProps {
    amount: number;
    onComplete?: () => void;
}

export function XPAnimation({ amount, onComplete }: XPAnimationProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 1500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div
            className={cn(
                "pointer-events-none fixed inset-0 z-[100] flex items-center justify-center",
                "animate-in fade-in-0 zoom-in-95"
            )}
        >
            <div className="flex flex-col items-center gap-2 animate-xp-float">
                <span className="text-4xl font-bold gradient-text drop-shadow-lg">
                    +{amount} XP
                </span>
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
            </div>
        </div>
    );
}
