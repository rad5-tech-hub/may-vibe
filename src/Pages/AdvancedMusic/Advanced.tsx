import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdvancedMusicHero from "./components/Hero";
import AdvancedMusicFeatures from "./components/Featured";
import AdvancedMusicOverview from "./components/Overview";

const Homepage = () => {
  return (
    <div className="font-display antialiased">
      <Navbar />
      <AdvancedMusicHero />
      <AdvancedMusicOverview />
      <AdvancedMusicFeatures />
      <Footer />
    </div>
  );
};

export default Homepage;
