import crypto from "node:crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

const COOKIE_NAME = "portfolioAdminSession";
const SESSION_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  username: string;
  expiresAt: number;
};

function toBase64Url(value: string | Buffer): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): string {
  const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  return Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8");
}

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? process.env.PAGE_ACCESS_PASSWORD ?? "";
}

function getAuthSecret(): string {
  const secret = process.env.ADMIN_AUTH_SECRET ?? process.env.AUTH_SECRET;

  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_AUTH_SECRET or AUTH_SECRET must be set in production.");
  }

  return `${getAdminPassword()}-local-session-secret`;
}

export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME ?? "miguel";
}

function signPayload(payload: string): string {
  return toBase64Url(crypto.createHmac("sha256", getAuthSecret()).update(payload).digest());
}

function safeCompare(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const configuredPassword = getAdminPassword();

  if (!configuredPassword) return false;
  if (username !== getAdminUsername()) return false;

  return safeCompare(password, configuredPassword);
}

export function createSessionToken(username: string): string {
  const payload: SessionPayload = {
    username,
    expiresAt: Date.now() + SESSION_SECONDS * 1000,
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));

  return `${encodedPayload}.${signPayload(encodedPayload)}`;
}

export function verifySessionToken(token?: string): SessionPayload | null {
  if (!token) return null;

  const [payload, signature] = token.split(".");

  if (!payload || !signature || !safeCompare(signature, signPayload(payload))) {
    return null;
  }

  try {
    const session = JSON.parse(fromBase64Url(payload)) as SessionPayload;

    if (session.expiresAt < Date.now()) return null;

    return session;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export async function requireAdminSession(): Promise<SessionPayload> {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export function setAdminSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_SECONDS,
    path: "/",
  });
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
}
