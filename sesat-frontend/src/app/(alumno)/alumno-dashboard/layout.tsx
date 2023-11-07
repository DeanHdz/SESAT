import "../../globals.css";
import type { Metadata } from "next";
import AlumnoNavbar from "./components/AlumnoNavbar";
import { UsuarioEndpoint } from "../../../../utils/usuario.endpoint";
import { LoggedUser, Usuario } from "../../../../types/ISESAT";
import Cookies from "js-cookie";
import { LoginEndpoint } from "../../../../utils/login.endpoint";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Sistema de Evaluación y Seguimiento de Tesis",
  description: "Panel de alumno",
  icons: "/images/uaslp-logo.png",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = cookies().get("SESATsession")?.value;
  const token: string = cookie ? cookie.substring(1, cookie?.length - 1) : "";
  const user: LoggedUser = await LoginEndpoint.getUserInfo(token);
  const usuarioData: Promise<Usuario[]> = UsuarioEndpoint.getUserById(user.id_usuario, token)
  const usuario = await usuarioData;

  return (
    <html lang="es">
      <body className="w-screen overflow-x-hidden mb-10">
        <div className="flex lg:flex-row justify-center w-11/12 m-auto mt-6">
          <div className="w-full">
            <AlumnoNavbar user={usuario[0]} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
