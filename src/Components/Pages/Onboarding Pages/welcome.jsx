import { useState } from 'react';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import '../../../index.css';
import img from '../../../assets/Frame.png';

const Welcome = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <>
      {/* STEP 1 - Welcome */}
      {step === 1 && (
        <div className="min-h-screen welcome font-display h-screen flex flex-col items-center justify-end lg:justify-center p-6 text-center text-white">
          <h1 className="max-w-5xl mx-auto text-4xl lg:text-[128px] font-bold leading-tight">
            Welcome to <span className="text-orange-500">Mayvibe</span>
          </h1>

          <p className="mt-3 text-gray-200 text-xs md:text-sm max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum ligula metus,
            ut rhoncus metus ornare quis. Donec eleifend varius orci, et lobortis augue.
          </p>

          <button
            onClick={nextStep}
            className="mt-8 bg-orange-500 hover:bg-orange-600 px-10 py-3 text-xl font-semibold flex items-center gap-4 transition-all cursor-pointer"
          >
            Get Started
          </button>

          <div className="absolute bottom-2 flex gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <div className="w-3 h-3 bg-white/40 rounded-full" />
            <div className="w-3 h-3 bg-white/40 rounded-full" />
          </div>
        </div>
      )}

      {/* STEP 2 - 3-Step Guide */}
      {step === 2 && (
        <div className="min-h-screen font-display bg-white flex flex-col items-center justify-center p-6 text-gray-900">
          <div className="w-full max-w-4xl space-y-12">

            {/* Video Card */}
            <div className="relative rounded-3xl overflow shadow-2xl">
              <div className="bg-linear-to-r from-red-700 via-orange-600 to-orange-500 aspect-video flex items-center justify-center">
                <div className="w-28 h-28 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/35 transition-all duration-300">
                  <FaPlay className="w-14 h-14 text-white ml-3" />
                </div>
              </div>
              <p className="absolute top-6 left-8 text-white text-sm font-medium">
                Watch quick tutorial for your three step guide to start earning: 3-step guide (Upload → Distribute → Earn)
              </p>
            </div>

            {/* 3-STEP GUIDE Label */}
            <div className="text-center">
              <span className="inline-block px-8 py-3 border-2 border-orange-500 text-orange-500 font-bold text-lg rounded-full">
                3-STEP GUIDE
              </span>
            </div>

            {/* Upload → Distribute → Earn Flow */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 text-center">
              {/* Upload */}
              <div>
                <h3 className="text-2xl font-bold mb-2">Upload</h3>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block font-bold">             
                <FaArrowRight className='w-5 h-5 font-bold' />
              </div>

              {/* Distribute */}
              <div>
                <h3 className="text-2xl font-bold mb-2">Distribute</h3>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block font-bold">
                <FaArrowRight className='w-5 h-5 font-bold' />
              </div>

              {/* Earn */}
              <div>
                <h3 className="text-2xl font-bold mb-2">Earn</h3>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.
                </p>
              </div>
            </div>

            {/* Swipe Button */}
            <div className="text-center">
              <button
                onClick={nextStep}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl px-16 py-3 cursor-pointer transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Swipe
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom left-1/2 -translate-x-1/2 flex gap-3">
              <div className="w-3 h-3 bg-gray-400 rounded-full" />
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
              <div className="w-3 h-3 bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 - Profile Setup */}
      {step === 3 && (
        <div className="min-h-screen login flex items-center justify-center px-6 text-white">
          <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center p-5">

            {/* Left Side */}
            <div className="text-center md:text-left">
              <div className="w-64 h-64 mx-auto md:mx-0 rounded-full overflow-hidden shadow-2xl">
                <img
                  src={img}
                  alt="Artist"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="mt-10 text-2xl lg:text-4xl md:text-5xl font-bold">Let&apos;s get you set up</h2>
              <p className="mt-4 text-gray-200 text-sm lg:text-lg max-w-md">
                Complete your profile to start uploading and earning on Mayvibe.
              </p>

              <button className="hidden mt-8 w-14 h-14 bg-orange-600 rounded-full lg:flex items-center justify-center hover:bg-orange-500 transition shadow-lg">
                <FaArrowRight className="w-7 h-7" />
              </button>
            </div>

            {/* Right Side - Form */}
            <div className="space-y-10">
              <h3 className="text-4xl font-bold text-center md:text-left">Profile</h3>

              <div>
                <label className="block text-gray-300 mb-2">Artist Bio</label>
                <textarea
                  rows="4"
                  placeholder="Tell us about yourself..."
                  className="w-full bg-black/10 backdrop-blur-sm border-b-2 border-gray-500 focus:border-orange-500 outline-none py-3 px-1 text-white placeholder-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Genre</label>
                <input
                  type="text"
                  placeholder="e.g. Afrobeat, Hip-Hop, R&B"
                  className="w-full bg-black/10 backdrop-blur-sm border-b-2 border-gray-500 focus:border-orange-500 outline-none py-3 px-1 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Payment Method</label>
                <input
                  type="text"
                  placeholder="Connect PayPal or Bank"
                  className="w-full bg-black/10 backdrop-blur-sm border-b-2 border-gray-500 focus:border-orange-500 outline-none py-3 px-1 text-white placeholder-gray-400"
                />
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  onClick={prevStep}
                  className="px-8 py-3 border cursor-pointer border-gray-500 rounded-lg hover:bg-white/10 transition"
                >
                  Back
                </button>
                <button className="px-10 py-3 cursor-pointer bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition shadow-lg">
                  <a href='/dashboard'>
                  Save
                  </a>
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="hidden absolute bottom-2 lg:flex gap-3">
            <div className="w-3 h-3 bg-white/40 rounded-full" />
            <div className="w-3 h-3 bg-white/40 rounded-full" />
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;