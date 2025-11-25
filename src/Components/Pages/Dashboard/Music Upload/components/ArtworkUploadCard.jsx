import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ArtworkUploadCard = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 rounded-3xl p-10 max-h-max">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Upload Artwork</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 011.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      <div className='flex justify-between gap-5'>
        <p className="text-gray-600 text-xs mb-6 leading-relaxed flex items-center">
          Click and select an image file from a folder. <br />
          File should not be more than 40mb.<br /> 
          Accepted file formats are JPG, PNG.
        </p>

        {image ? (
          <div className="relative">
            <img src={image} alt="Artwork" className="w-full rounded-2xl object-cover" />
            <button
              onClick={() => setImage(null)}
              className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
            >
              <FaTimes className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        ) : (
          <label className="block cursor-pointer w-sm">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <div className="border-4 border-dashed border-gray-300 rounded-3xl w-full h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 border-2 border-dashed border-gray-400" />
                <p className="text-gray-500 font-medium">Upload</p>
              </div>
            </div>
          </label>
        )}
      </div>
    </div>
  );
};

export default ArtworkUploadCard;