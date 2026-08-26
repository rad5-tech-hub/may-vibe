import { ArrowUpRight, Music2, Users, Wallet } from "lucide-react";
import { useLocation } from "react-router-dom";

const stats = [
  { label: "Total artists", value: "12,480", change: "+8.2%", icon: Users },
  { label: "Active releases", value: "3,842", change: "+12.4%", icon: Music2 },
  { label: "Platform earnings", value: "$84,290", change: "+5.7%", icon: Wallet },
];

const recentArtists = [
  { name: "Amara Okafor", email: "amara@example.com", status: "Verified", joined: "Today" },
  { name: "Kofi Mensah", email: "kofi@example.com", status: "Pending", joined: "Yesterday" },
  { name: "Lina Adeyemi", email: "lina@example.com", status: "Verified", joined: "Aug 20, 2026" },
];

const Overview = () => {
  const location = useLocation();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8"><p className="mb-2 text-sm font-medium text-orange-500">Overview</p><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Good morning, Admin</h1><p className="mt-2 text-sm text-gray-500">Here is what is happening across Mayvibe today.</p></div>
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map(({ label, value, change, icon: Icon }) => <div key={label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div className="rounded-xl bg-orange-50 p-3 text-orange-500"><Icon size={21} /></div><span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">{change}<ArrowUpRight size={14} /></span></div><p className="mt-6 text-sm text-gray-500">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>)}
      </div>
      <section className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-bold">Recent artists</h2><p className="mt-1 text-sm text-gray-500">New accounts requiring attention</p></div><button type="button" className="cursor-pointer text-sm font-semibold text-orange-500 hover:text-orange-600">View all</button></div><div className="overflow-x-auto"><table className="w-full min-w-[580px] text-left text-sm"><thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400"><tr><th className="pb-3 font-medium">Artist</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Joined</th></tr></thead><tbody>{recentArtists.map((artist) => <tr key={artist.email} className="border-b border-gray-50 last:border-0"><td className="py-4"><p className="font-semibold">{artist.name}</p><p className="mt-1 text-xs text-gray-400">{artist.email}</p></td><td className="py-4"><span className={`rounded-full px-3 py-1 text-xs font-medium ${artist.status === "Verified" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}>{artist.status}</span></td><td className="py-4 text-gray-500">{artist.joined}</td></tr>)}</tbody></table></div></section>
    </div>
  );
};

export default Overview;
