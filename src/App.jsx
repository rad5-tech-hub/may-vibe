import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
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

function App() {
  return (
    <Router>
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

        {/* Fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;