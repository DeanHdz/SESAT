import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'


export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin-dashboard')) {
    /*cookies().set({
      name: 'name',
      value: 'lee',
      httpOnly: true,
      path: '/',
    })*/
  }
}
