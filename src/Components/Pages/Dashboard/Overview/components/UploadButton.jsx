export default function UploadButton() {
  return (
    <div className="relative h-35 w-full bg-linear-to-br from-orange-500 to-orange-600 rounded-3xl shadow-xl overflow-hidden flex items-center justify-center  hover:shadow-2xl transition-shadow">
      {/* Subtle depth */}
      <div className="absolute inset-0 bg-black opacity-5" />

      {/* Main content: icon + text+buttons in a row, centered as a group */}
      <div className="flex items-center gap-6 text-white">
        {/* Icon – Left side */}
        <div className="w-16 h-16 bg-white rounded-full flex-shrink-0 flex items-center justify-center shadow-lg">
          <svg
            className="w-9 h-9 text-orange-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14m-7-7h14" />
          </svg>
        </div>

        {/* Text & Buttons – Right side */}
        <div className="flex flex-col items-start space-y-1">
          <h3 className="text-lg font-bold tracking-tight">Upload Music</h3>
          
          <p className="text-xs leading-tighter text-white/90 max-w-[180px]">
         Click and select a song or file from a folder. 
            <span className="text-white/70">Song or file should not be more than 40mb</span>
          </p>

          <div className="flex gap-3 pt-1">
            <button className="px-5 py-2 bg-white text-orange-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-shadow shadow-sm">
              Upload
            </button>
            <button className="px-5 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium-medium rounded-xl hover:bg-white/30 transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}