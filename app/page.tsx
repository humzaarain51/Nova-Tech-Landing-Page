import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Stats } from '@/components/stats'
import { Testimonials } from '@/components/testimonials'
import { Pricing } from '@/components/pricing'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  )
}
