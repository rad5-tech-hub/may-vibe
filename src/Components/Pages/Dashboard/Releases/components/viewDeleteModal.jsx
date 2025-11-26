// import React from "react";
import { Trash2 } from "lucide-react";
import { PropTypes } from 'prop-types';
export default function DeleteReleaseModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
          <Trash2 className="w-10 h-10 text-orange-600" />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Are you sure you want to delete this release?
        </h3>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-full transition"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

// prop types validation 