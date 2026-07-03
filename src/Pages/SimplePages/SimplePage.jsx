import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import MainFooter from '../components/MainFooter';

const SimplePage = ({ title }) => (
  <div className="min-h-screen bg-white flex flex-col">
    <Navbar />
    <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-500 text-lg">This page is under construction.</p>
      </div>
    </main>
    <MainFooter />
  </div>
);

SimplePage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SimplePage;
