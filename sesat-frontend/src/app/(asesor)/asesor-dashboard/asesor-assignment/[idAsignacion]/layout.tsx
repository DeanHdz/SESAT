import Footer from '@/app/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema de Evaluación y Seguimiento de Tesis',
  description: 'Ver asignación (asesor)',
  icons: '/images/uaslp-logo.png',
}

export default function AssignmentLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className='w-full'>
      {children}
    </div>
  )
}
