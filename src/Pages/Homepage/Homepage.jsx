import Navbar from "../components/Navbar";
import HeroSection from "./components/HeroSection";
import DistributeBanner from "./components/DistributeBanner";
import PricingSection from "./components/PricingSection";
import QuoteSection from "./components/QuoteSection";
import PublishingSection from "./components/PublishingSection";
import FooterLinks from "./components/FooterLinks";
import MainFooter from "../components/MainFooter";

const Homepage = () => {
  return (
    <div style={{ scrollBehavior: "smooth" }} className="font-display antialiased">
      <Navbar />
      <HeroSection />
      <DistributeBanner />
      <PricingSection />
      <QuoteSection />
      <PublishingSection />
      <FooterLinks />
      <MainFooter />
    </div>
  );
};

export default Homepage;
