import prop from 'prop-types';
const ProjectCard = ({ image, title, artist }) => (
  <div className="flex flex-col items-center group cursor-pointer">
	<div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden mb-3 shadow-lg transform transition-transform group-hover:scale-105">
	  <img src={image} alt={title} className="w-full h-full object-cover" />
	</div>
	<h4 className="font-semibold text-gray-900 text-xs sm:text-sm text-center">{title}</h4>
	<p className="text-xs text-gray-500">{artist}</p>
  </div>
);

export default ProjectCard;
// PropTypes Validation
ProjectCard.propTypes = {
  image: prop.string.isRequired,
  title: prop.string.isRequired,
  artist: prop.string.isRequired,
};