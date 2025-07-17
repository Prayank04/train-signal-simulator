import React from "react";

// Helper for main line with label(s)
function MainLine({ x1, x2, y, labels }) {
  return (
    <>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="white" strokeWidth="0" />
      {labels.map(({ x, y: labelY, text, fontSize = 10 }, i) => (
        <text
          key={i}
          x={x}
          y={labelY}
          fill="yellow"
          fontSize={fontSize}
          fontFamily="Arial"
        >
          {text}
        </text>
      ))}
    </>
  );
}

// Helper for loop line with vertical ends and C-caps
function LoopLine({
  x1, x2, y, label, labelX, labelY, fontSize = 9,
  verticalEnds = [], cCaps = []
}) {
  return (
    <>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="white" strokeWidth="0" />
      <text x={labelX} y={labelY} fill="yellow" fontSize={fontSize} fontFamily="Arial">{label}</text>
      {verticalEnds.map(([vx, vy1, vy2], i) => (
        <line key={`ve${i}`} x1={vx} y1={vy1} x2={vx} y2={vy2} stroke="white" strokeWidth="2" />
      ))}
      {cCaps.map(([cx1, cy, cx2], i) => (
        <line key={`cc${i}`} x1={cx1} y1={cy} x2={cx2} y2={cy} stroke="white" strokeWidth="2" />
      ))}
    </>
  );
}
 function ExtraLine({ x1, x2, y, label, labelX, labelY, fontSize = 9, verticalEnds = [], cCaps = [] }) {
  return (
    <>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="white" strokeWidth="2" />
      <text x={labelX} y={labelY} fill="yellow" fontSize={fontSize} fontFamily="Arial">{label}</text>
      {verticalEnds.map(([vx, vy1, vy2], i) => (
        <line key={`ve${i}`} x1={vx} y1={vy1} x2={vx} y2={vy2} stroke="white" strokeWidth="2" />
      ))}
      {cCaps.map(([cx1, cy, cx2], i) => (
        <line key={`cc${i}`} x1={cx1} y1={cy} x2={cx2} y2={cy} stroke="white" strokeWidth="2" />
      ))}
    </>
  );
}

export { MainLine, LoopLine, ExtraLine };


