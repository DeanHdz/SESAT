import type { Metadata } from 'next'
import AsesorNavbar from './components/AsesorNavbar'

export const metadata: Metadata = {
  title: 'Sistema de Evaluación y Seguimiento de Tesis',
  description: 'Ver asignación (asesor)',
  icons: '/images/uaslp-logo.png',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div>
      {children}
    </div>
  )
}
