import React from 'react'
import './styles.css'

import type { Metadata } from 'next'
import { Cairo, Geist, Geist_Mono, Roboto } from 'next/font/google'

import { Providers } from '@/providers'
import LocaleProvider from '@/providers/locale-provider'

import { getLocale } from 'next-intl/server'

/* =======================
   Fonts
======================= */

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-cairo',
})

/* =======================
   SEO Metadata
======================= */

export const metadata: Metadata = {
  metadataBase: new URL('https://www.avuny.com'),

  title: {
    default: 'Avuny – Websites, Web Apps & Mobile App Development',
    template: '%s | Avuny',
  },

  description:
    'Avuny builds modern websites, web applications, and mobile apps for startups and businesses. Fast, scalable, and reliable digital solutions.',

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'Avuny – Websites, Web Apps & Mobile App Development',
    description:
      'We design and develop high-quality websites, web apps, and mobile applications for startups and growing businesses.',
    url: 'https://www.avuny.com',
    siteName: 'Avuny',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Avuny – Digital Product Development',
      },
    ],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

/* =======================
   Root Layout
======================= */

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const fontClassName = locale === 'ar' ? cairo.variable : roboto.variable

  return (
    <html lang={locale} dir={dir} className={fontClassName} suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <Providers dir={dir}>
          <LocaleProvider>{children}</LocaleProvider>
        </Providers>
      </body>
    </html>
  )
}
