// import React from 'react';
import { Search } from 'lucide-react';

export default function EarningsByCountryUpdated() {
	return (
		<div className="w-full max-w-7xl p-4 sm:p-6">
			{/* Main Card */}
			<div className=" pt-2">
				<h3 className="text-2xl font-bold mb-5">Earnings By Country</h3>
			</div>

			<div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-auto">

				{/* Table Header */}
				<div className="bg-gray-50/70 border-b border-gray-200 px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-32 lg:gap-48"> {/* Controls spacing */}
							<span className="text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
								Country
							</span>
							<span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
								Earnings
							</span>
						</div>
						<button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
							<Search className="w-4 h-4 text-gray-400" />
						</button>
					</div>
				</div>

				{/* Country Rows - Perfectly Aligned */}
				<div className="">
					{/* Niger */}
					<div className="px-6 py-5 flex items-center justify-between border-b-2 border-orange-200 hover:bg-gray-50 transition">
						<span className="text-sm font-medium text-gray-900 w-32">Niger</span>
						<span className="text-sm text-gray-700 font-medium text-right flex-1 mr-32">
							23,123
						</span>
					</div>

					{/* Nigeria */}
					<div className="px-6 py-5 flex items-center justify-between border-b-2 border-orange-200 hover:bg-gray-50 transition">
						<span className="text-sm font-medium text-gray-900 w-32">Nigeria</span>
						<span className="text-sm text-gray-700 font-medium text-right flex-1 mr-32">
							4,231
						</span>
					</div>
					{/* Nigeria */}
					<div className="px-6 py-5 flex items-center justify-between border-b-2 border-orange-200 hover:bg-gray-50 transition">
						<span className="text-sm font-medium text-gray-900 w-32">Nigeria</span>
						<span className="text-sm text-gray-700 font-medium text-right flex-1 mr-32">
							4,231
						</span>
					</div>

					{/* Malawi */}
					<div className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition border-b-2 border-orange-200">
						<span className="text-sm font-medium text-gray-900 w-32">Malawi</span>
						<span className="text-sm text-gray-700 font-medium text-right flex-1 mr-32">
							44,231
						</span>
					</div>
				</div>

				{/* Bottom Scroll Indicator */}
				<div className="flex justify-center py-4 border-t border-orange-200 cursor-pointer hover:bg-gray-50 transition">
					<div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center shadow-inner">
						<div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
					</div>
				</div>
			</div>
		</div>
	);
}