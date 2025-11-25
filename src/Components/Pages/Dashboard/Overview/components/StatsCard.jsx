	import PropTypes from 'prop-types';
	const StatsCard = ({ title, value, subtitle, change, chart, color = "orange" }) => (
	<div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
		<div className="flex items-center justify-between mb-2">
		<h3 className="text-sm text-gray-600">{title}</h3>
		{change && (
			<span className={`text-xs px-2 py-1 rounded-full ${
			change >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
			}`}>
			{change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
			</span>
		)}
		</div>
		<div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{value}</div>
		{subtitle && <div className="text-xs text-gray-500 mb-4">{subtitle}</div>}
		{chart && (
		<div className="h-20 sm:h-24 flex items-end gap-0.5 sm:gap-1">
			{chart.map((height, i) => (
			<div 
				key={i}
				className={`flex-1 bg-${color}-500 rounded-t transition-all hover:bg-${color}-600`}
				style={{ height: `${height}%` }}
			/>
			))}
		</div>
		)}
	</div>
	);

	export default StatsCard;
	// PropTypes Validation
	StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  change: PropTypes.number,
  chart: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string,
};