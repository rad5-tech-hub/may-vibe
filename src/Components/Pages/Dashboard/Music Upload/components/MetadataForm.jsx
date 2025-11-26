import { useState } from 'react';
import three from '../../../../../assets/three.png';

const MetadataForm = () => {
  const [isrcMode, setIsrcMode] = useState('auto'); // 'auto' or 'manual'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDsps, setSelectedDsps] = useState([]);

  const dspList = ['Apple Music', 'Spotify', 'Boomplay', 'Deezer', 'Audiomack'];

  const filteredDsps = dspList.filter(dsp =>
    dsp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDsp = (dsp) => {
    setSelectedDsps(prev =>
      prev.includes(dsp) ? prev.filter(d => d !== dsp) : [...prev, dsp]
    );
  };

  return (
    <div className="bg-gray-100 backdrop-blur-sm rounded-3xl px-4 py-10 lg:py-10 lg:px-10 relative">
      <div className='flex justify-between mb-10'>
        <h3 className="text-lg lg:text-2xl font-bold text-gray-900">Fill Metadata</h3>
        <img src={three} alt="step three" />
      </div>

      {/* Metadata Fields */}
      <div className="space-y-10 mb-12">
        {[
          'Song Title',
          'Artist Name',
          'Contributors',
          'Language',
          'Genre',
        ].map((label) => (
          <div key={label} className="relative">
            <input
              type="text"
              placeholder={label}
              className="w-full text-lg text-gray-800 placeholder-gray-500 bg-transparent border-b-2 border-orange-400 pb-3 focus:border-orange-500 outline-none transition-colors"
            />
          </div>
        ))}
      </div>

      {/* ISRC + DSP Section */}
      <div className="space-y-8">
        {/* ISRC Radio Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="isrc"
                checked={isrcMode === 'auto'}
                onChange={() => setIsrcMode('auto')}
                className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-gray-700 font-medium">ISRC: Auto</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="isrc"
                checked={isrcMode === 'manual'}
                onChange={() => setIsrcMode('manual')}
                className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-gray-700 font-medium">Manual</span>
            </label>
          </div>
        </div>

        {/* DSP Multi-Select Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gray-700 font-medium">DSP</span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-gray-50 border-2 border-orange-400 rounded-xl py-4 px-5 pr-12 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
            />
            {/* Clear Button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            {/* Search Icon */}
            <svg className="w-6 h-6 absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Dropdown List */}
          {searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-10">
              {filteredDsps.map((dsp) => (
                <label
                  key={dsp}
                  className="flex items-center justify-between px-5 py-4 hover:bg-orange-50 cursor-pointer transition"
                >
                  <span className="text-gray-800">{dsp}</span>
                  <input
                    type="checkbox"
                    checked={selectedDsps.includes(dsp)}
                    onChange={() => toggleDsp(dsp)}
                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetadataForm;