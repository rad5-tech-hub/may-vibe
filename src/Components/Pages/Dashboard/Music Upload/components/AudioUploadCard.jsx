import { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';

const AudioUploadCard = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="bg-orange-600 rounded-3xl p-8 max-h-max text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 py-4 bg-white/20 rounded-full flex items-center justify-center">
          <FaUpload className="w-6 h-6" />
        </div>
        <button className="text-white/70 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 01-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 01-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 011.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-3">Upload Audio</h3>
      <p className="text-white/80 text-sm mb-6 leading-relaxed">
        Click and select a song or file from a folder. <br />
        Song or file should not be more than 40mb.<br />
        Accepted file formats are Mp3, WAV, M4A
      </p>

      {fileName ? (
        <div className="bg-white/20 rounded-xl px-5 py-4 items-center justify-between hidden lg:flex">
          <span className="truncate max-w-xs">{fileName}</span>
          <button onClick={() => setFileName('')} className="text-white hover:text-orange-200">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <label className="block">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="bg-white hover:bg-white/60 border-2 rounded-xl py-3 text-center cursor-pointer transition">
            <span className="text-orange-600 font-medium">Upload</span>
          </div>
        </label>
      )}
    </div>
  );
};

export default AudioUploadCard;