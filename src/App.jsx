import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import ScrollToTop from './Pages/components/ScrollToTop';
import PageTransition from './Pages/components/PageTransition';
import  Signup from './Pages/Onboarding Pages/signup.jsx';
import  Login from './Pages/Onboarding Pages/login.jsx';
import  Welcome from './Pages/Onboarding Pages/welcome.jsx';
import ForgotPassword from './Pages/Onboarding Pages/forgetPassword.jsx';
import ResetPassword from './Pages/Onboarding Pages/resetPassword.jsx';
import VerifyOTP from './Pages/Onboarding Pages/verifyOTP.jsx';
import Music from './Pages/Dashboard/Music Upload/Music';
import Homepage from './Pages/Homepage/Homepage';
import Overview from './Pages/Dashboard/Overview/overview';
import RoyaltiesPage from './Pages/Dashboard/Royalties/Royalties';
import Support from './Pages/Dashboard/Support &Academy/support';
import Notifications from './Pages/Dashboard/Notifications/notifications';
import Profile from './Pages/Dashboard/Profile/profile';
import Releases from './Pages/Dashboard/Releases/releases';
import Dashboard from './Pages/Dashboard/dashboard';
import NotFound from './Pages/NotFound/NotFound';
import SimplePage from './Pages/SimplePages/SimplePage';
import Academy from './Pages/Academy/Academy';
import Contact from './Pages/Contact/Contact';
import About from './Pages/About/About';
import Advanced from './Pages/AdvancedMusic/Advanced';
import GlobalDSP from './Pages/GlobalDSP/GlobalDSP';
import AccountingRoyalty from './Pages/AccountingRoyalty/AccountingRoyalty';
import AdvancedRelease from './Pages/AdvancedRelease/AdvancedRelease';
import RightsProtection from './Pages/RightsProtection/RightsProtection';


function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Sonner Toaster - Place it once at the root */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={true}
        toastOptions={{
          style: {
            fontSize: '14px',
          },
          duration: 4000,
        }}
      />

      <PageTransition>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/verifyOtp" element={<VerifyOTP />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/releases" element={<Releases />} />
          <Route path="/dashboard/music-upload" element={<Music />} />
          <Route path="/dashboard/royalties" element={<RoyaltiesPage />} />
          <Route path="/dashboard/support" element={<Support />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Public Utility Pages */}
          <Route path="/about" element={<About title="About Us" />} />
          <Route path="/contact" element={<Contact title="Contact Us" />} />
          <Route path="/faq" element={<SimplePage title="FAQ" />} />
          <Route path="/blog" element={<SimplePage title="Blog" />} />
          <Route path="/academy" element={<Academy title="Academy" />} />
          <Route path="/terms" element={<SimplePage title="Terms of Service" />} />
          <Route path="/privacy" element={<SimplePage title="Privacy Policy" />} />
          <Route path="/store" element={<SimplePage title="Mayvibe Store" />} />

          {/* Business Solution Pages */}
          <Route path="/advanced-music" element={<Advanced />} />
          <Route path="/global-dsp" element={<GlobalDSP />} />
          <Route path="/accounting-royalty" element={<AccountingRoyalty />} />
          <Route path="/advanced-release" element={<AdvancedRelease />} />
          <Route path="/rights-protection" element={<RightsProtection />} />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </Router>
  );
}

export default App;