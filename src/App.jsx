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
import AlbumDetail from './Pages/Dashboard/Music Upload/AlbumDetail';
import TrackDetail from './Pages/Dashboard/Music Upload/TrackDetail';
import Homepage from './Pages/Homepage/Homepage';
import Overview from './Pages/Dashboard/Overview/overview';
import RoyaltiesPage from './Pages/Dashboard/Royalties/Royalties';
import Support from './Pages/Dashboard/Support &Academy/support';
import Notifications from './Pages/Dashboard/Notifications/notifications';
import Profile from './Pages/Dashboard/Profile/profile';
import Releases from './Pages/Dashboard/Releases/releases';
import Payouts from './Pages/Dashboard/Payouts/payouts';
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
import AdminLogin from './Pages/Admin/auth/login';
import AdminVerifyOTP from './Pages/Admin/auth/verifyOTP';
import AdminForgotPassword from './Pages/Admin/auth/forgotPassword';
import AdminDashboard from './Pages/Admin/dashboard';
import AdminProtectedRoute from './Pages/Admin/AdminProtectedRoute';
import OverviewPage from './Pages/Admin/pages/Overview';
import DistroArtiste from './Pages/Admin/pages/DistroArtiste';
import AllAlbumDistributions from './Pages/Admin/pages/AllAlbumDistributions';
import AllTrackDistributions from './Pages/Admin/pages/AllTrackDistributions';
import AllTransactions from './Pages/Admin/pages/AllTransactions';
import TransactionsWithoutAccounts from './Pages/Admin/pages/TransactionsWithoutAccounts';
import AllFundings from './Pages/Admin/pages/AllFundings';
import AllRegisteredUsers from './Pages/Admin/pages/AllRegisteredUsers';
import PaymentRequests from './Pages/Admin/pages/PaymentRequests';
import AddAdmin from './Pages/Admin/pages/AddAdmin';
import AddGenre from './Pages/Admin/pages/AddGenre';
import SetAccountActivationFees from './Pages/Admin/pages/SetAccountActivationFees';
import VerifyArtist from './Pages/Admin/pages/VerifyArtist';
import AdminProfile from './Pages/Admin/pages/Profile';
import ReleasesAdmin from './Pages/Admin/pages/Releases';


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

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/verifyOtp" element={<AdminVerifyOTP />} />
          <Route path="/admin/forgotPassword" element={<AdminForgotPassword />} />
          <Route
            path="/admin"
            element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>}
          >
            <Route index element={<OverviewPage />} />
            <Route path="releases" element={<ReleasesAdmin />} />
            <Route path="distro-artiste" element={<DistroArtiste />} />
            <Route path="distributions/albums" element={<AllAlbumDistributions />} />
            <Route path="distributions/tracks" element={<AllTrackDistributions />} />
            <Route path="transactions" element={<AllTransactions />} />
            <Route path="transactions-without-accounts" element={<TransactionsWithoutAccounts />} />
            <Route path="fundings" element={<AllFundings />} />
            <Route path="users" element={<AllRegisteredUsers />} />
            <Route path="payment-requests" element={<PaymentRequests />} />
            <Route path="add-admin" element={<AddAdmin />} />
            <Route path="add-genre" element={<AddGenre />} />
            <Route path="activation-fees" element={<SetAccountActivationFees />} />
            <Route path="verify-artist" element={<VerifyArtist />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* Dashboard - nested layout: sidebar independent, outlet for content */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="music-upload" element={<Music />} />
            <Route path="albums/:id" element={<AlbumDetail />} />
            <Route path="tracks/:id" element={<TrackDetail />} />
            <Route path="releases" element={<Releases />} />
            <Route path="royalties" element={<RoyaltiesPage />} />
            <Route path="payouts" element={<Payouts />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="support" element={<Support />} />
          </Route>

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
