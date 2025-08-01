import React from "react";

// BreakOverlay replicates the original up/down stripe + circle logic
const BreakOverlay = ({
  breakBetween,
  lineY,
  direction = "up",        // "up" or "down"
  breakLengthRatio = 0.07,
  slantedLineRatio = 1,
  liftHeight = 12,
  stripeOffset = 8,
  circleOffset = 18,
  stripeSpacing = 4,
  stripeLength = 8,
  scale = 1,
}) => {
  if (!breakBetween) return null;

  const { xStart, xEnd, ratio: br = 0.5 } = breakBetween;
  const w = xEnd - xStart;
  const breakLen = w * breakLengthRatio * scale;
  const centerX = xStart + br * w;

  // break segment endpoints
  const breakX1 = centerX - breakLen / 2;
  const breakX2 = centerX + breakLen / 2;

  // lifted (slanted) line
  const slLen = breakLen * slantedLineRatio;
  const liftedX1 = direction === "up" ? breakX1 : breakX2;
  const liftedY1 = lineY;
  const liftedX2 = direction === "up" ? breakX1 + slLen : breakX2 - slLen;
  const liftedY2 = direction === "up"
    ? lineY - liftHeight * scale
    : lineY + liftHeight * scale;

  // unit vectors
  const dx = liftedX2 - liftedX1;
  const dy = liftedY2 - liftedY1;
  const lineLen = Math.hypot(dx, dy);
  const ux = dx / lineLen;
  const uy = dy / lineLen;

  // perpendicular vector
  const perpX = -uy;
  const perpY = ux;

  // stripe midpoint
  const stripeMidX = (liftedX1 + liftedX2) / 2;
  const stripeMidY = (liftedY1 + liftedY2) / 2;

  // original up/down offset logic
  let stripeBaseX, stripeBaseY;
  if (direction === "up") {
    stripeBaseX = stripeMidX - perpX * stripeOffset;
    stripeBaseY = stripeMidY - perpY * stripeOffset;
  } else {
    const downwardPerpX = perpX * (perpY > 0 ? 1 : -1);
    const downwardPerpY = Math.abs(perpY);
    stripeBaseX = stripeMidX + downwardPerpX * stripeOffset;
    stripeBaseY = stripeMidY + downwardPerpY * stripeOffset;
  }

  // circle offset
  let circleX, circleY;
  if (direction === "up") {
    circleX = stripeMidX - perpX * circleOffset;
    circleY = stripeMidY - perpY * circleOffset;
  } else {
    const downwardPerpX = perpX * (perpY > 0 ? 1 : -1);
    const downwardPerpY = Math.abs(perpY);
    circleX = stripeMidX + downwardPerpX * circleOffset;
    circleY = stripeMidY + downwardPerpY * circleOffset;
  }

  // stripe creation
  const stripeAngle = Math.atan2(perpY, perpX);
  const createStripe = (offset, idx) => {
    const cx = stripeBaseX + ux * offset;
    const cy = stripeBaseY + uy * offset;
    return (
      <line
        key={idx}
        x1={cx - Math.cos(stripeAngle) * (stripeLength / 2)}
        y1={cy - Math.sin(stripeAngle) * (stripeLength / 2)}
        x2={cx + Math.cos(stripeAngle) * (stripeLength / 2)}
        y2={cy + Math.sin(stripeAngle) * (stripeLength / 2)}
        stroke="white"
        strokeWidth={0.5}
        strokeLinecap="round"
      />
    );
  };

  const stripes = [
    createStripe(-stripeSpacing, 0),
    createStripe(0, 1),
    createStripe(stripeSpacing, 2),
  ];

  // optional uniform scaling about center
  const transform = `translate(${centerX},${lineY}) scale(${scale}) translate(${-centerX},${-lineY})`;

  return (
    <g transform={transform}>
      {/* mask flat segment */}
      <line
        x1={breakX1}
        y1={lineY}
        x2={breakX2}
        y2={lineY}
        stroke="#333"
        strokeWidth={4}
        strokeLinecap="butt"
      />
      {/* lifted track */}
      <line
        x1={liftedX1}
        y1={liftedY1}
        x2={liftedX2}
        y2={liftedY2}
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* stripes */}
      {stripes}
      {/* circle */}
      <circle
        cx={circleX}
        cy={circleY}
        r={3.2 * scale}
        stroke="white"
        strokeWidth={0.5}
        fill="none"
      />
    </g>
  );
};

export default BreakOverlay;