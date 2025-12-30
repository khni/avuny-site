import Navbar from '@/components/Navbar'
import AvunyLogo from '@/features/AvunyLogo'
import { AvunyFooter } from '@/features/Footer'
import { links } from '@/features/links'
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div>
      <Navbar logo={<AvunyLogo />} links={links} currentPath={slug} />
      <div className="bg-linear-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800">
        {children}
      </div>
      <AvunyFooter />
    </div>
  )
}
