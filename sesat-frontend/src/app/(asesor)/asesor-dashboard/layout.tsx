import '../../globals.css'
import type { Metadata } from 'next'
import AsesorNavbar from './components/AsesorNavbar'

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
        <div className="flex lg:flex-row justify-center w-11/12 m-auto mt-6 max-w-[1600px]">
          <div className="w-full">
            <AsesorNavbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
