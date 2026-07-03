import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div style={{ scrollBehavior: "smooth" }} className="font-display antialiased">
      <Navbar />
      <Footer />
    </div>
  );
};

export default Homepage;
