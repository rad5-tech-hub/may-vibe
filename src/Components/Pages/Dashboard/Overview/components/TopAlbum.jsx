export default function TopAlbumChart() {
  return (
    <div className="space-y-4">
      {/* Album Info Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-1">Album: 5ive</div>
          <div className="text-xs text-gray-500">Plays</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">54,524,851</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-40 relative bg-linear-to-b from-orange-50/50 to-transparent rounded-lg">
        <svg className="w-full h-full" viewBox="0 0 320 160" preserveAspectRatio="none">
          <defs>
            <linearGradient id="albumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path
            d="M 20 110 Q 70 100, 90 70 T 150 60 Q 180 65, 200 80 T 250 70 L 280 65 L 280 160 L 20 160 Z"
            fill="url(#albumGradient)"
          />
          
          {/* Line */}
          <path
            d="M 20 110 Q 70 100, 90 70 T 150 60 Q 180 65, 200 80 T 250 70 L 280 65"
            fill="none"
            stroke="#FB923C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Data points */}
          <circle cx="20" cy="110" r="5" fill="#FB923C" />
          <circle cx="90" cy="70" r="5" fill="#FB923C" />
          <circle cx="150" cy="60" r="5" fill="#FB923C" />
          <circle cx="200" cy="80" r="5" fill="#FB923C" />
          <circle cx="250" cy="70" r="5" fill="#FB923C" />
          <circle cx="280" cy="65" r="5" fill="#FB923C" />
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