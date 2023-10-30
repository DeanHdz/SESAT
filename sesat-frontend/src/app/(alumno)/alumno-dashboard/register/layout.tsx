import '../../../globals.css'
import Navbar from "@/app/components/Navbar"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'Registrar tesis',
  description: 'SESAT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
