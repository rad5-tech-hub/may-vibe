// import React from 'react';

export default function DSPEarningsTable() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 ">
      {/* Main Card */}
<h1 className="text-2xl font-bold mb-4">Track Earnings By DSP</h1>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto ">
          <table className="w-full ">
            {/* Header */}
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50  font-bold">
                <th className="text-left py-5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Album Title
                </th>
                <th className="text-left py-5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Apple Music
                </th>
                <th className="text-left py-5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Boomplay
                </th>
                <th className="text-left py-5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Deezer
                </th>
                <th className="text-left py-5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Spotify
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {/* Row 1 - UV Scuti */}
              <tr className="hover:bg-gray-50 transition-colors border-b-2 border-orange-200">
                <td className="py-5 px-6 text-sm font-medium text-gray-900">UV Scuti</td>
                <td className="py-5 px-6 text-sm text-gray-700">23,123</td>
                <td className="py-5 px-6 text-sm text-gray-700">2,123</td>
                <td className="py-5 px-6 text-sm text-gray-700">23,123</td>
                <td className="py-5 px-6 text-sm text-gray-700">23,123</td>
              </tr>

              {/* Row 2 - Made In Lagos */}
              <tr className="hover:bg-gray-50 transition-colors border-b-2 border-orange-200">
                <td className="py-5 px-6 text-sm font-medium text-gray-900">Made In Lagos</td>
                <td className="py-5 px-6 text-sm text-gray-700">4,231</td>
                <td className="py-5 px-6 text-sm text-gray-700">4,231</td>
                <td className="py-5 px-6 text-sm text-gray-700">4,231</td>
                <td className="py-5 px-6 text-sm text-gray-700">4,231</td>
              </tr>

              {/* Row 3 - A Better Time */}
              <tr className="hover:bg-gray-50 transition-colors border-b-2 border-orange-200" >
                <td className="py-5 px-6 text-sm font-medium text-gray-900">A Better Time</td>
                <td className="py-5 px-6 text-sm text-gray-700">44,231</td>
                <td className="py-5 px-6 text-sm text-gray-700">4,231</td>
                <td className="py-5 px-6 text-sm text-gray-700">4,231</td>
                <td className="py-5 px-6 text-sm text-gray-700">44,231</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Navigation Tabs */}
        <div className="px-6 py-5 hover:bg-gray-50 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
            <button className="px-5 py-2.5 text-sm font-medium text-gray-500 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              Custom
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-gray-500 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              Yearly
            </button>
            <button className="px-6 py-2.5 bg-orange-500 text-white text-sm font-medium  cursor-pointer rounded-full hover:bg-orange-600 transition-colors shadow-sm">
              Monthly
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-gray-500 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              Weekly
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-gray-500 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              Daily
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}