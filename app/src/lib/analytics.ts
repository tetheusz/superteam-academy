/**
 * Analytics — GA4 + custom event tracking.
 *
 * Usage:
 *   import { trackEvent } from "@/lib/analytics";
 *   trackEvent("course_start", { courseId: "solana-101" });
 */

// ---------- GA4 ----------

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}

/** Initialize GA4 (call once in layout or _app) */
export function initGA() {
    if (typeof window === "undefined" || !GA_ID) return;
    if (window.gtag) return; // already loaded

    // Load gtag.js
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
        window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
        page_path: window.location.pathname,
    });
}

// ---------- Custom Events ----------

type EventName =
    | "page_view"
    | "course_start"
    | "course_complete"
    | "lesson_start"
    | "lesson_complete"
    | "challenge_start"
    | "challenge_complete"
    | "enroll"
    | "wallet_connect"
    | "wallet_disconnect"
    | "language_change"
    | "theme_change"
    | "certificate_share"
    | "leaderboard_view";

type EventParams = Record<string, string | number | boolean>;

/** Track a custom event with optional parameters */
export function trackEvent(name: EventName, params?: EventParams) {
    if (typeof window === "undefined") return;
    if (window.gtag) {
        window.gtag("event", name, params);
    }
    // Also log to console during development
    if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log(`[analytics] ${name}`, params);
    }
}

/** Track a page view (call on route change) */
export function trackPageView(path: string) {
    trackEvent("page_view", { page_path: path } as EventParams);
}
