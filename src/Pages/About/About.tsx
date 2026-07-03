import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import PlatformVision from "./components/PlatformVision";
import AboutQuote from "./components/AboutQuote";

const Homepage = () => {
  return (
    <div style={{ scrollBehavior: "smooth" }} className="font-display antialiased">
      <Navbar />
      <Hero />
      <AboutUs /> 
      <Features />
      <PlatformVision />
      <AboutQuote />
      <Footer />
    </div>
  );
};

export default Homepage;
