// src/pages/Notifications.jsx
import { FaCircle } from 'react-icons/fa';

const Notifications = () => {
  return (
    <div className="min-h-screen bg-white py-6 px-3 font-display">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-bold text-black mb-12">Notifications</h1>

        {/* Flex Layout: Notifications + Payouts side by side */}
        <div className="flex flex-col lg:flex-row justify-between gap-5">

          {/* LEFT: User + System Notifications */}
          <div className="space-y-10">

            {/* User Notifications */}
            <div className="flex-2 bg-gray-50 rounded-3xl shadow-sm overflow-hidden">
              <div className="px-4 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
              </div>

              <div className="divide-y divide-gray-100">
                {[
                  { type: 'success', text: 'Your song album titled "Morayo" has been approved', date: '11:11 AM, 08/10/2025' },
                  { type: 'milestone', text: 'Your album titled "A Better Time" just crossed 1M plays', date: '11:11 AM, 08/10/2025' },
                  { type: 'warning', text: 'DSP – Spotify has taken down your upload titled "Morayo"', date: '11:11 AM, 08/10/2025' },
                  { type: 'default', text: 'Your song album titled "Morayo" has been approved', date: '11:11 AM, 08/10/2025' },
                  { type: 'default', text: 'Your album titled "A Better Time" just crossed 1M plays', date: '11:11 AM, 08/10/2025' },
                  { type: 'default', text: 'DSP – Spotify has taken down your upload titled "Morayo"', date: '11:11 AM, 08/10/2025' },
                ].map((notif, i) => (
                  <div key={i} className="px-6 py-5 sm:px-8 sm:py-6 hover:bg-gray-50 transition">
                    <div className="flex flex-col lg:flex-row items-start gap-4">
                      <FaCircle
                        className={`w-3 h-3 mt-1.5 shrink-0 ${
                          notif.type === 'success' ? 'text-green-500' :
                          notif.type === 'milestone' ? 'text-orange-500' :
                          notif.type === 'warning' ? 'text-red-500' :
                          'text-gray-400'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-gray-900 ${notif.type === 'warning' ? 'text-red-600' : ''}`}>
                          {notif.text}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {notif.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Notifications */}
            <div className="bg-gray-50 rounded-3xl shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">System Notifications</h2>
              </div>

              <div className="divide-y divide-gray-100">
                {[
                  { type: 'update', text: 'New update to privacy policy', date: '11:11 AM, 08/10/2025' },
                  { type: 'maintenance', text: 'Scheduled system maintenance', date: '11:11 AM, 08/10/2025' },
                  { type: 'offer', text: '10% Discount offer for this month', date: '11:11 AM, 08/10/2025' },
                  { type: 'default', text: 'New DSPs now available', date: '11:11 AM, 08/10/2025' },
                  { type: 'default', text: 'DSP update — mayvibe is removing spotify from dsp list...', date: '11:11 AM, 08/10/2025' },
                  { type: 'default', text: 'You can now suggest DSPs you want to see on mayvibe...', date: '11:11 AM, 08/10/2025' },
                ].map((notif, i) => (
                  <div key={i} className="px-6 py-5 sm:px-8 sm:py-6 hover:bg-gray-50 transition">
                    <div className="flex flex-col lg:flex-row items-start gap-4">
                      <FaCircle
                        className={`w-3 h-3 mt-1.5 shrink-0 ${
                          notif.type === 'update' ? 'text-blue-500' :
                          notif.type === 'maintenance' ? 'text-purple-500' :
                          notif.type === 'offer' ? 'text-green-500' :
                          'text-gray-400'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{notif.text}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {notif.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Payouts */}
          <div>
            <div className="flex-1 bg-gray-50 rounded-3xl shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Payouts</h2>
              </div>

              <div className="divide-y divide-gray-100">
                {[
                  { status: 'failed', text: 'Payout request failed', date: '08/03/2022' },
                  { status: 'pending', text: 'Payout request pending', date: '08/03/2022' },
                  { status: 'success', text: 'Payout request success', date: '08/03/2022' },
                  { status: 'success', text: 'Payout request success', date: '08/03/2022' },
                  { status: 'pending', text: 'Payout request pending', date: '08/03/2022' },
                  { status: 'failed', text: 'Payout request failed', date: '08/03/2022' },
                ].map((payout, i) => (
                  <div key={i} className="px-6 py-5 sm:px-8 sm:py-6 hover:bg-gray-50 transition">
                    <div className="flex flex-col lg:flex-row items-start gap-4">
                      <FaCircle
                        className={`w-3 h-3 mt-1.5 shrink-0 ${
                          payout.status === 'success' ? 'text-green-500' :
                          payout.status === 'failed' ? 'text-red-500' :
                          'text-orange-500'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${
                          payout.status === 'success' ? 'text-green-600' :
                          payout.status === 'failed' ? 'text-red-600' :
                          'text-orange-600'
                        }`}>
                          {payout.text}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {payout.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;