"use server";

import { cookies } from "next/headers";

export async function loginUser(payload: { email: string; password: string }) {
  const url: string = `${process.env.NEXT_PUBLIC_API}/auth/login`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to login");
  }
  const user = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("token", user.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return { success: true, user };
}
