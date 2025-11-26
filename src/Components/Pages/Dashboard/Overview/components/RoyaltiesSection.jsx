// import React from "react";
import { Sun } from "lucide-react";

const barData = [
  { height: 75 },
  { height: 50 },
  { height: 85 },
  { height: 100 },
  { height: 95 },
  { height: 60 },
  { height: 80 },
  { height: 70 },
  { height: 105 },
  { height: 90 },
  { height: 75 },
];

export default function Royalties() {
  return (
    <section className="w-full max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Royalties</h2>
              <p className="text-sm text-gray-500 mt-1">
                Track the money you make from the music you release.
              </p>
            </div>
            <button className="px-5 py-2.5 bg-white border border-orange-300 text-orange-600 rounded-md text-sm font-medium hover:bg-orange-50 transition-colors">
              Payment History
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-gray-500">Most Recent Payment</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">$24,092.75</p>
              <span className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                Paid
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Next Payment (estimated)</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">$28,430.59</p>
              <p className="text-sm text-gray-400 mt-2">
                Payment to be made on: <span className="font-medium text-gray-700">23/09/2025</span>
              </p>
            </div>

            <div className="flex items-center justify-start md:justify-end gap-3 text-sm text-gray-500">
              <Sun className="w-5 h-5 text-orange-500" />
              <span className="bg-gray-100 px-4 py-2.5 rounded-lg font-medium text-gray-700">
                Payments Made To: juniorachebe@gmail.com
              </span>
            </div>
          </div>

          <div className="h-px bg-orange-200 to-transparent mt-8" />
        </div>

        {/* Chart with Grid Lines */}
        <div className="px-8 pb-10 pt-6">
          <div className="relative h-64">
            {/* Horizontal Grid Lines (exact match) */}
            <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none">
              {["$20", "$15", "$10", "$5", "$0"].map((label, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-xs text-gray-400 w-10 text-right pr-3">{label}</span>
                  <div className="flex-1 h-px bg-gray-400/60"></div>
                </div>
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-between gap-3 md:gap-5 pl-14">
              {barData.map((bar, i) => (
                <div
                  key={i}
                  className="flex-1 bg-orange-500 rounded-t-md transition-all duration-500 hover:bg-orange-600 shadow-sm"
                  style={{ height: `${bar.height}%` }}
                />
              ))}
            </div>
          </div>

          {/* X-Axis Label */}
          <div className="mt-6 text-sm text-gray-500">
            <p className="font-medium">Last 12 Months</p>
            <p className="text-xs">Since June 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}