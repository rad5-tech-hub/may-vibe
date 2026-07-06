import { useNavigate } from "react-router-dom";

export default function FooterLinks() {
  const navigate = useNavigate();

  const pillsRow1 = [
    { name: "Academy", path: "/academy" },
    { name: "Blog", path: "/blog" },
    { name: "Support / Contact", path: "/contact" },
  ];
  const pillsRow2 = [
    { name: "FAQ", path: "/contact#faq" },
    { name: "Mayvibe store", path: "/store" },
  ];

  return (
    <section className="bg-white py-16 px-6 text-center select-none">
      {/* Row 1 Links */}
      <div className="flex justify-center gap-4 flex-wrap">
        {pillsRow1.map((pill) => (
          <button
            key={pill.name}
            onClick={() => navigate(pill.path)}
            className="border border-[#FF6200] bg-[#FFF0EB] rounded-full px-8 py-3.5 text-base font-medium text-black hover:opacity-90 transition duration-200 cursor-pointer"
          >
            {pill.name}
          </button>
        ))}
      </div>

      {/* Row 2 Links */}
      <div className="mt-4 flex justify-center gap-4 flex-wrap">
        {pillsRow2.map((pill) => (
          <button
            key={pill.name}
            onClick={() => navigate(pill.path)}
            className="border border-[#FF6200] bg-[#FFF0EB] rounded-full px-8 py-3.5 text-base font-medium text-black hover:opacity-90 transition duration-200 cursor-pointer"
          >
            {pill.name}
          </button>
        ))}
      </div>

      {/* Blockquote Segment */}
      <p className="mt-14 text-[#222222] text-lg md:text-xl max-w-[720px] mx-auto font-normal leading-relaxed tracking-tight px-4">
        “Music is your own experience, your thoughts, your wisdom. If you don’t live it, it won’t come out of your horn.”
      </p>
    </section>
  );
}
