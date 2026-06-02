import { HorizontalNav } from './components/layout/HorizontalNav'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/HeroSection'
import { EducationSection } from './components/sections/EducationSection'
import { PublicationsSection } from './components/sections/PublicationsSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { AwardsSection } from './components/sections/AwardsSection'
import { ContactSection } from './components/sections/ContactSection'

function App() {
  return (
    <>
      <HorizontalNav />
      <main className="pt-14">
        <HeroSection />
        <EducationSection />
        <PublicationsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
