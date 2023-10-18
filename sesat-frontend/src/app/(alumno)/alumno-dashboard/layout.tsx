import '../../globals.css'
import type { Metadata } from 'next'
import AlumnoNavbar from './components/AlumnoNavbar'

export const metadata: Metadata = {
  title: 'Sistema de Evaluación y Seguimiento de Tesis',
  description: 'Panel de alumno',
  icons: '/images/uaslp-logo.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="es">
      <body className="w-screen overflow-x-hidden mb-10">
        <div className="flex lg:flex-row justify-center w-11/12 m-auto mt-6">
          <div className="w-full">
            <AlumnoNavbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
