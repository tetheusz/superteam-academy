import { NextResponse } from "next/server";

/**
 * GET /api/credentials?wallet=<address>
 *
 * Returns NFT credentials for a wallet. Currently a stub.
 * In production, this would call Helius DAS getAssetsByOwner
 * filtered by the academy collection.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");

    if (!wallet) {
        return NextResponse.json(
            { error: "Missing wallet parameter" },
            { status: 400 }
        );
    }

    // Stub response — replace with Helius DAS query
    const credentials: {
        id: string;
        name: string;
        image: string;
        courseSlug: string;
        mintedAt: string;
    }[] = [];

    return NextResponse.json({
        wallet,
        credentials,
        total: credentials.length,
    });
}
