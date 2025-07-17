import React from "react";

const TrackSection = ({
  sections,
  TSName,
  lineY,
  x1,
  x2,
  ratio = 0.5,
  textYOffset = -5,
  getTrackColor,
  fontSize = 9,
  fill = "#00bfff"
}) => {
  // Helper to resolve x value
  const resolveX = (val) => {
    if (typeof val === "number" && sections && sections[val]) {
      return sections[val].x;
    }
    return val; // direct x value
  };

  const resolvedX1 = resolveX(x1);
  const resolvedX2 = resolveX(x2);
  const textX = resolvedX1 + (resolvedX2 - resolvedX1) * ratio;

  return (
    <>
      <line
        x1={resolvedX1}
        y1={lineY}
        x2={resolvedX2}
        y2={lineY}
        stroke={getTrackColor(TSName)}
        strokeWidth="3"
      />
      <text
        x={textX}
        y={lineY + textYOffset}
        fill={fill}
        fontSize={fontSize}
        textAnchor="middle"
      >
        {TSName}
      </text>
    </>
  );
};

export default TrackSection;