import Navbar from "../components/Navbar";
import HeroSection from "./components/HeroSection";
import DistributeBanner from "./components/DistributeBanner";
import PricingSection from "./components/PricingSection";
import QuoteSection from "./components/QuoteSection";
import TestimonialsSection from "./components/TestimonialsSection";
import DistributingSection from "./components/DistributingSection";
import FooterLinks from "./components/FooterLinks";
import MainFooter from "../components/MainFooter";

const Homepage = () => {
  return (
    <div className="font-display antialiased">
      <Navbar />
      <HeroSection />
      <DistributeBanner />
      <PricingSection />
      <QuoteSection />
      <TestimonialsSection />
      <DistributingSection />
      <FooterLinks />
      <MainFooter />
    </div>
  );
};

export default Homepage;
