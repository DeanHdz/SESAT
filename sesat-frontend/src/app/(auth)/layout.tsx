import LoginNavbar from '../components/LoginNavbar'
import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SESAT',
  description: 'Iniciar Sesión',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <LoginNavbar />
        {children}
      </body>
    </html>
  )
}
