// Reusable Line Chart Component (your Top Song/Album style)
import { TrendingUp } from 'lucide-react';

import { PropTypes } from 'prop-types';
function LineChart({ title, subtitle, plays, growth }) {
  return (
    <div className="bg-gray-50/70 rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="mb-4">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-lg font-medium text-gray-900 mt-1">{subtitle}</p>
        <div className="flex items-center gap-2 mt-3">
          <p className="text-2xl font-bold text-gray-900">{plays}</p>
          <span className="flex items-center text-sm font-medium text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            {growth}
          </span>
        </div>
      </div>

      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 320 192" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d="M 10 140 Q 60 120, 90 90 T 160 80 Q 220 100, 250 85 L 310 90 L 310 192 L 10 192 Z"
            fill="url(#lineGradient)"
          />

          {/* Line */}
          <path
            d="M 10 140 Q 60 120, 90 90 T 160 80 Q 220 100, 250 85 L 310 90"
            fill="none"
            stroke="#FB923C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Dots */}
          {[10, 90, 160, 250, 310].map((x, i) => (
            <circle key={i} cx={x} cy={[140, 90, 80, 85, 90][i]} r="5" fill="#FB923C" />
          ))}
        </svg>

        {/* X-Axis Labels */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-between px-4 text-xs text-gray-400">
          {["February", "March", "April", "May", "June", "July"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LineChart
LineChart.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  plays: PropTypes.string.isRequired,
  growth: PropTypes.string.isRequired,
};