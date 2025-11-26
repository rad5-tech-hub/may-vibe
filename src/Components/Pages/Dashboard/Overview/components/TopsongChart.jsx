export default function TopSongChart() {
  return (
    <div className="space-y-4">
      {/* Song Info Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-1">Song: God is good (ft. Donseth Beat)</div>
          <div className="text-xs text-gray-500">Plays</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">123,764,429</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-40 relative bg-gradient-to-b from-orange-50/50 to-transparent rounded-lg">
        <svg className="w-full h-full" viewBox="0 0 320 160" preserveAspectRatio="none">
          <defs>
            <linearGradient id="songGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path
            d="M 20 100 Q 70 90, 90 60 T 150 50 Q 180 55, 200 70 T 250 60 L 280 55 L 280 160 L 20 160 Z"
            fill="url(#songGradient)"
          />
          
          {/* Line */}
          <path
            d="M 20 100 Q 70 90, 90 60 T 150 50 Q 180 55, 200 70 T 250 60 L 280 55"
            fill="none"
            stroke="#FB923C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Data points */}
          <circle cx="20" cy="100" r="5" fill="#FB923C" />
          <circle cx="90" cy="60" r="5" fill="#FB923C" />
          <circle cx="150" cy="50" r="5" fill="#FB923C" />
          <circle cx="200" cy="70" r="5" fill="#FB923C" />
          <circle cx="250" cy="60" r="5" fill="#FB923C" />
          <circle cx="280" cy="55" r="5" fill="#FB923C" />
        </svg>

        {/* Month labels */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 text-[10px] text-gray-400">
          <span>February</span>
          <span>March</span>
          <span>April</span>
          <span>May</span>
          <span>June</span>
          <span>July</span>
        </div>
      </div>
    </div>
  );
}