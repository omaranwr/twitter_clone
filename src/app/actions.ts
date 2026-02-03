"use server";
import db from "@/db";
import { user, post } from "@/db/schema";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { ActionResponse, SignUpActionResponse, SignupFormSchema, AccessTokenPayload } from "@/lib/definitions";
import * as z from 'zod'
import { generateAccessToken, generateRefreshToken, setCookies, verifyCookies } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const createUser = 
async (_: SignUpActionResponse, formData: FormData) : Promise<SignUpActionResponse> => {

  const name = formData.get('name') as string
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  
  const arr = await db.select().from(user).where(eq(user.username, username)).all();
  if(arr.length > 0) return {errors: {username: ["Username already exists"]}}

  try {
    SignupFormSchema.parse({ name, username, password })
  } catch (e) {
    if (e instanceof z.ZodError) 
      return { errors: z.flattenError(e).fieldErrors }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.insert(user).values({ name, username, password: hashedPassword }).run()
  redirect('/log-in')
}

export const loginUser = 
async (_: ActionResponse, formData: FormData) : Promise<ActionResponse> => {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const existingUser = await db.select().from(user).where(eq(user.username, username)).get()
  const res = await bcrypt.compare(password, existingUser?.password || '')
  if (!existingUser || !res) {
    return { message: 'Invalid username or password' }
  }

  const refreshToken = await generateRefreshToken(existingUser.id, existingUser.password)

  const accessTokenPayload: AccessTokenPayload = { 
    id: existingUser.id,
    username: existingUser.username,
    name: existingUser.name
  }
  const accessToken = await generateAccessToken(accessTokenPayload)

  const cookieStore = await cookies()
  setCookies(cookieStore, refreshToken,  accessToken)

  redirect('/')
}

export const postMessage = 
async (_: ActionResponse, formData: FormData) : Promise<ActionResponse> => {

  const cookieStore = await cookies()
  const user = await verifyCookies(cookieStore)
  if (!user) {
    redirect('/sign-up')
  }
  
  const message = formData.get('message') as string
  const result = await db.insert(post).values({ userId: user.id, content: message }).run()
  if (!result) {
    return { message: 'Failed to post message' }
  }

  revalidatePath("/posts")
  redirect("/posts")
}