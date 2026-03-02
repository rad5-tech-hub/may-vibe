// import React from "react";
import { MoreVertical } from "lucide-react";
import Image1 from '../../../../../assets/Subscribers1.png'
import Image2 from '../../../../../assets/Subscribers2.png'
import Image3 from '../../../../../assets/Subscribers3.png'
const releases = [
  { title: "UY Scuti", artist: "Junior", date: "14/07/2025", duration: "3:34" },
  { title: "Made In Lagos", artist: "Junior", date: "14/07/2025", duration: "2:08" },
  { title: "A Better Time", artist: "Junior", date: "14/07/2025", duration: "2:25" },
  { title: "UY Scuti", artist: "Junior", date: "14/07/2025", duration: "3:34" },
  { title: "Made In Lagos", artist: "Junior", date: "14/07/2025", duration: "2:08" },
  { title: "A Better Time", artist: "Junior", date: "14/07/2025", duration: "2:25" },
];

// Real, beautiful album-style images from Unsplash
const albumCovers = [
  Image1,
  Image2,
  Image3,
  Image1,
  Image2,
  Image3,
];

export default function MyReleases() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">My Releases</h2>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-6 text-sm font-medium text-gray-600">
            <div className="col-span-7">Song Title</div>
            <div className="col-span-3 text-center">Date</div>
            <div className="col-span-2 text-center">Duration</div>
          </div>
        </div>

        {/* Rows */}
        {releases.map((item, i) => (
          <div key={i}>
            <div className="grid grid-cols-12 gap-6 px-8 py-5 hover:bg-orange-50/30 transition-colors group">
              {/* Checkbox + Image + Title */}
              <div className="col-span-7 flex items-center gap-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                />
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white shadow-md shrink-0">
                  <img
                    src={albumCovers[i]} // Mapped from real list
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.artist}</div>
                </div>
              </div>

              {/* Date */}
              <div className="col-span-3 flex items-center justify-center text-sm text-gray-700 font-medium">
                {item.date}
              </div>

              {/* Duration + More */}
              <div className="col-span-2 flex items-center justify-center gap-3 text-sm text-gray-700 font-medium">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.55.89l3 1.5a1 1 0 10.9-1.78L11 8.55V5z"/>
                  </svg>
                  {item.duration}
                </span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Orange Divider — except last row */}
            {i < releases.length - 1 && (
              <div className="h-px bg-linear-to-r from-transparent via-orange-300 to-transparent mx-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}