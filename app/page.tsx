import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { getAthletes, getFeaturedBlogPosts } from "@/lib/firestore"
import { athletes as staticAthletes, blogPosts as staticBlogPosts } from "@/lib/data"
import { ArrowRight } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [athletes, featuredPosts] = await Promise.all([
    getAthletes().catch(() => staticAthletes),
    getFeaturedBlogPosts().catch(() => staticBlogPosts.slice(0, 3)),
  ])

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Header />

      <main className="flex-1">

        
        <section
          className="relative min-h-screen flex flex-col overflow-hidden gsa-grain"
          style={{ backgroundColor: "#01255f" }}
        >
          {/* Subtle geometric lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute right-0 top-0 w-px h-full opacity-10" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6) 40%, transparent)" }} />
            <div className="absolute right-[25%] top-0 w-px h-full opacity-5" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4) 50%, transparent)" }} />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center pt-28 pb-10 px-7 sm:px-12 lg:px-16 xl:px-24 relative z-10">
            <div className="max-w-7xl mx-auto w-full">

              {/* Headline */}
              <h1 className="font-display leading-[0.88] text-white" style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}>
                AFRICA&apos;S<br />
                TALENT<br />
                DESERVES<br />
                <span style={{ color: "#fee11b" }}>THE BEST.</span>
              </h1>

              {/* Bottom row: body + CTAs */}
              <div className="mt-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16">
                <p className="text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)" }}>
                We represent the continent’s best and the continent’s future. We create opportunities for talent to maximize their careers and achieve their ambitions..
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <Link
                    href="/athletes"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 font-heading font-bold uppercase tracking-[0.1em] text-sm transition-all duration-200 hover:gap-4"
                    style={{ backgroundColor: "#fee11b", color: "#01255f" }}
                  >
                    Our Roster
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-7 py-3.5 font-heading font-semibold uppercase tracking-[0.1em] text-sm text-white border transition-all duration-200 hover:bg-white/10"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  >
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </section>

        
        <section className="py-20 lg:py-28 px-7 sm:px-12 lg:px-16 xl:px-24 bg-[#fafaf9]">
          <div className="max-w-7xl mx-auto">

            {/* Section header */}
            <div className="flex items-end justify-between mb-10 lg:mb-14">
              <div>
                <p className="font-heading font-semibold text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#fee11b" }}>
                  The Roster
                </p>
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl" style={{ color: "#01255f" }}>
                  OUR ATHLETES
                </h2>
              </div>
              <Link
                href="/athletes"
                className="hidden sm:flex items-center gap-2 font-heading font-semibold uppercase tracking-[0.1em] text-xs group transition-colors"
                style={{ color: "#01255f" }}
              >
                View All
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {athletes.map((athlete) => (
                <Link
                  key={athlete.id}
                  href={`/athletes/${athlete.slug}`}
                  className="group relative aspect-[3/4] overflow-hidden block bg-neutral-900"
                >
                  {/* Photo */}
                  <Image
                    src={athlete.image}
                    alt={athlete.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Yellow top border reveal */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ backgroundColor: "#fee11b" }}
                  />

                  {/* Jersey number — massive, ghosted */}
                  <div
                    className="absolute right-4 bottom-16 font-display leading-none select-none pointer-events-none"
                    style={{ fontSize: "clamp(6rem, 14vw, 10rem)", color: "rgba(255,255,255,0.07)" }}
                  >
                    {athlete.number}
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-heading font-semibold text-[0.65rem] uppercase tracking-[0.2em] mb-1.5 transition-colors" style={{ color: "rgba(254,225,27,0.85)" }}>
                      {athlete.position}
                    </p>
                    <h3 className="font-heading font-bold text-white leading-tight mb-1" style={{ fontSize: "1.4rem" }}>
                      {athlete.name}
                    </h3>
                    <p className="font-heading text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {athlete.team}
                    </p>
                  </div>

                  {/* Subtle inner border on hover */}
                  <div className="absolute inset-0 ring-0 group-hover:ring-1 ring-white/10 transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Mobile link */}
            <div className="mt-8 sm:hidden">
              <Link href="/athletes" className="inline-flex items-center gap-2 font-heading font-semibold uppercase tracking-wider text-xs" style={{ color: "#01255f" }}>
                View All Athletes <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        
        <section className="py-20 lg:py-28 px-7 sm:px-12 lg:px-16 xl:px-24 gsa-grain" style={{ backgroundColor: "#01255f" }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left: headline */}
              <div>
                <div className="w-8 h-px mb-8" style={{ backgroundColor: "#fee11b" }} />
                <h2 className="font-display leading-[0.88] text-white" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
                  YOUR<br />
                  CAREER.
                  <br /><br />
                  <span style={{ color: "#fee11b" }}>OUR<br />COMMITMENT.</span>
                </h2>
              </div>

              {/* Right: services + tagline */}
              <div className="space-y-8">
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-sans)" }}>
                  From contract negotiations and club moves to sponsorships and life after the final whistle — we cover every dimension of a player&apos;s career. Not as a service. As a partnership.
                </p>

                <div className="grid grid-cols-2 gap-px bg-white/10">
                  {[
                    "Player Representation",
                    "Contract Negotiation",
                    "Career Development",
                    "Brand Partnerships",
                  ].map((service) => (
                    <div key={service} className="px-5 py-4 bg-white/5">
                      <p className="font-heading font-semibold text-xs uppercase tracking-wider text-white/60">{service}</p>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </section>

        
        {featuredPosts.length > 0 && (
          <section className="py-20 lg:py-28 px-7 sm:px-12 lg:px-16 xl:px-24">
            <div className="max-w-7xl mx-auto">

              <div className="flex items-end justify-between mb-10 lg:mb-14">
                <div>
                  <p className="font-heading font-semibold text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#fee11b" }}>
                    Latest
                  </p>
                  <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl" style={{ color: "#01255f" }}>
                    NEWS &amp; INSIGHTS
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:flex items-center gap-2 font-heading font-semibold uppercase tracking-[0.1em] text-xs group transition-colors"
                  style={{ color: "#01255f" }}
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              <div className="mt-8 sm:hidden">
                <Link href="/blog" className="inline-flex items-center gap-2 font-heading font-semibold uppercase tracking-wider text-xs" style={{ color: "#01255f" }}>
                  View All Posts <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}
