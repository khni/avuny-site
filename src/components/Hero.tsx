import React from 'react'
import { BackgroundLines } from '@/components/ui/background-lines'
import Navbar from '@/components/Navbar'
import { NoiseBackground } from '@/components/ui/noise-background'
import { AnimatedButton } from '@/components/AnimatedButton'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { Button, buttonVariants } from '@/components/ui/button'
import { EncryptedText } from '@/components/ui/encrypted-text'
import Link from 'next/link'
import { cn } from '@/lib/utils'
const links = [
  { name: 'Home', href: '#' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Our Process', href: '#process' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export function Hero({ headline, subHeadline }: { headline: string; subHeadline: string }) {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <Navbar links={links} />
      <h1 className="bg-clip-text text-transparent text-center bg-linear-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl  font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        {headline}
      </h1>
      <h2 className="max-w-xl mx-auto  md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        <EncryptedText
          text={subHeadline}
          encryptedClassName="text-neutral-500"
          revealedClassName="dark:text-white text-black"
          revealDelayMs={50}
        />
      </h2>

      <div className="flex gap-3 mt-3">
        <Link
          href="#why-us"
          className={buttonVariants({
            variant: 'secondary', // You need to specify a variant
            className: cn('relative cursor-pointer px-6 py-3 text-lg shadow-lg'),
          })}
        >
          Learn More
        </Link>
        <Link
          href="#why-us"
          className={buttonVariants({
            variant: 'default', // You need to specify a variant
            className: cn(
              'relative cursor-pointer px-6 py-3  text-lg shadow-lg transition-colors duration-300 animate-border-pulse',
            ),
          })}
        >
          Contact Us
        </Link>
      </div>
    </BackgroundLines>
  )
}
