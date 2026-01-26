import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { AccessTokenPayload } from "./definitions";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import db from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export const generateRefreshToken = 
async (id: number, password: string) : Promise<string> => {
  return await new SignJWT({ id , password })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("24w")
    .sign(secret)
}

export const generateAccessToken = 
async (payload: AccessTokenPayload) : Promise<string> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret)
}

export const setCookies = 
(cookieStore: ReadonlyRequestCookies, refreshToken: string, accessToken: string) => {
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
}

export const setAccessTokenCookie = 
(cookieStore: ReadonlyRequestCookies, accessToken: string) => {
  cookieStore.set("access_token", accessToken, 
    { 
      httpOnly: true, 
      path: '/',
      maxAge: 60 * 60, // 1 hour
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }

export const decryptToken = 
async (token: string) : Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export const verifyCookies = async (cookieStore: ReadonlyRequestCookies) : Promise<AccessTokenPayload | null> => {
  const accessToken = cookieStore.get("access_token")?.value
  if (accessToken) {
    const payload = await decryptToken(accessToken) as AccessTokenPayload
    return payload
  }
  const refreshToken = cookieStore.get("refresh_token")?.value
  if(!refreshToken) return null

  const payload = await decryptToken(refreshToken)
  const id = payload?.id as number
  const existingUser = await db.select().from(user).where(eq(user.id, id)).get()

  if (!existingUser) return null
  const accesTokenPayload : AccessTokenPayload = { 
    id: existingUser.id,
    username: existingUser.username,
    name: existingUser.name
  }
  const newAccessToken = await generateAccessToken(accesTokenPayload)
  setAccessTokenCookie(cookieStore, newAccessToken)
  return accesTokenPayload
}