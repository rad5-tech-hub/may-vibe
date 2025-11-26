import React from "react";
import { X } from "lucide-react";

export default function ViewReleaseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const bars = [32, 38, 35, 42, 40, 38, 45, 48, 52, 44, 50, 55];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Track Performance</h2>
              <p className="text-sm text-gray-500 mt-1">Track your streams from the music you release.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm text-gray-600">Highest Stream</p>
              <p className="text-3xl font-bold text-gray-900">24,092.75</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">African Giant</p>
              <p className="text-sm text-gray-500">February, 2021</p>
            </div>
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1500462918056-b6c2edcca67d?w=400&h=400&fit=crop"
                alt="African Giant"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            {["Year", "Month", "Day"].map((tab) => (
              <button
                key={tab}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  tab === "Month"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="h-80 flex items-end justify-between gap-2 px-4">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all duration-700 hover:from-orange-600 hover:to-orange-500"
                style={{ height: `${h * 5}px` }}
              />
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-4 px-2">
            {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}