"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Athletes", href: "/athletes" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "#01255f",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-10 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/Web_Logo.svg"
            alt="Gayduo Sports Agency"
            width={120}
            height={44}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-[0.8rem] font-heading font-semibold uppercase tracking-[0.12em] transition-colors pb-0.5 group"
                style={{ color: active ? "#fee11b" : "rgba(255,255,255,0.65)" }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "#ffffff" }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.65)" }}
              >
                {item.name}
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-300 origin-left"
                  style={{
                    backgroundColor: "#fee11b",
                    width: active ? "100%" : "0%",
                  }}
                />
              </Link>
            )
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/about#contact"
            className="text-[0.75rem] font-heading font-bold uppercase tracking-[0.15em] px-5 py-2.5 transition-all duration-200"
            style={{ backgroundColor: "#fee11b", color: "#01255f" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ffffff" }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fee11b" }}
          >
            Contact
          </Link>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden"
          style={{ backgroundColor: "#01255f", borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="px-5 pt-3 pb-6 space-y-0">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between py-4 text-sm font-heading font-semibold uppercase tracking-[0.12em] border-b transition-colors"
                style={{ color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.06)" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
                <span className="text-white/20 text-xs">→</span>
              </Link>
            ))}
            <div className="pt-5">
              <Link
                href="/about#contact"
                className="block text-center py-3.5 text-sm font-heading font-bold uppercase tracking-[0.15em]"
                style={{ backgroundColor: "#fee11b", color: "#01255f" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
