import Royalties from '../Overview/components/RoyaltiesSection.jsx';
import Payouts from '../Overview/components/Payouts.jsx';
import TrackEarnings from './components/TrackEarnings.jsx';
import DSPEarningsTable from './components/TrackDspEarning.jsx';
import EarningsByCountry from './components/EarningsByCountry.jsx';
const RoyaltiesPage = () => {
  return (
    <div>
      <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-4 mx-8'>Royalties</h2>
      <Royalties />
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div><Payouts /></div>
        <div><TrackEarnings /></div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div><EarningsByCountry /></div>
        <div><DSPEarningsTable /></div>
      </div>
    </div>
  )
}

export default RoyaltiesPage