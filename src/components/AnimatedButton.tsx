'use client'
import { motion } from 'motion/react'

type ContactButtonProps = {
  text?: string
  onClick?: () => void
}

export function AnimatedButton({ text, onClick }: ContactButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        relative inline-flex items-center 
        rounded-full px-6 font-semibold
        bg-primary text-background
        shadow-lg shadow-primary/30
        transition-colors
        hover:bg-primary/90
        focus:outline-none focus:ring-2 focus:ring-primary/40
      "
    >
      {/* glow */}
      <span
        className="
          absolute inset-0 -z-10 rounded-xl
          bg-primary opacity-30 blur-xl
        "
      />

      {text}

      {/* arrow */}
      <motion.span
        aria-hidden
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        →
      </motion.span>
    </motion.button>
  )
}
