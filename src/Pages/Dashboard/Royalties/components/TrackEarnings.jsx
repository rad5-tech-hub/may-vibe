// import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TrackEarnings() {
	return (


		<div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
			{/* Card Container */}
			<div className="px-6 pb-7">
				<h2 className="text-xl font-bold text-gray-900">Track Earnings</h2>
			</div>
			<div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-100 bg-gray-50">
								<th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
									Album Title
								</th>
								<th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
									Total Earnings ($)
								</th>
								<th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
									This Month($)
								</th>
								<th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
									ROC (%)
								</th>
								<th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
									DSP Earnings
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{/* Row 1 - UV Scuti */}
							<tr className="hover:bg-gray-50  border-b-2 border-orange-200  transition-colors">
								<td className="py-5 px-6 text-sm font-medium text-gray-900">UV Scuti</td>
								<td className="py-5 px-6 text-sm text-gray-700">1,003,123</td>
								<td className="py-5 px-6 text-sm text-gray-700">23,123</td>
								<td className="py-5 px-6">
									<div className="flex items-center gap-1.5">
										<TrendingUp className="w-4 h-4 text-green-600" />
										<span className="text-sm font-medium text-green-600">2.25%</span>
									</div>
								</td>
								<td className="py-5 px-6 text-sm text-gray-700">23,123</td>
							</tr>

							{/* Row 2 - Made In Lagos */}
							<tr className="hover:bg-gray-50 transition-colors border-b-2 border-orange-200">
								<td className="py-5 px-6 text-sm font-medium text-gray-900">Made In Lagos</td>
								<td className="py-5 px-6 text-sm text-gray-700">1,344,231</td>
								<td className="py-5 px-6 text-sm text-gray-700">4,231</td>
								<td className="py-5 px-6">
									<div className="flex items-center gap-1.5">
										<TrendingUp className="w-4 h-4 text-green-600" />
										<span className="text-sm font-medium text-green-600">2.25%</span>
									</div>
								</td>
								<td className="py-5 px-6 text-sm text-gray-700">23,123</td>
							</tr>

							{/* Row 3 - A Better Time */}
							<tr className="hover:bg-gray-50 transition-colors border-b-2 border-orange-200">
								<td className="py-5 px-6 text-sm font-medium text-gray-900 ">A Better Time</td>
								<td className="py-5 px-6 text-sm text-gray-700">1,344,231</td>
								<td className="py-5 px-6 text-sm text-gray-700">44,231</td>
								<td className="py-5 px-6">
									<div className="flex items-center gap-1.5">
										<TrendingDown className="w-4 h-4 text-red-600" />
										<span className="text-sm font-medium text-red-600">2.25%</span>
									</div>
								</td>
								<td className="py-5 px-6 text-sm text-gray-700">23,123</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Bottom Tabs */}
				<div className="px-6 py-4  border-t border-gray-100 hover:bg-gray-50 transition">
					<div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start ">
						<button className="px-4 py-2  text-sm font-medium text-gray-500 cursor-pointer  bg-gray-100 rounded-full hover:bg-gray-200  hover:text-gray-700 transition-colors">
							Custom
						</button>
						<button className="px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer  bg-gray-100 rounded-full hover:bg-gray-200  hover:text-gray-700 transition-colors">
							Yearly
						</button>
						<button className="px-5 py-2.5 bg-orange-500 text-white text-sm  font-medium cursor-pointer rounded-full hover:bg-orange-600 transition-colors shadow-sm">
							Monthly
						</button>
						<button className="px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer  bg-gray-100 rounded-full hover:bg-gray-200  hover:text-gray-700 transition-colors">
							Weekly
						</button>
						<button className="px-4 py-2 text-sm font-medium text-gray-500  bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer hover:text-gray-700 transition-colors">
							Daily
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}