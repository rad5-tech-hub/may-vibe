import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import Hero from "./components/Hero";

const Homepage = () => {
  return (
    <div style={{ scrollBehavior: "smooth" }} className="font-display antialiased">
      <Navbar />
      {/* <Hero /> */}
      <Footer />
    </div>
  );
};

export default Homepage;
