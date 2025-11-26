import  { useState, useEffect } from "react";

export default function CountriesChart() {
  const allCountries = [
    { name: "Ghana", value: 124, change: "+12", color: "#EF4444" },
    { name: "Nigeria", value: 124, change: "+12", color: "#10B981" },
    { name: "South Africa", value: 124, change: "+12", color: "#8B5CF6" },
    { name: "Kenya", value: 98, change: "+18", color: "#F59E0B" },
    { name: "Uganda", value: 87, change: "+9", color: "#3B82F6" },
    { name: "Tanzania", value: 76, change: "+15", color: "#EC4899" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % allCountries.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Current 3 countries (rotating)
  const countries = [
    allCountries[currentIndex % allCountries.length],
    allCountries[(currentIndex + 1) % allCountries.length],
    allCountries[(currentIndex + 2) % allCountries.length],
  ];

  const total = countries.reduce((sum, c) => sum + c.value, 0);
  const circumference = 502.65; // 2π × 80

  let accumulated = 0;
  const segments = countries.map((country) => {
    const length = (country.value / total) * circumference;
    const offset = -accumulated;
    accumulated += length;
    return { ...country, length, offset };
  });

  return (
    <div className="bg-gray-50/70 rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Countries{" "}
        <span className="text-sm font-normal text-gray-500">last week</span>
      </h3>

      <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative w-52 h-52">
          <svg
            width="208"
            height="208"
            viewBox="0 0 208 208"
            className="w-full h-full -rotate-90"
          >
            {/* Background Ring */}
            <circle
              cx="104"
              cy="104"
              r="82"
              fill="none"
              stroke="#F3F4F6"
              strokeWidth="38"
            />

            {/* Animated Segments */}
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx="104"
                cy="104"
                r="82"
                fill="none"
                stroke={seg.color}
                strokeWidth="38"
                strokeDasharray={`${seg.length} ${circumference}`}
                strokeDashoffset={seg.offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-in-out"
              />
            ))}

            {/* Inner White Circle (donut hole) */}
            <circle cx="104" cy="104" r="60" fill="white" />
          </svg>

          {/* Beautiful Center Number */}
ารถ
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 leading-tight">
                {total.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">
                Listeners
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 w-full space-y-4">
          {countries.map((country) => (
            <div
              key={country.name}
              className="flex items-center justify-between text-sm transition-all duration-700"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0 transition-colors duration-700"
                  style={{ backgroundColor: country.color }}
                />
                <span className="font-medium text-gray-700">{country.name}</span>
              </div>
              <span className="text-gray-600">
                {country.value}{" "}
                <span className="text-green-600 text-xs font-medium">
                  ({country.change})
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}