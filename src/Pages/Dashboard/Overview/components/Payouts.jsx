// import React from "react";

const payouts = [
  { id: "MV1345", amount: "$1,000", date: "08/03/2022" },
  { id: "MV1345", amount: "$3,500", date: "09/03/2022" },
  { id: "MV1345", amount: "$2,300", date: "18/03/2022" },
  { id: "MV1345", amount: "$1,400", date: "20/03/2022" },
  { id: "MV1345", amount: "$7,000", date: "08/03/2022" },
  { id: "MV1345", amount: "$3,800", date: "09/03/2022" },
];

export default function Payouts() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Payouts</h2>

      {/* Unified Responsive Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50/70 px-6 sm:px-8 py-5 border-b border-gray-200">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-4 text-sm font-semibold text-gray-600">
            <div className="col-span-4 sm:col-span-4">ID</div>
            <div className="hidden sm:block col-span-4 text-center">Amount</div>
            <div className="hidden sm:block col-span-4 text-right">Date</div>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100">
          {payouts.map((payout, index) => (
            <div
              key={index}
              className="px-6 sm:px-8 py-5 hover:bg-gray-50 transition-colors duration-200  border-b-2 border-orange-200"
            >
              {/* Desktop & Tablet: 3-column grid */}
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 text-sm ">
                <div className="col-span-4 font-medium text-gray-900">{payout.id}</div>
                <div className="col-span-4 text-center font-semibold text-orange-600">
                  {payout.amount}
                </div>
                <div className="col-span-4 text-right font-medium text-gray-700">
                  {payout.date}
                </div>
              </div>

              {/* Mobile: Vertical layout */}
              <div className="sm:hidden space-y-3  ">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">ID</span>
                  <span className="font-medium text-gray-900">{payout.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Amount</span>
                  <span className="text-xl font-bold text-orange-600">{payout.amount}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Date</span>
                  <span className="font-medium text-gray-700">{payout.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}