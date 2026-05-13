import { clearAdminSessionCookie } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });
  clearAdminSessionCookie(response);

  return response;
}
