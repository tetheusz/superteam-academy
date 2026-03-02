import { NextResponse } from "next/server";

/**
 * GET /api/leaderboard?period=weekly|monthly|all-time&limit=50
 *
 * Returns XP leaderboard data. Currently a stub with mock data.
 * In production, this would index Token-2022 XP balances via
 * Helius DAS or getTokenAccountsByOwner.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") ?? "all-time";
    const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);

    // Stub leaderboard — replace with XP token balance indexer
    const mockEntries = Array.from({ length: Math.min(limit, 10) }, (_, i) => ({
        rank: i + 1,
        wallet: `${(i + 1).toString(16).padStart(4, "0")}...${(9999 - i).toString(16)}`,
        displayName: `Learner ${i + 1}`,
        xp: Math.floor(5000 / (i + 1)),
        level: Math.floor(Math.sqrt(5000 / (i + 1) / 100)),
        coursesCompleted: Math.max(1, 5 - i),
    }));

    return NextResponse.json({
        period,
        entries: mockEntries,
        updatedAt: new Date().toISOString(),
    });
}
