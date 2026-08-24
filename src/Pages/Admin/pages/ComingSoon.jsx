import PropTypes from "prop-types";

const ComingSoon = ({ title }) => (
  <section className="flex min-h-[55vh] items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
    <div><p className="mb-2 text-sm font-medium text-orange-500">{title}</p><h1 className="text-3xl font-bold text-gray-900">Coming soon</h1><p className="mt-2 text-sm text-gray-500">This page will be available soon.</p></div>
  </section>
);
ComingSoon.propTypes = { title: PropTypes.string.isRequired };
export default ComingSoon;
