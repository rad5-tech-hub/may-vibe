import prop from 'prop-types';
const NowPlayingCard = ({ song, artist }) => (
  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
	<div className="flex items-center gap-3 sm:gap-4">
	  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-900 rounded-full flex-shrink-0 flex items-center justify-center">
		<div className="w-0 h-0 border-t-6 border-t-transparent border-l-8 border-l-white border-b-6 border-b-transparent ml-1" />
	  </div>
	  <div className="min-w-0 flex-1">
		<p className="text-xs sm:text-sm text-gray-600 truncate">Play: {song}</p>
		<p className="font-semibold text-sm sm:text-base text-gray-900 truncate">Album: {artist}</p>
	  </div>
	</div>
  </div>
);
export default NowPlayingCard;

// PropTypes Validation
NowPlayingCard.propTypes = {
  song: prop.string.isRequired,
  artist: prop.string.isRequired,
};