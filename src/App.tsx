import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Skills } from './components/sections/Skills'

/**
 * Tile rhythm, where the surface change is the only section divider:
 *   Hero light -> About parchment -> Projects (dark, light, dark-2, parchment,
 *   dark-3) -> Experience light -> Skills dark -> Footer parchment.
 */
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
      </main>
      <Footer />
    </>
  )
}

export default App
