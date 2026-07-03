// src/pages/support/components/FaqAccordionSection.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqCategories = [
  { id: "distribution", label: "Distribution" },
  { id: "account-billing", label: "Account & Billing" },
  { id: "royalties", label: "Royalties" },
  { id: "release-issues", label: "Release Issues" },
  { id: "rights-compliance", label: "Rights & Compliance" },
  { id: "label-enterprise", label: "Label & Enterprise" },
];

const faqDataset = {
  "distribution": [
    {
      q: "How do I submit my first release on Mayvibe?",
      a: "Create your Mayvibe account, select your plan, then go to your dashboard and click \"New Release\". Upload your audio, artwork, and complete all metadata fields. Once submitted, our team reviews it and delivers it to your selected platforms."
    },
    {
      q: "How long does it take for my music to go live on platforms?",
      a: "Delivery typically takes 24–72 hours after approval, but we recommend submitting at least 7 days before your desired release date to account for platform ingestion times — especially for Spotify and Apple Music editorial pitching."
    },
    {
      q: "Which platforms does Mayvibe distribute to?",
      a: "Mayvibe distributes to 280+ platforms including Spotify, Apple Music, Amazon Music, YouTube Music, TikTok, Boomplay, Audiomack, TIDAL, Deezer, Anghami, JioSaavn, KKBOX, Facebook, Instagram, Snapchat, Shazam, and many more."
    },
    {
      q: "Can I schedule a release for a future date?",
      a: "Yes. Mayvibe supports advanced release scheduling. When submitting your release, set your preferred release date and time zone. Your music will be delivered to all platforms in time for that date."
    },
    {
      q: "Can I update or change my release after it goes live?",
      a: "Some metadata fields (like title, artist name, and ISRC) cannot be changed after delivery. Other fields like credits and liner notes may be updatable. Contact support with your release details and we will advise on what is possible."
    }
  ],
  "account-billing": [
    {
      q: "How do I upgrade or change my plan?",
      a: "Go to Settings → Subscription in your dashboard and select the plan you want to upgrade to. Changes take effect immediately and you will be charged a prorated amount for the remainder of your billing cycle."
    },
    {
      q: "Can I cancel my subscription at any time?",
      a: "Yes. You can cancel your subscription at any time from your account settings. Your plan remains active until the end of your current billing period. Note that cancelling may affect live releases — review our cancellation policy before proceeding."
    },
    {
      q: "How do I update my payment method?",
      a: "Go to Settings → Billing in your dashboard. You can add, remove, or update your payment method there. Changes apply to your next billing cycle automatically."
    }
  ],
  "royalties": [
    {
      q: "When and how do I get paid my royalties?",
      a: "Royalties are collected from platforms monthly and processed on a rolling basis. Payouts are made to your registered payment method once your earnings clear our minimum threshold. You can view your earnings in real time on your dashboard."
    },
    {
      q: "How do royalty splits work for collaborations?",
      a: "Mayvibe supports automated royalty split management. When setting up your release, you can define contributor percentages for artists, producers, and songwriters. Splits are automatically calculated and applied at the point of payout."
    },
    {
      q: "What currencies does Mayvibe pay in?",
      a: "Mayvibe supports multi-currency financial operations. Earnings can be held and paid in NGN, USD, EUR, GBP, and other supported currencies depending on your account setup and location."
    },
    {
      q: "Why are my streams showing but I haven't been paid?",
      a: "Platforms typically report and pay royalties 2–3 months after the streaming month ends. This delay is standard across all distributors. Your dashboard will show pending earnings with estimated payment dates."
    }
  ],
  "release-issues": [
    {
      q: "Why was my release rejected?",
      a: "Common reasons include incorrect or incomplete metadata, artwork that doesn't meet platform specs (minimum 3000×3000px, JPG or PNG), audio quality issues, or rights confirmation failures. You will receive a rejection reason — fix the flagged issue and resubmit."
    },
    {
      q: "My music is live but not appearing on a specific platform. What do I do?",
      a: "Check your release dashboard for per-platform delivery status. If a platform shows \"Delivered\" but the release isn't visible, it may still be in the platform's internal review queue. If it has been more than 5 business days, contact support with your release ID."
    },
    {
      q: "How do I take down a release from all platforms?",
      a: "Go to your release in the dashboard and select \"Request Takedown\". Full removal from all platforms typically takes 5–10 business days depending on each platform's processing time. Note that pending royalties will still be paid after takedown."
    }
  ],
  "rights-compliance": [
    {
      q: "Do I keep ownership of my music on Mayvibe?",
      a: "Yes. 100%. Mayvibe is a distribution platform — we do not claim any ownership of your masters or compositions. You retain full control and copyright of your music at all times."
    },
    {
      q: "Someone uploaded my music without my permission. What do I do?",
      a: "Contact our team immediately via the contact form below, selecting \"Rights & Copyright\" as the category. Include the infringing release details and proof of your ownership. We investigate all reports within 48 hours."
    },
    {
      q: "Does Mayvibe require AI content disclosure?",
      a: "Yes. In line with DSP requirements and industry standards, Mayvibe requires artists to disclose if a release contains AI-generated vocals, instrumentation, or content. This is part of our rights confirmation workflow during submission."
    },
    {
      q: "What happens if I get a copyright strike on a platform?",
      a: "We will notify you immediately. You may be required to provide proof of ownership or rights clearance. Mayvibe will assist in the dispute process where possible. Unresolved strikes may result in release removal per platform policy."
    }
  ],
  "label-enterprise": [
    {
      q: "How do enterprise support systems connect?",
      a: "Contact our team via the contact form below, selecting \"Label & Enterprise\" as the category. Include the complain or issue."
    }
  ]
};

type TabId = (typeof faqCategories)[number]["id"];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<TabId>("distribution");
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(0); // Default open first question as shown in layout snapshot

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setOpenAccordionIdx(null); // Reset layout closure
  };

  const toggleAccordion = (idx: number) => {
    setOpenAccordionIdx(openAccordionIdx === idx ? null : idx);
  };

  return (
    <section className="bg-white w-full py-20 px-6">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Upper Meta Heading Matrix */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">FAQ</span>
            <span className="w-5 h-0.5 bg-[#FF6200]" />
          </div>
          <h2 className="text-[#111111] text-4xl sm:text-[42px] font-black tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base font-normal max-w-xl">
            Find quick answers to the most common questions about Mayvibe.
          </p>
        </div>

        {/* Outer Tabbed Content Frame Viewport */}
        <div className="w-full bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Navigation Tab Column Links Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-1.5 w-full">
            {faqCategories.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full text-left font-bold text-sm px-4 py-3.5 rounded-xl transition duration-150 cursor-pointer ${
                    isActive 
                      ? "bg-[#FCEBE6] text-[#111111]" 
                      : "bg-transparent text-[#111111] hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Expandable Content Accordion Container Wrapper */}
          <div className="lg:col-span-9 w-full divide-y divide-gray-100">
            {faqDataset[activeTab]?.map((item, index) => {
              const isOpen = openAccordionIdx === index;
              return (
                <div key={index} className="w-full py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between text-left py-2 font-bold text-[15px] sm:text-base text-black tracking-tight hover:text-[#FF6200] group transition duration-150 cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <span className="text-black shrink-0 ml-4 group-hover:text-[#FF6200] transition-colors">
                      {isOpen ? <ChevronUp size={18} strokeWidth={2.5} /> : <ChevronDown size={18} strokeWidth={2.5} />}
                    </span>
                  </button>
                  
                  {/* Expandable viewport text element blocks */}
                  <div
                    className={`grid transition-all duration-200 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <p className="text-gray-600 text-sm font-normal leading-relaxed tracking-normal max-w-3xl pr-4">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}