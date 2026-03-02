import { NextResponse } from "next/server";

/**
 * GET /api/progress?wallet=<address>&courseId=<id>
 *
 * Returns learning progress for a wallet + course. Currently a stub
 * that returns mock data. In production, this would query on-chain
 * enrollment PDAs and lesson bitmaps.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");
    const courseId = searchParams.get("courseId");

    if (!wallet) {
        return NextResponse.json(
            { error: "Missing wallet parameter" },
            { status: 400 }
        );
    }

    // Stub response — replace with on-chain PDA reads
    const progress = {
        wallet,
        courseId: courseId ?? null,
        completedLessons: [],
        totalLessons: 0,
        xpEarned: 0,
        enrolledAt: null,
        completedAt: null,
    };

    return NextResponse.json(progress);
}
