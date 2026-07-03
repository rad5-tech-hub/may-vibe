import { Link } from 'react-router-dom';
import { Home, Search, Frown } from 'lucide-react';
import Navbar from '../components/Navbar';
import MainFooter from '../components/MainFooter';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-display">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Frown className="w-12 h-12 text-orange-500" />
          </div>

          <h1 className="text-7xl md:text-8xl font-black text-gray-900 mb-4">404</h1>

          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Oops! Page not found
          </p>

          <p className="text-gray-500 text-lg mb-2">
            Couldn&apos;t find what you&apos;re looking for?
          </p>

          <p className="text-gray-400 text-sm mb-10">
            The page you requested doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Go back home
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-orange-500 hover:text-orange-600 transition"
            >
              <Search className="w-5 h-5" />
              Browse music
            </Link>
          </div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
};

export default NotFound;
