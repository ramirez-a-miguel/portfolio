import { requireAdminSession } from "@/lib/admin-auth";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio-data";
import type { PortfolioData } from "@/types/portfolio-data";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdminSession();
    return NextResponse.json(await getPortfolioData());
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdminSession();
    const data = (await request.json()) as PortfolioData;
    const saved = await savePortfolioData(data);

    return NextResponse.json(saved);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save content.";
    const status = message === "Unauthorized" ? 401 : 400;

    return NextResponse.json({ message }, { status });
  }
}
