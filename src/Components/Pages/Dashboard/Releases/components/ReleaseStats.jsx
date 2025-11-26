import { useState } from "react";
import { Play, MoreVertical, Edit, Eye, Trash2 } from "lucide-react";

// Import your local images
import Image1 from "../../../../../assets/Subscribers1.png";
import Image2 from "../../../../../assets/Subscribers2.png";
import Image3 from "../../../../../assets/Subscribers3.png";

// Import the modals
import EditReleaseModal from "./editRelease";
import ViewReleaseModal from "./ViewReleaseModal";
import DeleteReleaseModal from "./viewDeleteModal";

// Sample data
const releases = [
  { title: "UY Scuti", artist: "Junior", status: "draft", streams: 0, revenue: 0 },
  { title: "Made In Lagos", artist: "Junior", status: "pending", streams: 0, revenue: 0 },
  { title: "A Better Time", artist: "Junior", status: "rejected", streams: 0, revenue: 0 },
  { title: "UY Scuti", artist: "Junior", status: "live", streams: 1003123, revenue: 139.12 },
  { title: "Made In Lagos", artist: "Junior", status: "live", streams: 1344231, revenue: 208 },
  { title: "A Better Time", artist: "Junior", status: "live", streams: 1344231, revenue: 225 },
];

const albumCovers = [
  "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  Image1,
  Image2,
  Image3,
  Image1,
];

export default function MyReleases() {
  const [openMenu, setOpenMenu] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState(null);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "draft":    return "bg-gray-100 text-gray-700 border border-gray-300";
      case "pending":  return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "rejected": return "bg-red-100 text-red-700 border border-red-300";
      case "live":     return "bg-green-100 text-green-700 border border-green-300";
      default:         return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const handleEdit = (release) => {
    setSelectedRelease({
      ...release,
      cover: albumCovers[releases.indexOf(release) % albumCovers.length],
    });
    setEditModalOpen(true);
    setOpenMenu(null);
  };

  const handleView = () => {
    setViewModalOpen(true);
    setOpenMenu(null);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
    setOpenMenu(null);
  };

  return (
    <>
      <section className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">My Releases</h2>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 px-8 py-5 border-b border-gray-200 text-sm font-medium text-gray-600">
            <div>Song Title</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Streams</div>
            <div className="col-span-2 text-center">Revenue ($)</div>
            <div className="col-span-1" />
          </div>

          {/* Rows */}
          {releases.map((item, i) => (
            <div key={i} className="border-t border-gray-100 first:border-t-0">
              <div className="p-4 sm:p-6 lg:px-8 lg:py-5 hover:bg-orange-50/30 transition-colors group">

                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white shadow-md flex-shrink-0">
                        <img src={albumCovers[i]} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.artist}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2.5 hover:bg-orange-100 rounded-full transition-colors">
                        <Play className="w-5 h-5 text-gray-700" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === i ? null : i)}
                          className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>

                        {openMenu === i && (
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                            <button
                              onClick={() => handleEdit(item)}
                              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 flex items-center gap-3"
                            >
                              <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button
                              onClick={handleView}
                              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 flex items-center gap-3"
                            >
                              <Eye className="w-4 h-4" /> View
                            </button>
                            <button
                              onClick={handleDelete}
                              className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Status</p>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Streams</p>
                      <p className="font-medium text-gray-900">
                        {item.streams.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Revenue</p>
                      <p className="font-medium text-gray-900">
                        ${item.revenue.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-center">
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                      <img src={albumCovers[i]} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.artist}</div>
                    </div>
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>

                  <div className="col-span-2 text-center text-sm font-medium text-gray-700">
                    {item.streams.toLocaleString()}
                  </div>

                  <div className="col-span-2 text-center text-sm font-medium text-gray-700">
                    ${item.revenue.toFixed(2)}
                  </div>

                  <div className="col-span-1 flex justify-center gap-3">
                    <button className="p-2 hover:bg-orange-100 rounded-full transition-colors">
                      <Play className="w-4 h-4 text-gray-700" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === i ? null : i)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>

                      {openMenu === i && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                          <button
                            onClick={() => handleEdit(item)}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 flex items-center gap-3"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={handleView}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 flex items-center gap-3"
                          >
                            <Eye className="w-4 h-4" /> View
                          </button>
                          <button
                            onClick={handleDelete}
                            className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Orange Divider (Desktop Only) */}
              {i < releases.length - 1 && (
                <div className="hidden lg:block h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent mx-8" />
              )}
            </div>
          ))}
        </div>

        {/* Click outside to close menu */}
        {openMenu !== null && (
          <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
        )}
      </section>

      {/* MODALS */}
      <EditReleaseModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        release={selectedRelease || releases[0]}
      />

      <ViewReleaseModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />

      <DeleteReleaseModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          alert("Release successfully deleted!");
          setDeleteModalOpen(false);
        }}
      />
    </>
  );
}