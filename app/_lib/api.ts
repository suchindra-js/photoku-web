import { getSession, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiFetchOptions extends RequestInit {
  auth?: boolean; // Option to include auth header or not
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  try {
    let authHeader = {};

    if (options.auth !== false) {
      const session = await getSession(); // Fetch session only when auth is needed

      if (session?.user?.accessToken) {
        authHeader = { Authorization: `Bearer ${session.user.accessToken}` };
      }
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
        ...options.headers, // Allow additional headers
      },
    });

    if (res.status === 401) {
      console.warn("Unauthorized access detected, logging out...");
      await signOut({ redirectTo: "/sign-in" }); // Sign the user out
      return Promise.reject(new Error("Unauthorized"));
    }

    if (!res.ok) {
      const errorText = await res.text(); // Get detailed error message
      throw new Error(`Fetch error: ${res.status} - ${errorText}`);
    }

    return res.json() as Promise<T>;
  } catch (error) {
    console.error(`API Fetch Error: ${error}`);
    throw error;
  }
}
