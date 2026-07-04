import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HyperspaceIntro } from './components/sections/HyperspaceIntro'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <>
      <Navbar />
      <main>
        {/* Salida del hiperespacio: About sobre la nave -> revela proyectos */}
        <HyperspaceIntro overlay={<About />}>
          <Projects />
        </HyperspaceIntro>
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
