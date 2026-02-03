import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export default function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/sign-up'
  return NextResponse.rewrite(url)
}
 
export const config = {
  matcher: '/post-message',
}