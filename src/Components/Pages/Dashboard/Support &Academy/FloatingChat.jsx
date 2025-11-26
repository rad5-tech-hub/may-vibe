// src/components/support/FloatingChat.jsx
import { FaCommentDots } from 'react-icons/fa';

const FloatingChat = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white p-3 rounded-full shadow-2xl transition transform hover:scale-110">
        <FaCommentDots className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingChat;