import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="font-sans text-gray-900 antialiased">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
