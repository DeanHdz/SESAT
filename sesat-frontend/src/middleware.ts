import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { LoginEndpoint } from "../utils/login.endpoint";

export async function middleware(request: NextRequest)
{
  const token = request.cookies.get('SESATsession');
  const url = request.nextUrl.clone()
  //console.log(token?.value.substring(1, token?.value.length - 1))
  if(token != undefined)
  {
    //console.log(token)
    if(request.nextUrl.pathname.startsWith('/admin-dashboard'))
    {
      const role = await LoginEndpoint.getUserRole(token?.value.substring(1, token?.value.length - 1));
      //console.log(rol.rol)
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
          case "Administrador":
            url.pathname = '/admin-dashboard';
            return NextResponse.redirect(url);
            break;
        }
      }
    }
  }
  //console.log(token)
}