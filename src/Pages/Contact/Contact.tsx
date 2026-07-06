import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import Hero from "./components/Hero";
import FAQ from "./components/FAQ";
import GetInTouch from "../Academy/components/GetInTouch";

const Homepage = () => {
  return (
    <div className="font-display antialiased">
      <Navbar />
      <Hero />
      <FAQ />
      <GetInTouch />
      <MainFooter />
    </div>
  );
};

export default Homepage;
