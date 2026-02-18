import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { useVisitorTracking } from './hooks/useVisitorTracking.ts'

function App() {
  useVisitorTracking({
    enabled: true,
    educationalMode: true
  })

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App 