import PropTypes from 'prop-types';
import { TrendingUp } from 'lucide-react';

// Enhanced StatsCard — pixel-perfect match to your design
const StatsCard = ({ title, value, subtitle, change, chart, color = "orange", rank }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="flex items-center gap-2">
        {/* Rank badge (Top Song / Top Album) */}
        {rank && (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
            {rank}
          </div>
        )}
        {/* Change indicator */}
        {change !== undefined && (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${
            change >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
          }`}>
            {change >= 0 ? <TrendingUp className="w-3 h-3" /> : 'Down'}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>

    {/* Main Value */}
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    {subtitle && <div className="text-xs text-gray-500 mb-4">{subtitle}</div>}

    {/* Chart */}
    {chart && (
      <div className="h-24 mt-6 -mx-6 -mb-6 px-6 pb-6 bg-gradient-to-t from-orange-50/30 to-transparent rounded-b-2xl">
        <div className="h-full flex items-end gap-1">
          {chart.map((height, i) => (
            <div
              key={i}
              className={`flex-1 bg-${color}-500 rounded-t-sm transition-all duration-500 hover:bg-${color}-600`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);

export default StatsCard;

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  change: PropTypes.number,
  chart: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string,
  rank: PropTypes.number,
};
