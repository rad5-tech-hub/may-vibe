// import React from 'react';
import PropTypes from 'prop-types';
import { MoreVertical, Play, Download } from 'lucide-react';

const ReleaseRow = ({ song, artist, date, duration, image, isLast = false }) => {
  return (
    <>
      <div className="flex items-center gap-4 px-4 py-5 hover:bg-gray-50/70 transition-colors group">
        {/* Checkbox */}
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 shrink-0"
        />

        {/* Album Art */}
        <img
          src={image}
          alt={song}
          className="w-12 h-12 rounded-lg object-cover shrink-0 shadow-sm"
        />

        {/* Title + Artist */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm truncate leading-tight">
            {song}
          </h4>
          <p className="text-xs text-gray-500 truncate mt-0.5">{artist}</p>
        </div>

        {/* Date - hidden on mobile */}
        <div className="hidden lg:block text-sm text-gray-600 font-medium shrink-0">
          {date}
        </div>

        {/* ZIP Download Button */}
        <button className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors shrink-0">
          <Download size={14} />
          ZIP
        </button>

        {/* Duration */}
        <div className="text-sm text-gray-600 font-medium shrink-0">
          {duration}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Play size={16} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Orange divider line (except after last row) */}
      {!isLast && <div className="h-px bg-orange-200/60 mx-4" />}
    </>
  );
};

ReleaseRow.propTypes = {
  song: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
};
export default ReleaseRow;