import { FaArrowUp } from 'react-icons/fa';

const BalanceCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Total Balance */}
      <div className="bg-gray-50 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-600 text-sm font-medium">Total balance</h3>
          <select className="bg-gray-100 text-gray-700 text-sm rounded-full px-4 py-2 focus:outline-none">
            <option>USD</option>
          </select>
        </div>
        <p className="text-4xl font-bold text-gray-900">$24,092.75</p>
        <p className="text-green-600 text-sm mt-3 flex items-center gap-2">
          <FaArrowUp className="w-4 h-4" />
          You have extra $1,200 compared to last month
        </p>
      </div>

      {/* Income */}
      <div className="bg-gray-50 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-600 text-sm font-medium">Income</h3>
          <select className="bg-gray-100 text-gray-700 text-sm rounded-full px-4 py-2 focus:outline-none">
            <option>USD</option>
          </select>
        </div>
        <p className="text-4xl font-bold text-gray-900">$4,500.00</p>
        <p className="text-green-600 text-sm mt-3 flex items-center gap-2">
          <FaArrowUp className="w-4 h-4" />
          You have extra $200 compared to last month
        </p>
      </div>

      {/* Payment Method + Withdraw */}
      <div className="flex flex-col justify-between">
        <div className='bg-gray-50 rounded-3xl p-8 '>
          <h3 className="text-gray-600 text-sm font-medium mb-4">Payment Method</h3>
          <div className="bg-gray-100 rounded-full w-fit px-5 py-3 text-gray-700 font-medium flex items-center gap-3">
            <select className="bg-gray-100 text-gray-700 text-sm rounded-full px-4 py-2 focus:outline-none">
              <option>Flutterwave</option>
            </select>
          </div>
        </div>
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl cursor-pointer transition flex items-center justify-center gap-3">
          Withdraw
        </button>
      </div>

    </div>
  );
};

export default BalanceCards;