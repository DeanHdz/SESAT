import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { LoginEndpoint } from "../utils/login.endpoint";

export async function middleware(request: NextRequest)
{
  const token = request.cookies.get('SESATsession');
  const url = request.nextUrl.clone()
  if(token != undefined)
  {
    const role = await LoginEndpoint.getUserRole(token?.value.substring(1, token?.value.length - 1));
    if(request.nextUrl.pathname.startsWith('/admin-dashboard'))
    {
      if(role.rol != "Administrador")
      {
        switch(role.rol)
        {
          case "Alumno":
            url.pathname = '/alumno-dashboard';
            return NextResponse.redirect(url);
            break;
          case "Asesor":
            url.pathname = '/asesor-dashboard';
            return NextResponse.redirect(url);
            break;
        }
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }
    else if(request.nextUrl.pathname.startsWith('/asesor-dashboard'))
    {
      if(role.rol != "Asesor")
      {
        switch(role.rol)
        {
          case "Alumno":
            url.pathname = '/alumno-dashboard';
            return NextResponse.redirect(url);
            break;
          case "Administrador":
            url.pathname = '/admin-dashboard';
            return NextResponse.redirect(url);
            break;
        }
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }
    else if(request.nextUrl.pathname.startsWith('/alumno-dashboard'))
    {
      if(role.rol != "Alumno")
      {
        switch(role.rol)
        {
          case "Asesor":
            url.pathname = '/asesor-dashboard';
            return NextResponse.redirect(url);
            break;
          case "Administrador":
            url.pathname = '/admin-dashboard';
            return NextResponse.redirect(url);
            break;
        }
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }
  }
}