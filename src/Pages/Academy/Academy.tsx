import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import Hero from "./components/Hero";

const Homepage = () => {
  return (
    <div style={{ scrollBehavior: "smooth" }} className="font-display antialiased">
      <Navbar />
      <Hero />
      <MainFooter />
    </div>
  );
};

export default Homepage;
