import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
<<<<<<< HEAD
import { verifyCookies } from './lib/auth'
import { cookies } from 'next/headers'
 
export default async function proxy(request: NextRequest) {
  if(await verifyCookies(await cookies())) return
=======
 
export default function proxy(request: NextRequest) {
>>>>>>> 3147a80d98b725ece366d064fd17842331f831b1
  const url = request.nextUrl.clone()
  url.pathname = '/sign-up'
  return NextResponse.rewrite(url)
}
 
export const config = {
  matcher: '/post-message',
}