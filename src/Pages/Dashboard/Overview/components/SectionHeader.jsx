	import prop from 'prop-types';
const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
    {action && action}
  </div>
);
export default SectionHeader;
// PropTypes Validation
SectionHeader.propTypes = {
  title: prop.string.isRequired,
  subtitle: prop.string,
  action: prop.node,
};