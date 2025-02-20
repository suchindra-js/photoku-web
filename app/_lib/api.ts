import { getSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const session = await getSession(); // Get JWT from NextAuth
  const authHeader = session?.accessToken
    ? { Authorization: `Bearer ${session.accessToken}` }
    : {};

  console.log("auth", session);

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeader, // Include Authorization header
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error(`Fetch error: ${res.status}`);

  return res.json();
}
