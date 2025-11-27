import  { useState, useEffect } from "react";
import { Sun } from "lucide-react";

// Multiple realistic royalty datasets (you can add as many as you want)
const royaltyDatasets = [
  // Dataset 1 - Current (your original)
  [75, 50, 85, 100, 95, 60, 80, 70, 105, 90, 75, 88],
  // Dataset 2 - Strong growth
  [60, 68, 72, 80, 88, 95, 98, 102, 110, 118, 125, 130],
  // Dataset 3 - Seasonal dips & peaks
  [90, 85, 70, 65, 80, 95, 110, 105, 98, 88, 82, 92],
  // Dataset 4 - Viral hit spike
  [70, 72, 75, 78, 85, 120, 140, 135, 115, 98, 90, 88],
];

export default function Royalties() {
  const [currentDatasetIndex, setCurrentDatasetIndex] = useState(0);
  const [barHeights, setBarHeights] = useState(royaltyDatasets[0]);

  // Auto-rotate datasets every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDatasetIndex((prev) => (prev + 1) % royaltyDatasets.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Smoothly update bar heights when dataset changes
  useEffect(() => {
    setBarHeights(royaltyDatasets[currentDatasetIndex]);
  }, [currentDatasetIndex]);

  // Find the maximum value across ALL datasets for consistent scaling
  const globalMax = Math.max(...royaltyDatasets.flat());
  const scaleValue = (value) => (value / globalMax) * 100;

  return (
    <section className="w-full max-w-7xl mx-auto p-6">
      <div className="bg-gray-50 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
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
              <span className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                Paid
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Next Payment (estimated)</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">$28,430.59</p>
              <p className="text-sm text-gray-400 mt-2">
                Payment to be made on:{" "}
                <span className="font-medium text-gray-700">23/09/2025</span>
              </p>
            </div>
            <div className="flex items-center justify-start md:justify-end gap-3 text-sm text-gray-500">
              <Sun className="w-5 h-5 text-orange-500" />
              <span className="bg-gray-100 px-4 py-2.5 rounded-lg font-medium text-gray-700">
                Payments Made To: juniorachebe@gmail.com
              </span>
            </div>
          </div>
          <div className="h-px bg-linear-to-r from-transparent via-orange-300 to-transparent mt-8" />
        </div>

        {/* Animated Chart */}
        <div className="px-8 pb-10 pt-6">
          <div className="relative h-64">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none">
              {["$20k", "$15k", "$10k", "$5k", "$0"].map((label, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-xs text-gray-400 w-12 text-right pr-3">
                    {label}
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              ))}
            </div>

            {/* Animated Bars */}
            <div className="absolute inset-0 flex items-end justify-between gap-3 md:gap-5 pl-14">
              {barHeights.map((rawHeight, i) => {
                const heightPercent = scaleValue(rawHeight);

                return (
                  <div
                    key={i}
                    className="flex-1 bg-orange-500 rounded-t-md transition-all duration-1000 ease-out hover:bg-orange-600 shadow-sm relative group"
                    style={{ height: `${heightPercent}%` }}
                  >
                    {/* Optional: Tooltip on hover */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      ${rawHeight.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* X-Axis Label + Live Indicator */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm text-gray-700">Last 12 Months</p>
              <p className="text-xs text-gray-500">Live · Changes every 8s</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Real-time simulation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}