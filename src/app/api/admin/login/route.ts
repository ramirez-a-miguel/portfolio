import {
  createSessionToken,
  getAdminUsername,
  setAdminSessionCookie,
  validateAdminCredentials,
} from "@/lib/admin-auth";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !validateAdminCredentials(username, password)
  ) {
    return NextResponse.json(
      { message: `Use the configured admin login for ${getAdminUsername()}.` },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ authenticated: true, username });
  setAdminSessionCookie(response, createSessionToken(username));

  return response;
}
