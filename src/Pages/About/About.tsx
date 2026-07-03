import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";

const Homepage = () => {
  return (
    <div style={{ scrollBehavior: "smooth" }} className="font-display antialiased">
      <Navbar />
      <Hero />
      <AboutUs /> 
      <MainFooter />
    </div>
  );
};

export default Homepage;
