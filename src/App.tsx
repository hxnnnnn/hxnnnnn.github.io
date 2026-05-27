import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/HeroSection'
import { ResearchSection } from './components/sections/ResearchSection'
import { EducationSection } from './components/sections/EducationSection'
import { PublicationsSection } from './components/sections/PublicationsSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { AwardsSection } from './components/sections/AwardsSection'
import { ContactSection } from './components/sections/ContactSection'
import { profile } from './data/profile'

function App() {
  return (
    <>
      <Navbar name={profile.name} />
      <main>
        <HeroSection />
        <ResearchSection />
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
