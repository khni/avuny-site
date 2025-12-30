import Link from 'next/link'

export default function AvunyLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
      {/* Logo Mark */}
      <span
        className="
          flex h-9 w-9 items-center justify-center rounded-lg
          bg-black text-white
          dark:bg-white dark:text-black
          text-lg font-bold
        "
      >
        AV
      </span>

      {/* Brand Name */}
      <span className="text-lg text-foreground">Avuny</span>
    </Link>
  )
}
