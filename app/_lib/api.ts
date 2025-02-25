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
      const session = await getSession();

      if (session?.user?.accessToken) {
        authHeader = { Authorization: `Bearer ${session.user.accessToken}` };
      }
    }

    const isMultipart = options.body instanceof FormData;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(isMultipart ? {} : { "Content-Type": "application/json" }), // Don't set for FormData
        ...authHeader,
        ...options.headers,
      },
    });

    if (res.status === 401) {
      console.warn("Unauthorized access detected, logging out...");
      await signOut({ redirectTo: "/sign-in" });
      return Promise.reject(new Error("Unauthorized"));
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Fetch error: ${res.status} - ${errorText}`);
    }

    return res.json() as Promise<T>;
  } catch (error) {
    console.error(`API Fetch Error: ${error}`);
    throw error;
  }
}
