import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (request.cookies.get("authToken")?.value === "authenticated") {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
