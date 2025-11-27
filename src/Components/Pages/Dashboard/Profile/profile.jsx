// src/pages/Profile.jsx or src/components/Profile.jsx
import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import profile from '../../../../assets/Frame.png';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-white py-5 px-2 font-display">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-10">Edit Profile</h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN – Avatar + Info */}
          <div className="lg:col-span-2 space-y-8">

            {/* Profile Photo Upload */}
            <div className="bg-gray-50 rounded-3xl p-10 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-8 items-center text-start">
                <div className="relative mb-6">
                  <img
                    src={profile} // ← Replace with your actual image
                    alt="Profile"
                    className="w-48 h-48 rounded-full object-contain"
                  />
                </div>
                <div>
                  <button className="text-black border border-black px-3 py-1 rounded-md cursor-pointer font-medium  hover:text-orange-600 transition">
                    <input type="file" accept="image/*" className="hidden" />
                    Upload new photo
                  </button>
                  <p className="text-black text-sm mt-2">
                    At least 800x800px recommended<br />
                    JPG or PNG is allowed
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 gap-3">
                <h3 className="text-lg lg:text-2xl font-bold text-gray-900">Personal Info</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-5 lg:py-2 border-2 border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-500 transition cursor-pointer"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-3 text-center md:text-left">
                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="text-md font-semibold text-gray-900 mt-1">John Doe</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Stage Name</p>
                  <p className="text-md font-semibold  mt-1">Johnny D</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-md font-medium text-gray-900 mt-1">johnnydoe@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Country & Region */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-6">Country & Region</h3>
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="w-8 lg:w-12 h-8 lg:h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-md lg:text-xl font-bold">➤</span>
                </div>
                <input
                  type="text"
                  placeholder="Port Harcourt, Nigeria"
                  className="flex-1 bg-transparent text-sm lg:text-xl font-medium text-gray-900 outline-none"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 lg:px-6 py-2 rounded-lg cursor-pointer transition shadow-sm">
                  Save changes
                </button>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Bio</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu orci ut est hendrerit dictum id at risus. Pellentesque quis ligula at risus sagittis egestas quis ut enim. Suspendisse volutpat rhoncus risus. Nam sollicitudin non orci vitae pulvinar. Pellentesque ligula elit, egestas consectetur molestie in, ultrices nec augue. Donec varius elementum neque, vel pellentesque. Quisque semper pulvinar felis at dictum. Proin non magna libero. Phasellus eleifend tellus nisi porta tempus. Mauris eu vehicula quam. Praesent facilisis risus eget sem hendrerit, in aliquet arcu eleifend. Suspendisse vel rutrum augue, eu sollicitudin leo. Ut at ex ultricies, molestie magna ac, maximus leo. Proin placerat purus blandit, vel posuere orci venenatis nec.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN – Progress Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Complete your profile</h3>

              {/* Progress Circle */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#e5e7eb"
                    strokeWidth="14"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#1F9900"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="552"
                    strokeDashoffset="552 * (1 - 0.4)"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-[#1F9900]">40%</span>
                </div>
              </div>

              {/* Progress List */}
              <ul className="space-y-5">
                {[
                  { text: 'Setup account', percent: '10%', done: true },
                  { text: 'Upload your photo', percent: '5%', done: true },
                  { text: 'Personal Info', percent: '10%', done: true },
                  { text: 'Location', percent: '+20%', done: false },
                  { text: 'Biography', percent: '15%', done: true },
                  { text: 'Notifications', percent: '+10%', done: false },
                  { text: 'Bank details', percent: '+30%', done: false },
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {item.done ? (
                        <FaCheck className="w-4 h-4 text-black" />
                      ) : (
                        <FaTimes className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`text-sm font-medium ${item.done ? 'text-gray-900' : 'text-gray-500'}`}>
                        {item.text}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-green-700">
                      {item.percent}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;