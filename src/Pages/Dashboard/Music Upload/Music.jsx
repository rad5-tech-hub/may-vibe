import { useState } from "react";
import { Music4, Video, Sparkles } from "lucide-react";
import { hasActiveSubscription } from "../../../utils/subscription";
import SubscriptionGate from "./components/SubscriptionGate";
import ReleaseWizard from "./ReleaseWizard";

const UploadMusic = () => {
  const [subscribed, setSubscribed] = useState(hasActiveSubscription());
  const [releaseType, setReleaseType] = useState(null);

  if (!subscribed) {
    return (
      <div className="min-h-screen bg-white py-5 px-2 font-display">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">Upload Release</h1>
          <p className="text-sm text-gray-500 mb-6">Create a release, add tracks, and deliver to DSPs worldwide.</p>
          <SubscriptionGate onSubscribed={() => setSubscribed(true)} />
        </div>
      </div>
    );
  }

  if (releaseType !== "audio") {
    return (
      <div className="min-h-screen bg-white py-5 px-2 font-display">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">Upload Release</h1>
          <p className="text-sm text-gray-500 mb-6">Choose the kind of release you want to create.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            <button
              type="button"
              onClick={() => setReleaseType("audio")}
              className="cursor-pointer text-left bg-white border-2 border-gray-200 hover:border-orange-400 rounded-3xl p-6 transition group"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition">
                <Music4 size={24} className="text-orange-500 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Audio Release</h3>
              <p className="text-sm text-gray-500">Upload singles, EPs and albums and deliver them to DSPs worldwide.</p>
              <span className="inline-block mt-4 text-sm font-bold text-orange-600">Start &rarr;</span>
            </button>

            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-6 cursor-not-allowed relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center mb-4">
                <Video size={24} className="text-gray-400" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-400">Video Release</h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full uppercase">
                  <Sparkles size={10} /> Coming soon
                </span>
              </div>
              <p className="text-sm text-gray-400">Video releases are not available yet — check back soon.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-5 px-2 font-display">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">Upload Audio Release</h1>
          <p className="text-sm text-gray-500">Release flow — release details, tracks, track details, cover art, review.</p>
        </div>
        <ReleaseWizard />
      </div>
    </div>
  );
};

export default UploadMusic;
