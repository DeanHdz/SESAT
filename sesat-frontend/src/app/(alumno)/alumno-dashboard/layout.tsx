import '../../globals.css';
import type { Metadata } from 'next';
import AlumnoNavbar from './components/AlumnoNavbar';
import { UsuarioEndpoint } from '../../../../utils/usuario.endpoint';
import { Usuario } from '../../../../types/ISESAT';

export const metadata: Metadata = {
  title: 'Sistema de Evaluación y Seguimiento de Tesis',
  description: 'Panel de alumno',
  icons: '/images/uaslp-logo.png',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  let usuario: Usuario | null = null;

  try {
    usuario = await UsuarioEndpoint.getUserById(314118, '');
  } catch (error) {
    console.error('Error fetching user:', error);
  }

  return (
    <html lang="es">
      <body className="w-screen overflow-x-hidden mb-10">
        <div className="flex lg:flex-row justify-center w-11/12 m-auto mt-6">
          <div className="w-full">
            <AlumnoNavbar user={usuario} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
