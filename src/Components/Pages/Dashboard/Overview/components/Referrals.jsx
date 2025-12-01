import { Mail, Facebook, MessageCircle, Instagram } from 'lucide-react';

export default function ReferralDashboard() {
	return (
		<>
			<div className=" w-full max-w-7xl mx-auto p-6 rounded-3xl  border border-gray-100 overflow-hidden mt-8">
				<div className=" max-w-7xl">
					{/* Header */}
					<h1 className="mb-8 text-2xl font-semibold text-gray-800">Referrals</h1>

					{/* Referral Wallet Card */}
					<div className="mb-10 overflow-hidden rounded-3xl bg-white shadow-sm">
						<div className="bg-gray-50 px-8 py-10">
							{/* Title */}
							<p className="mb-2 text-sm font-medium text-orange-600">Referral wallet</p>

							{/* Amount */}
							<p className="mb-8 text-5xl font-bold text-gray-900">$3,500</p>

							{/* Chart Background */}
							<div className="relative h-48 w-full">
								<div className="absolute inset-0 rounded-2xl bg-orange-100 opacity-40"></div>

								{/* SVG Line Chart - Pixel Perfect Match */}
								<div className="relative w-full h-40 md:h-48 bg-linear-to-b from-orange-50/60 via-orange-50/20 to-transparent rounded-xl overflow-hidden">
									<svg
										viewBox="0 0 400 160"
										preserveAspectRatio="xMidYMid meet"
										className="absolute inset-0 w-full h-full"
									>
										<defs>
											{/* Soft downward orange glow under the line */}
											<linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
												<stop offset="0%" stopColor="#FB923C" stopOpacity="0.25" />
												<stop offset="40%" stopColor="#FB923C" stopOpacity="0.1" />
												<stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
											</linearGradient>
										</defs>

										{/* Area fill – drops softly below the line */}
										<path
											d="
        M 20 110
        Q 80 70, 120 75
        T 200 68
        Q 260 75, 300 90
        T 380 85
        L 380 160
        L 20 160
        Z
      "
											fill="url(#glowGradient)"
										/>

										{/* Clean orange line */}
										<path
											d="
        M 20 110
        Q 80 70, 120 75
        T 200 68
        Q 260 75, 300 90
        T 380 85
      "
											fill="none"
											stroke="#FB923C"
											strokeWidth="3.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>

										{/* Glowing dots */}
										{[20, 120, 200, 300, 380].map((x, i) => {
											const ys = [110, 75, 68, 90, 85];
											return (
												<g key={i}>
													<circle cx={x} cy={ys[i]} r="7" fill="#FB923C" opacity="0.3" />
													<circle cx={x} cy={ys[i]} r="4.5" fill="#FB923C" />
												</g>
											);
										})}
									</svg>

									{/* Optional: subtle month labels (remove if you want ultra-minimal) */}
									<div className="absolute inset-x-0 bottom-3 px-6">
										<div className="grid grid-cols-6 text-[10px] text-orange-600/60 font-medium text-center">
											<span>Feb</span>
											<span>Mar</span>
											<span>Apr</span>
											<span>May</span>
											<span>Jun</span>
											<span>Jul</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Invite by Email */}
					<div className="mb-8">
						<p className="mb-4 text-lg text-gray-800">
							Insert your friends email, send a link to join mayvibe, and earn referral bonuses
						</p>
						<div className="flex gap-3">
							<input
								type="email"
								placeholder="Email address"
								className="flex-1 rounded-full border-0 bg-gray-100 px-6 py-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-200"
							/>
							<button className="rounded-full bg-gray-100 p-4 text-white shadow-lg transition-transform hover:scale-105">
								<Mail className="h-6 w-6 text-orange-500" />
							</button>
						</div>
					</div>

					{/* Share Referral Link */}
					<div>
						<h2 className="mb-3 text-lg font-semibold text-gray-800">Share the referral link</h2>
						<p className="mb-5 text-gray-600">
							You can share your referral link by copying and sending it or sharing it on your social media
						</p>

						<div className="flex flex-col gap-4 sm:flex-row">
							{/* Link Box */}
							<div className="flex flex-1 items-center justify-between rounded-full bg-gray-100 px-6 py-4">
								<span className="truncate text-sm text-gray-700">
									mayvibe.com/referral=6075596504
								</span>
								<button className="ml-4 whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm font-medium text-orange-500 shadow-sm transition-colors hover:bg-orange-50">
									copy link
								</button>
							</div>

							{/* Social Buttons */}
							<div className="flex gap-3">
								<button className="rounded-full bg-gray-100 p-4 text-gray-600 transition-colors hover:bg-gray-200">
									<Facebook className="h-6 w-6 text-orange-500 rounded-full" />
								</button>
								<button className="rounded-full bg-gray-100 p-4 text-gray-600 transition-colors hover:bg-gray-200">
									<MessageCircle className="h-6 w-6  text-orange-500 rounded-full" />
								</button>
								<button className="rounded-full  p-4 bg-gray-100 shadow-lg">
									<Instagram className="h-6 w-6 text-orange-500 rounded-full" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}