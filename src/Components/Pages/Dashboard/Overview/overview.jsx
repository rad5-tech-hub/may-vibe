import StatCard from './components/StatsCard';
import MonthlyListenersChart from './components/MonthlyListeners';
import TopSongChart from './components/TopsongChart';
import TopAlbumChart from './components/TopAlbum';
import CurrentPlayingBar from './components/CurrentPlayingBar';
import UploadButton from './components/UploadButton';
import ProjectsSection from './components/ProjectSection';
import MyReleases from './components/Releases';
import Payouts from './components/Payouts';
import Royalties from './components/RoyaltiesSection';
import ReferralDashboard from './components/Referrals';

export default function Overview() {
  return (
    <div className="min-h-screen bg-white px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Overview</h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 ">
          <div className="flex flex-col">
            <StatCard
              title="Monthly Listeners"
              value="4.79 Million"
              change="+2.25%"
              changePositive={true}
              period="JULY 2025"
              hasDropdown={true}
              className="flex-1"
            >
              <MonthlyListenersChart />
            </StatCard>
          </div>

          <div className="xl:col-span-2 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StatCard
                title="Top Song"
                badge="#3"
                songTitle="God is good (ft. Donseih Beat)"
                plays="123,764,429"
              >
                <TopSongChart />
              </StatCard>

              <StatCard
                title="Top Album"
                badge="#2"
                albumTitle="5ive"
                plays="54,524,851"
              >
                <TopAlbumChart />
              </StatCard>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              <CurrentPlayingBar
                title="God is good (ft. Donseih Beat)"
                album="5ive"
                duration="2:40"
              />
              <UploadButton />
            </div>
          </div>
        </div>
          <ProjectsSection />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8'>
            <MyReleases/>
            <Payouts />
        </div>
          <Royalties />
          <ReferralDashboard/>
      </div>
    </div>
  );
}