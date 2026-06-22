import BalanceCards from './components/BalanceCards';
import PayoutHistory from './components/PayoutHistory';
import RoyaltiesSection from './components/RoyaltiesSection';
import { FaCalendarAlt } from 'react-icons/fa';

const Payouts = () => {
  return (
    <div className="min-h-screen py-6 px-1 font-display">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl lg:text-4xl font-bold text-black mb-10">Payouts</h1>

        {/* This Month Toggle */}
        <div className="flex items-center mb-4">
          <FaCalendarAlt className='w-10 h-10 px-2 py-3 bg-gray-50 text-gray-600 rounded-full'/>
          <span className="text-gray-600  p-2 bg-gray-50 rounded-xl">This month</span>
        </div>

        {/* Balance Cards */}
        <BalanceCards />

        {/* Payout History + Royalties */}
        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          <PayoutHistory />
          <RoyaltiesSection />
        </div>

      </div>
    </div>
  );
};

export default Payouts;