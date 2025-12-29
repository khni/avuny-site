'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ModeToggle } from '@/components/settings/mode-toggle'

export default function Navbar({
  links,
}: {
  links: {
    name: string
    href: string
  }[]
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={false}
      animate={{
        backdropFilter: 'blur(12px)',
        backgroundColor: scrolled ? 'hsl(var(--background) / 0.85)' : 'transparent',
        boxShadow: scrolled ? '0 8px 30px hsl(var(--border) / 0.6)' : 'none',
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <span className="text-sm font-semibold text-foreground">Avuny</span>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover="hover"
                className="relative text-sm font-medium text-muted-foreground"
              >
                {link.name}
                <motion.span
                  variants={{ hover: { width: '100%' } }}
                  transition={{ duration: 0.25 }}
                  className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary"
                />
              </motion.a>
            ))}

            <ModeToggle />

            <button className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90 transition">
              Get Started
            </button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-sm font-medium text-foreground"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
                >
                  {link.name}
                </a>
              ))}
              <button className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
