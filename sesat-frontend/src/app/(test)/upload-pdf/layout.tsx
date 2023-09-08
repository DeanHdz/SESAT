import Navbar from '@/app/components/Navbar'
import '../../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SESAT',
  description: 'Testing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className='overflow-x-hidden'>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
