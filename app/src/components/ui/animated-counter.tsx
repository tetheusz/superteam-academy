"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    formatter?: (n: number) => string;
}

export function AnimatedCounter({
    value,
    duration = 1200,
    className = "",
    prefix = "",
    suffix = "",
    formatter,
}: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const previousValue = useRef(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const start = previousValue.current;
        const end = value;
        const diff = end - start;
        const startTime = performance.now();

        function step(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + diff * easeOut);

            setDisplayValue(current);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                setDisplayValue(end);
                previousValue.current = end;
            }
        }

        rafRef.current = requestAnimationFrame(step);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [value, duration]);

    const formatted = formatter
        ? formatter(displayValue)
        : displayValue.toLocaleString('en-US');

    return (
        <span className={className}>
            {prefix}
            {formatted}
            {suffix}
        </span>
    );
}
