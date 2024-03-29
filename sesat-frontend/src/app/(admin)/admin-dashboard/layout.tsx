import Drawer from './components/Drawer'
import '../../globals.css'
import type { Metadata } from 'next'
import AdminNavbar from './components/AdminNavbar'

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
      <body className="w-screen overflow-x-hidden mb-10">
        <div className="flex lg:flex-row justify-center w-11/12 lg:w-5/6 m-auto mt-6 max-w-[1600px]">

          <div className="hidden lg:flex lg:w-3/12">
            <Drawer />
          </div>

          <div className="w-full lg:w-9/12">
            <div className='lg:flex'>
              <AdminNavbar />
            </div>

            {children}

          </div>

        </div>
      </body>
    </html>
  )
}
