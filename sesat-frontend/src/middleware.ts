import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getRoleSS from "./app/(auth)/actions";

export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("SESATsession");
//   const url = request.nextUrl.clone();
//   console.log("In middleware")
//   if (token != undefined) {
//     const role: any = await getRoleSS(token?.value.substring(1, token?.value.length - 1));

//     if (request.nextUrl.pathname.startsWith("/admin-dashboard")) {
//       if (role.rol != "Administrador") {
//         switch (role.rol) {
//           case "Alumno":
//             url.pathname = "/alumno-dashboard";
//             return NextResponse.redirect(url);
//             break;
//           case "Asesor":
//             url.pathname = "/asesor-dashboard";
//             return NextResponse.redirect(url);
//             break;
//         }
//         url.pathname = "/";
//         return NextResponse.redirect(url);
//       }
//     } else if (request.nextUrl.pathname.startsWith("/asesor-dashboard")) {
//       if (role.rol != "Asesor") {
//         switch (role.rol) {
//           case "Alumno":
//             url.pathname = "/alumno-dashboard";
//             return NextResponse.redirect(url);
//             break;
//           case "Administrador":
//             url.pathname = "/admin-dashboard";
//             return NextResponse.redirect(url);
//             break;
//         }
//         url.pathname = "/";
//         return NextResponse.redirect(url);
//       }
//     } else if (request.nextUrl.pathname.startsWith("/alumno-dashboard")) {
//       if (role.rol != "Alumno") {
//         switch (role.rol) {
//           case "Asesor":
//             url.pathname = "/asesor-dashboard";
//             return NextResponse.redirect(url);
//             break;
//           case "Administrador":
//             url.pathname = "/admin-dashboard";
//             return NextResponse.redirect(url);
//             break;
//         }
//         url.pathname = "/";
//         return NextResponse.redirect(url);
//       }
//     }
//   }else{
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }
// }

// export const config = {
//   matcher: [
//     /* Admin Dashboard Routes */
//     '/admin-dashboard',
//     '/admin-dashboard/assignments',
//     '/admin-dashboard/assignments/masters',
//     '/admin-dashboard/assignments/masters/full-time',
//     '/admin-dashboard/assignments/masters/full-time/:group*',
//     '/admin-dashboard/assignments/masters/full-time/:group*/create-assignment',
//     '/admin-dashboard/assignments/masters/full-time/:group*/details',
//     '/admin-dashboard/assignments/masters/part-time',
//     '/admin-dashboard/assignments/masters/part-time/:group*',
//     '/admin-dashboard/assignments/masters/part-time/:group*/create-assignment',
//     '/admin-dashboard/assignments/masters/part-time/:group*/details',
//     '/admin-dashboard/assignments/phd',
//     '/admin-dashboard/assignments/phd/:group*',
//     '/admin-dashboard/assignments/phd/:group*/create-assignment',
//     '/admin-dashboard/assignments/phd/:group*/create-assignment/:tipo*',
//     '/admin-dashboard/assignments/phd/:group*/details',
//     '/admin-dashboard/assignments/phd/:group*/details/:tipo*',
//     '/admin-dashboard/sesat-archive',
//     '/admin-dashboard/sesat-archive/view-thesis-masters',
//     '/admin-dashboard/sesat-archive/view-thesis-masters/:thesisId*',
//     '/admin-dashboard/sesat-archive/view-thesis-masters/full-time',
//     '/admin-dashboard/sesat-archive/view-thesis-masters/full-time/:thesisId*',
//     '/admin-dashboard/sesat-archive/view-thesis-phd',
//     '/admin-dashboard/sesat-archive/view-thesis-phd/:thesisId*',
//     '/admin-dashboard/sesat-users',
//     '/admin-dashboard/sesat-users/alumnos',
//     '/admin-dashboard/sesat-users/alumnos/masters-degree',
//     '/admin-dashboard/sesat-users/alumnos/phd',
//     '/admin-dashboard/sesat-users/alumnos/register',
//     '/admin-dashboard/sesat-users/asesores',
//     '/admin-dashboard/sesat-users/asesores/register',

//     /* Asesor Dashboard Routes */
//     '/asesor-dashboard',
//     '/asesor-dashboard/asesor-assignment',
//     '/asesor-dashboard/asesor-assignment/:idAsignacion',
//     '/asesor-dashboard/search-thesis',
//     '/asesor-dashboard/students',
//     '/asesor-dashboard/students/masters-degree',
//     '/asesor-dashboard/students/masters-degree/:idAlumno',
//     '/asesor-dashboard/students/phd',
//     '/asesor-dashboard/students/phd/:idAlumno',
    
//     /* Alumno Dashboard Routes */
//     '/alumno-dashboard',
//     '/alumno-dashboard/alumno-assignment',
//     '/alumno-dashboard/alumno-assignment/:idAsignacion',
//     '/alumno-dashboard/profile-history',
//     '/alumno-dashboard/register',
//     '/alumno-dashboard/register-ext',
//   ],
}
