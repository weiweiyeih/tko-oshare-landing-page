import { getLandingPages } from "@/lib/googleSheet";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await getLandingPages();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
