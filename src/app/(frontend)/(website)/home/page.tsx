import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import '../../styles.css'

import { Hero } from '@/components/Hero'
import WhyAvuny from '@/features/WhyUs'
import { AvunyTimeline } from '@/features/process'
import ContactForm from '@/features/ContactUs/form'
import AboutUs from '@/features/AboutUs'
import { Footer } from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { links } from '@/features/links'
import { AvunyFooter } from '@/features/Footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Avuny – Websites, Web Apps & Mobile App Development',
  description:
    'We design and develop high-quality websites, web apps, and mobile applications for startups and growing businesses.',
}

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div>
      <Hero
        headline={'Weclome to Avuny'}
        subHeadline="We build effective digital products Websites, web applications, and mobile solutions designed for performance, clarity, and scale."
      />
      <WhyAvuny />
      <AvunyTimeline />
    </div>
  )
}
