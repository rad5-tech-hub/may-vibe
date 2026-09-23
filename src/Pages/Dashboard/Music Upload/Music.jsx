import { useSearchParams } from "react-router-dom";
import AlbumsTab from "./components/AlbumsTab";
import TracksTab from "./components/TracksTab";

const UploadMusic = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "tracks" ? "tracks" : "albums";

  const setTab = (next) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", next);
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="min-h-screen bg-white py-5 px-2 font-display">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">Upload Music</h1>
        <p className="text-sm text-gray-500 mb-6">Create albums, then add tracks. Release is the final step — tentative flow.</p>

        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-2xl w-fit">
          <button onClick={() => setTab("albums")} className={`cursor-pointer px-6 py-2.5 rounded-xl text-sm font-semibold transition ${tab === "albums" ? "bg-orange-500 text-white shadow" : "text-gray-600 hover:text-gray-900"}`}>Albums</button>
          <button onClick={() => setTab("tracks")} className={`cursor-pointer px-6 py-2.5 rounded-xl text-sm font-semibold transition ${tab === "tracks" ? "bg-orange-500 text-white shadow" : "text-gray-600 hover:text-gray-900"}`}>Tracks</button>
        </div>

        {tab === "albums" ? <AlbumsTab /> : <TracksTab />}
      </div>
    </div>
  );
};

export default UploadMusic;
