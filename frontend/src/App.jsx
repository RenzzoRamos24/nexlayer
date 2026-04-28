import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import FleetDemo from './components/FleetDemo.jsx'
import About from './components/About.jsx'
import Pricing from './components/Pricing.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <FleetDemo />
        <About />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
