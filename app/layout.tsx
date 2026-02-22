import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const parastoofont = localFont({
  src: '../font/Parastoofixed-swashes.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'فيلورا - ستيكرات وتصاميم مميزة',
  description: 'ستيكرات جميلة ومميزة لكل المناسبات',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={parastoofont.className}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
