import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DistributeSection from './components/DistributeSection'
import PricingSection from './components/PricingSection'
import QuoteSection from './components/QuoteSection'
import PublishingSection from './components/PublisingSection'
import FloatingPillsSection from './components/FloatingPills'
import FooterLinks from './components/FooterLinks'
import Footer from './components/Footer'

const Homepage = () => {
  return (
    <>
      <div className="min-h-screen bg-white text-gray-900  font-display">
        <Navbar />
        <Hero />
        <DistributeSection />
        <PricingSection />
        <QuoteSection />
        <PublishingSection />
        <FloatingPillsSection />
        <FooterLinks />
        <Footer />
      </div>
    </>
  )
}
export default Homepage