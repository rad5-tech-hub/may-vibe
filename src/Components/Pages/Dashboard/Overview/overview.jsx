import StatsCard from "./components/StatsCard";
import NowPlayingCard from "./components/NowPlayingCard";
import UploadMusicCTA from "./components/UploadMusicCta";
import SectionHeader from "./components/SectionHeader";
import ProjectCard from "./components/ProjectCard";
import ReleaseRow from "./components/ReleaseRow";
import PayoutRow from "./components/PayoutRow";
import prop from 'prop-types';
const OverviewPage = ({ setCurrentPage }) => {
  const chartData = Array.from({ length: 30 }, () => Math.random() * 100);
  const royaltyData = Array.from({ length: 12 }, () => Math.random() * 100);

  const releases = [
    { song: "UY Scuti", artist: "Junior", date: "14/07/2025", duration: "3:34", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100" },
    { song: "Made in Lagos", artist: "Junior", date: "14/07/2025", duration: "2:08", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
    { song: "A Better Time", artist: "Junior", date: "14/07/2025", duration: "2:25", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    { song: "UY Scuti", artist: "Junior", date: "14/07/2025", duration: "3:34", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100" },
    { song: "Made in Lagos", artist: "Junior", date: "14/07/2025", duration: "2:08", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
    { song: "A Better Time", artist: "Junior", date: "14/07/2025", duration: "2:25", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
  ];

  const payouts = [
    { id: "MY1345", amount: 1000, date: "08/03/2022" },
    { id: "MY1345", amount: 2500, date: "09/03/2022" },
    { id: "MY1345", amount: 2300, date: "18/03/2022" },
    { id: "MY1345", amount: 1400, date: "20/03/2022" },
    { id: "MY1345", amount: 7000, date: "08/03/2022" },
    { id: "MY1345", amount: 3800, date: "09/03/2022" },
  ];

  const projects = [
    { image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300", title: "UY Scuti", artist: "Junior" },
    { image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300", title: "Made In Lagos", artist: "Junior" },
    { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300", title: "A Better Time", artist: "Junior" },
    { image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300", title: "Twice As Tall", artist: "Junior" },
    { image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300", title: "Rave & Roses", artist: "Junior" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <StatsCard 
            title="Monthly Listeners"
            value="4.79 Million"
            subtitle="↑ 2.25%"
            change={2.25}
            chart={chartData.slice(0, 15)}
          />
        </div>
        <StatsCard 
          title="Top Song"
          subtitle="Song: God is good (ft. Donseth Beat)"
          value="123,764,429"
          chart={chartData.slice(15, 22)}
        />
        <StatsCard 
          title="Top Album"
          subtitle="Album: Sive"
          value="54,524,851"
          chart={chartData.slice(22, 29)}
        />
      </div>

      {/* Now Playing & Upload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <NowPlayingCard 
          song="God is good (ft. Donseth Beat)"
          artist="Sive"
        />
        <UploadMusicCTA onClick={() => setCurrentPage('upload')} />
      </div>

      {/* Projects */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
        <SectionHeader title="Projects" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </div>

      {/* My Releases & Payouts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <SectionHeader title="My Releases" />
          <div className="space-y-1 sm:space-y-2">
            {releases.map((release, idx) => (
              <ReleaseRow key={idx} {...release} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <SectionHeader title="Payouts" />
          <div className="space-y-1 sm:space-y-2">
            {payouts.map((payout, idx) => (
              <PayoutRow key={idx} {...payout} />
            ))}
          </div>
        </div>
      </div>

      {/* Royalties */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
        <SectionHeader 
          title="Royalties"
          subtitle="Track the money you make from the music you release."
          action={
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
              Payment History
            </button>
          }
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Most Recent Payment</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">$24,092.75</p>
            <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
              Paid
            </button>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Next Payment (estimated)</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">$28,430.58</p>
            <p className="text-sm text-gray-500 mt-2">Payment to be made on: 23/09/2025</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-2">Last 12 Months</div>
        <div className="h-48 sm:h-64 flex items-end gap-1 sm:gap-2">
          {royaltyData.map((height, i) => (
            <div 
              key={i}
              className="flex-1 bg-orange-500 rounded-t hover:bg-orange-600 transition-colors cursor-pointer"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
// PropTypes Validation
OverviewPage.propTypes = {
  setCurrentPage: prop.func.isRequired,
};