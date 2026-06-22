import { useState, useEffect } from 'react';

export default function MonthlyListenersChart() {
  // 5 stunning growth patterns (all auto-scaled to fit perfectly)
  const growthPatterns = [
    // 1. Steady massive climb
    [
      100, 140, 180, 220, 260, 300, 340, 380,
      410, 435, 455, 470, 485, 500, 515, 530,
      540, 535, 525, 510, 495, 480, 465, 475,
      495, 520, 550, 585, 620, 660, 700, 750
    ],
    // 2. Viral explosion (recent spike)
    [
       80,  85,  90,  95, 100, 110, 120, 135,
      150, 180, 220, 280, 350, 430, 520, 620,
      720, 810, 880, 940, 990, 1030, 1060, 1080,
      1100, 1130, 1170, 1220, 1280, 1350, 1430, 1520
    ],
    // 3. Peak in the middle (one huge viral month)
    [
      120, 180, 240, 310, 390, 470, 550, 630,
      700, 760, 810, 850, 880, 900, 870, 830,
      780, 720, 660, 600, 550, 510, 480, 500,
      530, 570, 620, 680, 740, 800, 860, 920
    ],
    // 4. Current hot streak (sharp rise at the end)
    [
       70,  75,  85, 100, 120, 145, 175, 210,
      250, 300, 360, 430, 500, 570, 640, 710,
      780, 840, 890, 930, 960, 985, 1000, 1010,
      1040, 1080, 1130, 1190, 1260, 1340, 1430, 1550
    ],
    // 5. Smooth monster growth (consistent upward curve)
    [
      110, 155, 200, 245, 290, 335, 380, 425,
      465, 500, 530, 555, 575, 590, 600, 605,
      600, 595, 585, 570, 550, 525, 495, 510,
      540, 580, 630, 690, 760, 840, 930, 1030
    ]
  ];

  const [patternIndex, setPatternIndex] = useState(0);

  // Auto-cycle every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPatternIndex((prev) => (prev + 1) % growthPatterns.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Current data + auto-scaling
  const rawHeights = growthPatterns[patternIndex];
  const MAX_BAR_HEIGHT = 360; // Max visible height (safe inside h-86)
  const maxRaw = Math.max(...rawHeights);
  const scale = MAX_BAR_HEIGHT / maxRaw;
  const barHeights = rawHeights.map(h => h * scale);

  return (
    <div className="h-86 flex items-end justify-between gap-0.5 px-1 pt-4 -mx-1">
      {barHeights.map((height, index) => (
        <div
          key={index}
          className="flex-1 bg-orange-500 rounded-t-md transition-all duration-1000 ease-out hover:bg-orange-600 hover:scale-y-110 origin-bottom shadow-sm"
          style={{ 
            height: `${height}px`,
            transitionDelay: `${index * 15}ms`
          }}
        />
      ))}
    </div>
  );
}