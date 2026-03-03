import HeroImage from "../../../../assets/HeroImage.png";
import Sub1 from '../../../../assets/Subscribers1.png';
import Sub2 from '../../../../assets/Subscribers2.png';
import Sub3 from '../../../../assets/Subscribers3.png';
import musicWave from '../../../../assets/music wave 1.png';
export default function Hero() {
	return (
		<section className="relative overflow-hidden bg-orange-50  pt-28 pb-16 md:pt-32 md:pb-24">
			<div className="max-w-7xl mx-auto px-6 md:px-8">
				<div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* Left Content */}
					<div className="space-y-8 order-2 md:order-1">
						<h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-normal leading-normal md:leading-tight lg:leading-tight">
							Music is power
							<br />
							<span className="text-orange-600">Amplify it</span>
						</h1>

						<p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida pellentesque lorem convallis blandum. Integer a felis est. Fusce finibus.
						</p>

						{/* CTA + Social Proof */}
						<div className="space-y-8">
							<button className="px-9 py-4 bg-orange-600 text-white text-lg font-semibold rounded-full hover:bg-orange-700 transition shadow-lg hover:shadow-xl cursor-pointer">
								Join Mayvibe
							</button>

							<div className="flex items-center gap-4">
								<div className="flex -space-x-3">
									<img src={Sub1} alt="Subscriber" className="w-12 h-12 rounded-full border-4 border-white shadow-md" />
									<img src={Sub2} alt="Subscriber" className="w-12 h-12 rounded-full border-4 border-white shadow-md" />
									<img src={Sub3} alt="Subscriber" className="w-12 h-12 rounded-full border-4 border-white shadow-md" />
								</div>
								<div>
									<p className="font-semibold text-gray-800">20K +</p>
									<p className="text-sm text-gray-500">Active Subscribers</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right Image + Wave */}
					<div className="relative order-1 md:order-2 flex justify-center md:justify-end">
						<img
							src={HeroImage}
							alt="Artist"
							className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl rounded-3xl  shadow-2xl md:shadow-none object-cover"
						/>

							<div className="absolute -bottom-8 md:-bottom-9 left-1  -translate-x-1/2 hidden  md:block">
								<img src={musicWave} alt="Music Wave" className=' max-w-2xs  lg:max-w ' />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}