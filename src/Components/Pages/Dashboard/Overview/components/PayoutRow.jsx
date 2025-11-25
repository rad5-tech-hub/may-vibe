import prop from 'prop-types';
const PayoutRow = ({ id, amount, date }) => (
  <div className="flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors">
	<span className="text-xs sm:text-sm text-gray-600 flex-1">{id}</span>
	<span className="font-semibold text-gray-900 text-sm sm:text-base flex-1 text-center">${amount.toLocaleString()}</span>
	<span className="text-xs sm:text-sm text-gray-600 flex-1 text-right">{date}</span>
  </div>
);

export default PayoutRow;
// PropTypes Validation
PayoutRow.propTypes = {
  id: prop.string.isRequired,
  amount: prop.number.isRequired,
  date: prop.string.isRequired,
};