import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/hero/HeroSection'
import { AboutSection } from '@/components/about/AboutSection'
import { ProjectsSection } from '@/components/projects/ProjectsSection'
import { ExperienceSection } from '@/components/experience/ExperienceSection'
import { ContactSection } from '@/components/contact/ContactSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
