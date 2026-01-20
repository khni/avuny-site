import { Footer } from '@/components/Footer'
import { links } from '@/features/links'

export const AvunyFooter = () => {
  const year = new Date().getFullYear()
  return (
    <Footer
      brand={{
        title: 'Khaled - Founder',
        description: 'We’d love to hear from you. Get in touch with Avuny today.',
        avatarUrl: '/media/me.jpg',
        ctaLabel: 'Contact Us',
        ctaHref: '/contact',
      }}
      sections={[
        {
          title: 'Links',
          links: links,
        },
        {
          title: 'Social',
          links: [
            {
              name: 'LinkedIn',
              href: 'https://www.linkedin.com/in/khaled-eskandrany-528341210/',
              external: true,
            },
          ],
        },
      ]}
      contact={{
        phone: '+2 012 72 72 75 75',
        email: 'khaledeskandrany@gmail.com',
        timezone: '',
      }}
      bottom={{
        copyright: ` © ${year} Avuny.com. All rights reserved.`,
        links: [
          //   { name: 'Terms', href: '/terms' },
          //   { name: 'Privacy', href: '/privacy' },
        ],
      }}
    />
  )
}
