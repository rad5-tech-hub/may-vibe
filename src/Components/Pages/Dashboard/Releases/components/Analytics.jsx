import { TrendingUp, ChevronDown } from "lucide-react";
import MonthlyListenersChart from "../../Overview/components/MonthlyListeners";
import CountriesChart from "./CountriesChart";
import LineChart from "./LineChart";
export default function AnalyticsDashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChart
          title="Top Song"
          subtitle="God is good (ft. Donseth Beat)"
          plays="123,764,429"
          growth="+2.25%"
        />
        <LineChart
          title="Top Album"
          subtitle="5ive"
          plays="223,764,429"
          growth="+2.25%"
        />
      </div>

      {/* Bottom Row: Monthly Listeners + Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Listeners */}
        <div className="bg-gray-50/70 rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Monthly Listeners</h3>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-4xl font-bold text-gray-900">4.79 Million</span>
                <span className="flex items-center text-green-600 font-medium">
                  <TrendingUp className="w-5 h-5 mr-1" />
                  +2.25%
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
              JULY, 2025
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <MonthlyListenersChart />
        </div>

        {/* Countries */}
        <CountriesChart />
      </div>
    </div>
  );
}