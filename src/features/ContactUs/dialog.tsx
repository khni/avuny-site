'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/Modal'
import ContactForm from '@/features/ContactUs/form'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

export function ContactFormModal({
  title = 'Contact Us',
  description,
}: {
  title?: string
  description?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      contentClassName="sm:max-w-[425px]"
      trigger={
        <Button className="relative cursor-pointer px-6 py-3  text-lg shadow-lg transition-colors duration-300 animate-border-pulse hover:shadow-2xl ">
          <span>{title}</span>
          <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowUpRight className="h-5 w-5" />
          </motion.div>
        </Button>
      }
    >
      {/* <AnimatedSwitch show={true} first={<BookTourForm />} second={null} /> */}
      <ContactForm />
    </Modal>
  )
}
