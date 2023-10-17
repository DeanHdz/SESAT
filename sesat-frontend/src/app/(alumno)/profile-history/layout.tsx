import '../../globals.css'
import type { Metadata } from 'next'
import Drawer from '../components/Drawer'
import AlumnoNavbar from '../components/AlumnoNavbar'
import ThesisHistory from './components/ThesisHistory'

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
          
          <div className="w-3/12">
            <div className="hidden lg:flex lg:w-full">
              <Drawer />
            </div>
            <div>
            <ThesisHistory />
            </div>
          </div>
          
          <div className="w-full lg:w-9/12">
            <div className='lg:flex'>
              <AlumnoNavbar />
            </div>
            <main>
              <div className="w-full flex flex-col">
                <label className="mb-6 block text-4xl font-bold">
                  Historial de alumno
                </label>
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
