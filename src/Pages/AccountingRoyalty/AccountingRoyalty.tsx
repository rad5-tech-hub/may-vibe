import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccountingHero from "./components/Hero";
import AccountingOverview from "./components/Overview";
import FinancialSystems from "./components/FinancialSystems";

const Homepage = () => {
  return (
    <div className="font-display antialiased">
      <Navbar />
      <AccountingHero />
      <AccountingOverview />
      <FinancialSystems />
      <Footer />
    </div>
  );
};

export default Homepage;
