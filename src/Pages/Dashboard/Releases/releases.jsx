import AnalyticsDashboard from './components/Analytics'
import MyReleases from './components/ReleaseStats'
const releases = () => {
  return (
  <div className='  min-h-screen bg-white px-6 py-4'> 
        <MyReleases />
        <AnalyticsDashboard />
</div>
  )
}

export default releases