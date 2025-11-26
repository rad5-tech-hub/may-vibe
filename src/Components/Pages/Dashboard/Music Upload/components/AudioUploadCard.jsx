import { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import one from '../../../../../assets/one.png'

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
          <img src={one} alt="step one" />
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