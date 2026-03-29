import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "Gayduo Sports Agency was built on a simple belief: elite talent deserves elite representation. Learn who we are, how we work, and what we stand for.",
  openGraph: {
    title: "About | Gayduo Sports Agency",
    description: "Gayduo Sports Agency was built on a simple belief: elite talent deserves elite representation.",
  },
}


const services = [
  { title: "Player Representation", description: "Full-service management across every stage of a player's career — negotiations, contracts, clubs." },
  { title: "Contract Negotiation", description: "We fight for the best possible terms. Every clause, every clause, every detail matters." },
  { title: "Career Development", description: "Long-term strategic planning that goes far beyond the next signing." },
  { title: "Brand Partnerships", description: "Connecting our athletes with brands that align with who they are off the pitch." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Header />

      <main className="flex-1">

        
        <section className="pt-32 pb-16 px-7 sm:px-12 lg:px-16 xl:px-24 gsa-grain" style={{ backgroundColor: "#01255f" }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px" style={{ backgroundColor: "#fee11b" }} />
              <p className="font-heading font-semibold text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.4)" }}>
                About Us
              </p>
            </div>
            <h1 className="font-display leading-[0.88] text-white" style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
              WE EXIST TO<br />
              MAKE GREAT<br />
              <span style={{ color: "#fee11b" }}>CAREERS HAPPEN.</span>
            </h1>
          </div>
        </section>

        
        <section className="py-20 lg:py-28 px-7 sm:px-12 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              <div>
                <div className="w-8 h-[3px] mb-6" style={{ backgroundColor: "#fee11b" }} />
                <h2 className="font-display text-4xl sm:text-5xl mb-6" style={{ color: "#01255f" }}>
                  OUR MISSION
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground max-w-prose">
                  We believe great careers don&apos;t happen by accident. They are built — through preparation, relationships, and having someone in your corner who treats your ambitions like their own. Our mission is to provide that support across every dimension of a player&apos;s professional life, on and off the pitch.
                </p>
              </div>
              <div>
                <div className="w-8 h-[3px] mb-6" style={{ backgroundColor: "#3a7cf4" }} />
                <h2 className="font-display text-4xl sm:text-5xl mb-6" style={{ color: "#01255f" }}>
                  OUR APPROACH
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground max-w-prose">
                  Most agencies chase volume. We chase excellence. Our roster is intentionally small because every player deserves our full attention — not a fraction of it. We know our players as people first, and professionals second. That depth of relationship is what separates good representation from great representation.
                </p>
              </div>
            </div>
          </div>
        </section>

        
        <section className="py-20 lg:py-28 px-7 sm:px-12 lg:px-16 xl:px-24 border-y border-border bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <p className="font-heading font-semibold text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#fee11b" }}>
                What We Do
              </p>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl" style={{ color: "#01255f" }}>
                SERVICES
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
              {services.map((service) => (
                <div key={service.title} className="bg-white p-8 lg:p-10">
                  <div className="w-5 h-[2px] mb-5" style={{ backgroundColor: "#fee11b" }} />
                  <h3 className="font-heading font-bold text-xl mb-3" style={{ color: "#01255f" }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section id="contact" className="py-20 lg:py-28 px-7 sm:px-12 lg:px-16 xl:px-24 scroll-mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

              {/* Left */}
              <div>
                <div className="w-8 h-[3px] mb-6" style={{ backgroundColor: "#fee11b" }} />
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.9] mb-6" style={{ color: "#01255f" }}>
                  LET&apos;S<br />
                  TALK.
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground max-w-sm">
                  Whether you&apos;re a player looking for representation, a club seeking a partner, or a brand interested in working with our athletes — we&apos;d love to hear from you.
                </p>

                <div className="mt-10 space-y-4">
                  <div>
                    <p className="font-heading font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                    <a href="mailto:hello@gayduosa.com" className="font-heading font-bold text-sm transition-colors hover:opacity-70" style={{ color: "#01255f" }}>
                      hello@gayduosa.com
                    </a>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-1">Offices</p>
                    <p className="font-heading font-semibold text-sm" style={{ color: "#01255f" }}>Kigali, Rwanda · Monrovia, Liberia</p>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firstName" className="block font-heading font-semibold text-xs uppercase tracking-widest mb-2 text-muted-foreground">
                        First Name
                      </label>
                      <input
                        type="text" id="firstName" name="firstName"
                        className="w-full px-4 py-3 bg-white border border-border focus:border-[#01255f] focus:outline-none transition-colors text-sm"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block font-heading font-semibold text-xs uppercase tracking-widest mb-2 text-muted-foreground">
                        Last Name
                      </label>
                      <input
                        type="text" id="lastName" name="lastName"
                        className="w-full px-4 py-3 bg-white border border-border focus:border-[#01255f] focus:outline-none transition-colors text-sm"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-heading font-semibold text-xs uppercase tracking-widest mb-2 text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email" id="email" name="email"
                      className="w-full px-4 py-3 bg-white border border-border focus:border-[#01255f] focus:outline-none transition-colors text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block font-heading font-semibold text-xs uppercase tracking-widest mb-2 text-muted-foreground">
                      Subject
                    </label>
                    <select
                      id="subject" name="subject"
                      className="w-full px-4 py-3 bg-white border border-border focus:border-[#01255f] focus:outline-none transition-colors text-sm"
                    >
                      <option value="">Select a subject</option>
                      <option value="representation">Player Representation</option>
                      <option value="partnership">Club / Partnership Inquiry</option>
                      <option value="brand">Brand &amp; Sponsorship</option>
                      <option value="media">Media Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-heading font-semibold text-xs uppercase tracking-widest mb-2 text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message" name="message" rows={5}
                      className="w-full px-4 py-3 bg-white border border-border focus:border-[#01255f] focus:outline-none transition-colors text-sm resize-none"
                      placeholder="Tell us about yourself or your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 font-heading font-bold text-sm uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#01255f" }}
                  >
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
