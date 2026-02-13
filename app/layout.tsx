import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import WhatsAppButton from '@/components/whatsapp-button'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NovaTech - AI-Powered SaaS Solutions',
  description: 'Experience the future of business automation with NovaTech - cutting-edge AI solutions designed for enterprises',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
