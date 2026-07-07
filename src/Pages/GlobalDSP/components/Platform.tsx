// src/pages/global-dsp/components/GlobalDspPlatformGrid.jsx
import { Radio, Download, Share2, Award, Activity } from "lucide-react";
import musicmap from "../../../assets/musicmap.png";
import spotify from "../../../assets/spotify.png";
import applemusic from "../../../assets/applemusic.png";
import amazonmusic from "../../../assets/amazonmusic.png";
import youtubemusic from "../../../assets/youtubemusic.png";
import tiktok from "../../../assets/tiktok.png";
import deezer from "../../../assets/deezer.png";
import tidal from "../../../assets/tidal.png";
import boomplay from "../../../assets/boomplay.png";
import audiomack from "../../../assets/audiomack.png";
import anghami from "../../../assets/anghami.png";
import jiosaavn from "../../../assets/jiosaavn.png";
import kkbox from "../../../assets/kkbox.png";
import facebook from "../../../assets/facebook.png";
import instagram from "../../../assets/instagram.png";
import snapchat from "../../../assets/snapchat.png";
import shazam from "../../../assets/shazam.png";

const platformLogoMap = {
  "spotify.png": spotify,
  "applemusic.png": applemusic,
  "amazonmusic.png": amazonmusic,
  "youtubemusic.png": youtubemusic,
  "tiktok.png": tiktok,
  "deezer.png": deezer,
  "tidal.png": tidal,
  "boomplay.png": boomplay,
  "audiomack.png": audiomack,
  "anghami.png": anghami,
  "jiosaavn.png": jiosaavn,
  "kkbox.png": kkbox,
  "facebook.png": facebook,
  "instagram.png": instagram,
  "snapchat.png": snapchat,
  "shazam.png": shazam,
};

const platformAssets = [
  { name: "Spotify", fileName: "spotify.png" },
  { name: "Apple Music", fileName: "applemusic.png" },
  { name: "Amazon Music", fileName: "amazonmusic.png" },
  { name: "YouTube Music", fileName: "youtubemusic.png" },
  { name: "TikTok", fileName: "tiktok.png" },
  { name: "Deezer", fileName: "deezer.png" },
  { name: "Tidal", fileName: "tidal.png" },
  { name: "Boomplay", fileName: "boomplay.png" },
  { name: "Audiomack", fileName: "audiomack.png" },
  { name: "Anghami", fileName: "anghami.png" },
  { name: "Jiosaavn", fileName: "jiosaavn.png" },
  { name: "KKBOX", fileName: "kkbox.png" },
  { name: "Facebook", fileName: "facebook.png" },
  { name: "Instagram", fileName: "instagram.png" },
  { name: "Snapchat", fileName: "snapchat.png" },
  { name: "Shazam", fileName: "shazam.png" }
];

export default function GlobalDspPlatformGrid() {
  return (
    <section className="bg-white w-full py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Header Block with Floating Map Layer Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Text Node Layout Columns */}
          <div className="lg:col-span-7 flex flex-col justify-center pt-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-[#FF6200]" />
              <span className="text-[#FF6200] text-xs font-black tracking-widest uppercase">
                Platforms
              </span>
            </div>
            
            <h2 className="text-[#111111] text-3xl sm:text-[40px] font-black tracking-tight leading-tight mb-5">
              Your Music. Everywhere
            </h2>
            
            <p className="text-gray-600 text-[15px] sm:text-base font-normal leading-relaxed max-w-xl">
              Reach listeners on various streaming platforms, downloads, socials, fitness and so many more platforms across the globe.
            </p>
          </div>

          {/* Right World Map Composition Graphic Viewport */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <img 
              src={musicmap} 
              alt="World geographic network distribution map" 
              className="w-full max-w-[380px] lg:max-w-[420px] object-contain pointer-events-none select-none"
            />
          </div>
        </div>

        {/* 4-Column Balanced Grid Matrix matching image_dda38a.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {platformAssets.map((platform, idx) => (
            <div 
              key={idx}
              className="bg-white border border-gray-100/80 rounded-xl h-[82px] px-6 sm:px-8 flex items-center justify-start gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.015)] hover:border-gray-200 transition-all duration-150 group"
            >
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <img 
                  src={platformLogoMap[platform.fileName]} 
                  alt={`${platform.name} branding logo`} 
                  className="w-full h-full object-contain select-none pointer-events-none"
                />
              </div>
              <span className="text-[#111111] font-bold text-base tracking-tight">
                {platform.name}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Shaded Counter Overview Wrap Label Card */}
        <div className="w-full bg-[#FAF6F4] rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          
          {/* Big Orange Summary Counter Metric */}
          <div className="text-[#FF6200] text-5xl sm:text-[52px] font-black tracking-tighter shrink-0 text-center sm:text-left select-none">
            +280
          </div>
          
          {/* Supporting Metadata Rows */}
          <div className="flex flex-col gap-4 w-full text-center sm:text-left">
            <div>
              <h3 className="text-black text-base font-black tracking-tight mb-1">
                More platforms worldwide
              </h3>
              <p className="text-gray-500 text-[13px] font-normal">
                Additional streaming, download, social, recognition, and fitness platforms worldwide.
              </p>
            </div>
            
            {/* Tag Badges Pill Cluster Container Row */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="bg-[#FCECE7] text-gray-800 font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-orange-100/20">
                <Radio size={12} className="text-[#FF6200]" /> Streaming
              </span>
              <span className="bg-[#FCECE7] text-gray-800 font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-orange-100/20">
                <Download size={12} className="text-[#FF6200]" /> Download
              </span>
              <span className="bg-[#FCECE7] text-gray-800 font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-orange-100/20">
                <Share2 size={12} className="text-[#FF6200]" /> Socials
              </span>
              <span className="bg-[#FCECE7] text-gray-800 font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-orange-100/20">
                <Award size={12} className="text-[#FF6200]" /> Recognition
              </span>
              <span className="bg-[#FCECE7] text-gray-800 font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-orange-100/20">
                <Activity size={12} className="text-[#FF6200]" /> Streaming
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}