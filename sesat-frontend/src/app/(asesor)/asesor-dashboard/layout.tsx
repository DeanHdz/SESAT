import Drawer from '../components/Drawer'
import '../../globals.css'
import type { Metadata } from 'next'
import AdminNavbar from '../components/AsesorNavbar'

export const metadata: Metadata = {
  title: 'Sistema de Evaluación y Seguimiento de Tesis',
  description: 'Panel de administrador',
  icons: '/images/uaslp-logo.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="es">
      <body className="">
        <div className="lg:flex">
          <AdminNavbar />
        </div>
        {/* <div className="hidden lg:flex lg:w-3/12">
            <Drawer />
          </div> */}

        {children}
      </body>
    </html>
  )
}
