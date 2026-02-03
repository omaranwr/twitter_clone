import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyCookies } from './lib/auth'
import { cookies } from 'next/headers'
 
export default async function proxy(request: NextRequest) {
  if(await verifyCookies(await cookies())) return
  const url = request.nextUrl.clone()
  url.pathname = '/sign-up'
  return NextResponse.rewrite(url)
}
 
export const config = {
  matcher: '/post-message',
}