
// Reusable Bar Chart Component (your Monthly Listeners style)
function MonthlyListenersChart() {
  const bars = [
    120, 180, 240, 310, 390, 470, 550, 630, 700, 760, 810, 850, 880, 900, 870,
    830, 780, 720, 660, 600, 550, 510, 480, 500, 530, 570, 620, 680, 740, 800,
  ];

  const max = Math.max(...bars);
  const scale = 320 / max;

  return (
    <div className="h-80 flex items-end justify-between gap-0.5 px-1 pt-4 -mx-1">
      {bars.map((height, i) => (
        <div
          key={i}
          className="flex-1 bg-orange-500 rounded-t-md transition-all duration-700 hover:bg-orange-600 hover:scale-y-105 origin-bottom"
          style={{
            height: `${height * scale}px`,
            transitionDelay: `${i * 10}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default MonthlyListenersChart;