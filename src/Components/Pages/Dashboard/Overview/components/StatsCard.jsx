import PropTypes from 'prop-types';

export default function StatCard({ 
  title, 
  value, 
  change, 
  children, 
  badge,
  hasDropdown = false 
}) {
  return (
    <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {hasDropdown && (
            <button className="px-3 py-1.5 border border-orange-400 text-orange-500 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-orange-50 transition-colors">
              JULY, 2025
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
        {badge && (
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {badge}
          </div>
        )}
      </div>

      {/* Value */}
      {value && (
        <div className="mb-2">
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          {change && (
            <div className="flex items-center gap-1 mt-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-600">{change}</span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  change: PropTypes.string,
  children: PropTypes.node,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasDropdown: PropTypes.bool,
};