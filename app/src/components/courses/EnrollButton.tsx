"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { enrollInCourse, checkEnrollment } from "@/solana/enrollment";
import { useI18n } from "@/i18n/I18nProvider";

type Props = {
    courseId: string;
    courseSlug: string;
    firstLessonId: string;
};

export function EnrollButton({ courseId, courseSlug, firstLessonId }: Props) {
    const { publicKey, sendTransaction, connected } = useWallet();
    const router = useRouter();
    const { t } = useI18n();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        async function check() {
            if (!connected || !publicKey) {
                setLoading(false);
                setIsEnrolled(false);
                return;
            }
            try {
                const enrolled = await checkEnrollment(courseId, publicKey);
                setIsEnrolled(enrolled);
            } catch (err) {
                console.error("Failed to check enrollment:", err);
            } finally {
                setLoading(false);
            }
        }
        check();
    }, [connected, publicKey, courseId]);

    const handleEnroll = async () => {
        if (!publicKey) return;
        try {
            setEnrolling(true);
            const signature = await enrollInCourse({
                courseId,
                learnerWallet: publicKey,
                sendTransaction,
            });
            // eslint-disable-next-line no-console
            console.log("Enrolled! Signature:", signature);
            setIsEnrolled(true);
            router.push(`/courses/${courseSlug}/lessons/${firstLessonId}`);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Enrollment failed:", error);
            // We could add a toast notification here later
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) {
        return (
            <button disabled className="w-full rounded-md bg-muted py-2 text-sm font-semibold opacity-50">
                Loading...
            </button>
        );
    }

    if (!connected) {
        return (
            <button
                disabled
                className="w-full rounded-md bg-muted py-2 text-sm font-semibold text-muted-foreground"
            >
                Connect Wallet to Enroll
            </button>
        );
    }

    if (isEnrolled) {
        return (
            <button
                onClick={() => router.push(`/courses/${courseSlug}/lessons/${firstLessonId}`)}
                className="w-full rounded-md bg-primary/20 text-primary py-2 text-sm font-semibold hover:bg-primary/30 transition-colors"
            >
                Continue Learning
            </button>
        );
    }

    return (
        <button
            onClick={handleEnroll}
            disabled={enrolling}
            className={`w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-semibold hover:bg-primary/90 transition-colors ${enrolling ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {enrolling ? "Enrolling on-chain..." : "Enroll Now"}
        </button>
    );
}
