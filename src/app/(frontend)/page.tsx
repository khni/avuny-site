import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

import { Hero } from '@/components/Hero'
import WhyAvuny from '@/sections/WhyUs'
import { AvunyTimeline } from '@/sections/process'
import ContactForm from '@/sections/ContactUs'
import AboutUs from '@/sections/AboutUs'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div>
      <Hero
        headline={'We build effective digital products'}
        subHeadline="Websites, web applications, and mobile solutions designed for performance, clarity, and scale."
      />
      <WhyAvuny />
      <AvunyTimeline />
      <ContactForm />
      <AboutUs />
    </div>
  )
}
