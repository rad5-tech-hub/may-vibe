export default function CurrentPlayingBar() {
  return (
    <div className="bg-gray-50   rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 h-35 ">
      {/* Play Button */}
      <button className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-gray-800 transition-colors ">
        <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      </button>

      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 truncate">Play: God is good (ft. Donseth Beat)</div>
        <div className="text-sm text-gray-500">Album: 5ive</div>
      </div>

      {/* Duration */}
      <div className="text-sm font-medium text-gray-600 ">2:40</div>
    </div>
  );
}