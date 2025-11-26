// import React from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

export default function EditReleaseModal({ isOpen, onClose, release }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header + Avatar + Close */}
        <div className="relative bg-gradient-to-b from-orange-50 to-white pt-6 pb-16">
          <button
            onClick={onClose}
            className="absolute top-3 left-3 p-1.5 bg-white/90 hover:bg-white rounded-full transition shadow"
          >
            <X className="w-5 h-5 text-orange-600" />
          </button>

          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden ring-6 ring-white shadow-xl">
            <img
              src={release.cover}
              alt={release.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Ultra-tight Form */}
        <div className="px-5 pt-14 pb-6 -mt-10 space-y-4">
          {[
            { label: "Song Title", value: release.title },
            { label: "Artist Name", value: release.artist },
            { label: "Contributors", value: "Junior, Donseth Beat" },
            { label: "Language", value: "English" },
            { label: "Genre", value: "Afrobeats" },
            { label: "Release Date", value: "12 March 2025" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {field.label}
              </label>
              <input
                type="text"
                defaultValue={field.value}
                className="mt-1 w-full px-0 py-1.5 text-base font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-orange-500 outline-none transition"
              />
            </div>
          ))}

          <button className="w-full mt-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-md transition-all active:scale-95">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

EditReleaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  release: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
};