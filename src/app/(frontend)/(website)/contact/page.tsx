import Navbar from '@/components/Navbar'
import ContactForm from '@/features/ContactUs/form'
import { AvunyFooter } from '@/features/Footer'
import { links } from '@/features/links'
import { cn } from '@/lib/utils'

export default async function ContactPage() {
  return (
    <div
      className={cn(
        'p-10 bg-linear-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 ',
      )}
    >
      <ContactForm />
    </div>
  )
}
