import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema de Evaluación y Seguimiento de Tesis',
  description: 'Panel de alumno',
  icons: '/images/uaslp-logo.png',
}

export default function ProfileHistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <main className='w-full'> 
    {children}
    </main>
  )
}
