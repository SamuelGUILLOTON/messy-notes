
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Kanit } from 'next/font/google'
import './globals.css'
import { Session } from 'inspector'
import SessionProvider from './SessionProvider'

const inter = Inter ({ subsets: ['latin'] })
const kanit = Kanit ( { weight: "400", subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Messy note',
  description: 'Messy note',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div>
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
