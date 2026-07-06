import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalDspHero from "./components/Hero";
import GlobalDspPlatform from "./components/Platform";
import GlobalDspOverview from "./components/Overview";

const Homepage = () => {
  return (
    <div className="font-display antialiased">
      <Navbar />
      <GlobalDspHero />
      <GlobalDspOverview />
      <GlobalDspPlatform />
      <Footer />
    </div>
  );
};

export default Homepage;
