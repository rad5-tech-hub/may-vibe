// src/components/PlaceholderPage.jsx
import PropTypes from 'prop-types';

const PlaceholderPage = ({ title }) => (
  <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm text-center">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
      {title}
    </h1>
    <p className="text-gray-600">This page is under construction.</p>
  </div>
);

// PropTypes Validation
PlaceholderPage.propTypes = {
  title: PropTypes.string.isRequired,
};

// Optional: Default props (in case title is not passed)
PlaceholderPage.defaultProps = {
  title: 'Coming Soon',
};

export default PlaceholderPage;