"use server";
import db from "@/db";
import { user } from "@/db/schema";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { eq } from "drizzle-orm";

export const createUser = async (formData: FormData) => {
  const name = formData.get('name') as string
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  db.insert(user).values({ name, username, password }).run()
  redirect('/log-in')
}

export const loginUser = async (formData: FormData) => {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const existingUser = await db.select().from(user).where(eq(user.username, username)).get()
  if (!existingUser || existingUser.password !== password) {
    throw new Error('Invalid credentials')
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const refreshToken = await new SignJWT({ username, password })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("24w")
    .sign(secret)
  const accessToken = await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret)

  const cookieStore = await cookies()
  cookieStore.set("refresh_token", refreshToken, { httpOnly: true, path: '/' })  
  cookieStore.set("access_token", accessToken, { httpOnly: true, path: '/' })

  redirect('/')
}