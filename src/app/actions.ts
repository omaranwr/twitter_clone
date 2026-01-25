"use server";
import db from "@/db";
import { user } from "@/db/schema";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const createUser = async (formData: FormData) => {
  const name = formData.get('name') as string
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.insert(user).values({ name, username, password: hashedPassword }).run()
  redirect('/log-in')
}

export const loginUser = async (formData: FormData) => {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const existingUser = await db.select().from(user).where(eq(user.username, username)).get()
  const res = await bcrypt.compare(password, existingUser?.password || '')
  if (!existingUser || !res) {
    return { error: 'Invalid username or password' }
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const refreshToken = await new SignJWT({ id: existingUser.id, password: existingUser.password })
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
  cookieStore.set("refresh_token", refreshToken, 
    { 
      httpOnly: true, 
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 24, // 24 weeks
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })  
  cookieStore.set("access_token", accessToken, 
    { 
      httpOnly: true, 
      path: '/',
      maxAge: 60 * 60, // 1 hour
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

  redirect('/')
}