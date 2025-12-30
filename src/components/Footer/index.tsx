'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
export type FooterLink = {
  name: string
  href: string
  external?: boolean
}

export type FooterSection = {
  title: string
  links: FooterLink[]
}

export type FooterProps = {
  brand: {
    title: string
    description: string
    avatarUrl?: string
    ctaLabel: string
    ctaHref: string
  }
  sections: FooterSection[]
  contact: {
    phone: string
    email: string
    timezone: string
  }
  bottom: {
    copyright: string
    links: FooterLink[]
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
}

function FooterLinkItem({ name, href, external }: FooterLink) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="block transition-colors hover:text-foreground"
      aria-label={name}
    >
      {name}
    </Link>
  )
}

export function Footer({ brand, sections, contact, bottom }: FooterProps) {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 md:grid-cols-4">
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3">
              {brand.avatarUrl && (
                <Image
                  src={brand.avatarUrl}
                  alt={brand.title}
                  width={44}
                  height={44}
                  className="rounded-full"
                />
              )}
              <h3 className="text-xl font-semibold">{brand.title}</h3>
            </div>

            <p className="text-sm text-muted-foreground">{brand.description}</p>

            <Button
              className="relative cursor-pointer px-6 py-3  text-lg shadow-lg transition-colors duration-300 animate-border-pulse hover:shadow-2xl"
              asChild
            >
              <Link href={brand.ctaHref}>{brand.ctaLabel}</Link>
            </Button>
          </motion.div>

          {/* Sections */}
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-sm font-semibold uppercase tracking-wide">{section.title}</h4>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <FooterLinkItem {...link} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            custom={sections.length + 1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide">Contact</h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`tel:${contact.phone}`} className="hover:text-foreground">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                  {contact.email}
                </a>
              </li>
              <li>{contact.timezone}</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          variants={fadeUp}
          custom={6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"
        >
          <p>{bottom.copyright}</p>

          <div className="flex gap-6">
            {bottom.links.map((link) => (
              <FooterLinkItem key={link.name} {...link} />
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
