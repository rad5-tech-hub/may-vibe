import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import two from '../../../../../assets/two.png';

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
    <div className="bg-gray-50 rounded-3xl p-8 max-h-max">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Upload Artwork</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <img src={two} alt="step two" />
        </button>
      </div>

      <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
        <p className="text-gray-600 text-xs mb-6 leading-relaxed flex items-center">
          Click and select an image file from a folder. <br />
          File should not be more than 40mb.<br /> 
          Accepted file formats are JPG, PNG.
        </p>

        {image ? (
          <div className="relative">
            <img src={image} alt="Artwork" className="w-full h-48 rounded-2xl object-cover" />
            <button
              onClick={() => setImage(null)}
              className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
            >
              <FaTimes className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        ) : (
          <label className="block cursor-pointer lg:w-sm">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <div className="border-4 border-dashed border-gray-300 rounded-3xl w-full lg:h-48 flex items-center justify-center">
              <div className="text-center ">
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