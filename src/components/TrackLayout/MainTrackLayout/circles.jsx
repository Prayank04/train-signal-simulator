import React from "react";

const Circle = ({
  sections,
  CircleName,
  lineY,
  TextOutside = "",
  TextInside = "",
  x1,
  x2,
  ratio = 0.5,
  textYOffset = -10,
  circleRadius = 5,
  textColor = "#00bfff",
  circleFill = "#333333", // Changed default to #333333
  circleStroke = "white",
  strokeWidth = 1,
  fontSize = 9,
  insideFontSize = 8,
  insideFontWeight = "bold"
}) => {
  // Helper to resolve x value from sections or direct value
  const resolveX = (val) => {
    if (typeof val === "number" && sections && sections[val]) {
      return sections[val].x;
    }
    return val; // return direct x value if not using sections
  };

  const resolvedX1 = resolveX(x1);
  const resolvedX2 = resolveX(x2);
  const circleX = resolvedX1 + (resolvedX2 - resolvedX1) * ratio;

  return (
    <>
      {/* Circle element */}
      <circle
        cx={circleX}
        cy={lineY}
        r={circleRadius}
        fill={circleFill} // Now always uses the fill color (default #333333)
        stroke={circleStroke}
        strokeWidth={strokeWidth}
      />

      {/* Inner text (centered) */}
      {TextInside && (
        <text
          x={circleX}
          y={lineY + 0.5} // Slight vertical adjustment for perfect centering
          fill="white"
          fontSize={insideFontSize}
          fontWeight={insideFontWeight}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Arial, sans-serif"
        >
          {TextInside}
        </text>
      )}

      {/* Outer label text */}
      {TextOutside && (
        <text
          x={circleX}
          y={lineY + textYOffset}
          fill={textColor}
          fontSize={fontSize}
          textAnchor="middle"
        >
          {TextOutside}
        </text>
      )}
    </>
  );
};

export default Circle;