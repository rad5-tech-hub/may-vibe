import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RightsHero from "./components/Hero";
import VerificationPipeline from "./components/Verification";
import ComingSoonAcr from "./components/Soon";
import RightsOverview from "./components/Overview";
import ComplianceSystems from "./components/Compliance";

const Homepage = () => {
  return (
    <div className="font-display antialiased">
      <Navbar />
      <RightsHero />
      <RightsOverview />
      <ComplianceSystems />
      <VerificationPipeline />
      <ComingSoonAcr />
      <Footer />
    </div>
  );
};

export default Homepage;
