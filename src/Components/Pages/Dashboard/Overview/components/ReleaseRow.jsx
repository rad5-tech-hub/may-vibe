import {MoreVertical } from 'lucide-react';
import prop from 'prop-types';
const ReleaseRow = ({ song, artist, date, duration, image }) => (
  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors">
	<input type="checkbox" className="rounded border-gray-300 shrink-0" />
	<img src={image} alt={song} className="w-10 h-10 rounded-lg shrink-0" />
	<div className="flex-1 min-w-0">
	  <h4 className="font-semibold text-gray-900 truncate text-sm">{song}</h4>
	  <p className="text-xs text-gray-500 truncate">{artist}</p>
	</div>
	<div className="hidden sm:block text-sm text-gray-600 shrink-0">{date}</div>
	<div className="hidden md:block text-sm text-gray-600 shrink-0">{duration}</div>
	<button className="p-2 hover:bg-gray-100 rounded-lg shrink-0">
	  <MoreVertical size={16} className="text-gray-400" />
	</button>
  </div>
);

export default ReleaseRow;
// PropTypes Validation
ReleaseRow.propTypes = {
  song: prop.string.isRequired,
  artist: prop.string.isRequired,
  date: prop.string.isRequired,
  duration: prop.string.isRequired,
  image: prop.string.isRequired,
};