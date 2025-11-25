import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import  Signup from './Components/Pages/Onboarding Pages/signup.jsx';
import  Login from './Components/Pages/Onboarding Pages/login.jsx';
import  Welcome from './Components/Pages/Onboarding Pages/welcome.jsx';
import ForgotPassword from './Components/Pages/Onboarding Pages/forgetPassword.jsx';
import Music from './Components/Pages/Dashboard/Music Upload/Music';
import Homepage from './Components/Pages/Homepage/Homepage';
import Overview from './Components/Pages/Dashboard/Overview/overview';
import Royalties from './Components/Pages/Dashboard/Royalties/Royalties';
import Support from './Components/Pages/Dashboard/Support &Academy/support';
import Notifications from './Components/Pages/Dashboard/Notifications/notifications';
import Profile from './Components/Pages/Dashboard/Profile/profile';
import Releases from './Components/Pages/Dashboard/Releases/releases';
import Dashboard from './Components/Pages/Dashboard/dashboard';

// Optional: A simple Not Found page
const NotFound = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you&apos;re looking for doesn&apos;t exist.</p>
  </div>
);

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

        {/* Dashboard Routes */}
        <Route path="/dashboard/overview" element={<Overview />} />
        <Route path="/dashboard/releases" element={<Releases />} />
        <Route path="/dashboard/music-upload" element={<Music />} />
        <Route path="/dashboard/royalties" element={<Royalties />} />
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