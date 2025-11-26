import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    "How long does it take to verify an upload?",
    "How long does it take to verify an upload?",
    "How long does it take to verify an upload?",
    "How long does it take to verify an upload?",
    "How long does it take to verify an upload?",
    "How long does it take to verify an upload?",
    "How long does it take to verify an upload?",
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-black mb-6">Frequently Asked questions</h3>

      <div className="space-y-4">
        {faqs.map((question, i) => (
          <div key={i} className="border-b border-gray-200 pb-4">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left flex cursor-pointer items-center justify-between py-3 text-gray-700 hover:text-gray-900 transition-opacity"
            >
              <span className="font-medium">{question}</span>
              <FaChevronDown className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <p className="text-gray-600 mt-3 pr-8">
                It takes approximately 24hrs, but it may take longer if your upload is above 10 songs or has an issue.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;