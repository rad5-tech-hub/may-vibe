// src/components/upload/ReleaseDatePicker.jsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTimes } from 'react-icons/fa';

const ReleaseDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 5, 26)); // June 26, 2024
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [isAM, setIsAM] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock data (in real app, this would come from your form context)
  const reviewData = {
    artwork: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400',
    songTitle: 'Summer Vibes 2024',
    artistName: 'Mayvibe Artist',
    contributors: 'feat. John Doe',
    language: 'English',
    genre: 'Afrobeat',
    releaseDate: selectedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    releaseTime: `${selectedTime.slice(0, 5)} ${isAM ? 'AM' : 'PM'}`,
    dsps: ['Apple Music', 'Spotify', 'Boomplay', 'Deezer'],
  };

  return (
    <>
      {/* MAIN DATE PICKER CARD */}
      <div className="rounded-3xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Release Date and Time</h3>

        <div className="bg-gray-100 rounded-3xl p-6 space-y-6">
          {/* Calendar */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            calendarClassName="custom-calendar"
            dayClassName={(date) =>
              selectedDate && date.toDateString() === selectedDate.toDateString()
                ? 'selected-day'
                : undefined
            }
          />

          {/* Time Picker */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Time</span>
            <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-sm">
              <span className="font-semibold text-lg">{selectedTime.slice(0, 5)}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAM(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${isAM ? 'bg-orange-500 text-white' : 'text-gray-600'}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setIsAM(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${!isAM ? 'bg-orange-500 text-white' : 'text-gray-600'}`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* REVIEW & PUBLISH MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0  bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto ">
            {/* Close Button */}
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-6 right-6 text-orange-500 hover:text-orange-600 z-10"
            >
              <FaTimes className="w-6 h-6 cursor-pointer" />
            </button>

            {/* Artwork */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              <img
                src={reviewData.artwork}
                alt="Song artwork"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Review Fields */}
            <div className="space-y-7 text-gray-800">
              {[
                { label: 'Song Title', value: reviewData.songTitle },
                { label: 'Artist Name', value: reviewData.artistName },
                { label: 'Contributors', value: reviewData.contributors },
                { label: 'Language', value: reviewData.language },
                { label: 'Genre', value: reviewData.genre },
                { label: 'Date of Release', value: `${reviewData.releaseDate} • ${reviewData.releaseTime}` },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-semibold text-lg border-b-2 border-orange-400 pb-1">
                    {item.value}
                  </p>
                </div>
              ))}

              <div>
                <p className="text-sm text-gray-500">DSP</p>
                <p className="font-medium text-gray-700">
                  {reviewData.dsps.join(', ')}
                </p>
              </div>
            </div>

            {/* Publish Button */}
            <div className="mt-10">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xl py-3 transition-all cursor-pointer transform hover:-translate-y-1">
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReleaseDatePicker;