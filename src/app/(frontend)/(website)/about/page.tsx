import Navbar from '@/components/Navbar'
import AboutUs from '@/features/AboutUs'
import ContactForm from '@/features/ContactUs/form'
import { AvunyFooter } from '@/features/Footer'
import { links } from '@/features/links'
import { cn } from '@/lib/utils'

export default async function AboutPage() {
  return (
    <div>
      <AboutUs />
    </div>
  )
}
