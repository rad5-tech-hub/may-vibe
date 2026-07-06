import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdvancedHero from "./components/Hero";
import AdvancedOverview from "./components/Overview";
import CorePremiumFeatures from "./components/CorePremium";
import HighFidelityMetadata from "./components/HighFidelity";
import OtherFeatures from "./components/OtherFeatures";

const Homepage = () => {
  return (
    <div className="font-display antialiased">
      <Navbar />
      <AdvancedHero />
      <AdvancedOverview />  
      <CorePremiumFeatures />
      <HighFidelityMetadata />
      <OtherFeatures />
      <Footer />
    </div>
  );
};

export default Homepage;
