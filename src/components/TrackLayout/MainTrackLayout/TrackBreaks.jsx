import React from "react";
import TrackSection from "./TrackSection"; // adjust path if needed

const TrackSectionWithBreak = ({
  sections,
  TSName,
  lineY,
  x1,
  x2,
  ratio = 0.5,
  textYOffset = -5,
  getTrackColor,
  fontSize = 9,
  fill = "#00bfff",
  breakBetween, // { xStart, xEnd, ratio }
  breakLengthRatio = 0.07,
  direction = "up", // "up" or "down"
  slantedLineRatio = 1, // Controls length of slanted line (0.5 = half length, 1 = full break length)
}) => {
  const base = (
    <TrackSection
      sections={sections}
      TSName={TSName}
      lineY={lineY}
      x1={x1}
      x2={x2}
      ratio={ratio}
      textYOffset={textYOffset}
      getTrackColor={getTrackColor}
      fontSize={fontSize}
      fill={fill}
    />
  );

  if (!breakBetween) return base;

  const { xStart, xEnd, ratio: breakRatio = 0.5 } = breakBetween;
  const breakCenterX = xStart + breakRatio * (xEnd - xStart);
  const breakLength = (xEnd - xStart) * breakLengthRatio;
  const breakX1 = breakCenterX - breakLength / 2;
  const breakX2 = breakCenterX + breakLength / 2;

  // Calculate the lifted line position and angle
  const liftHeight = 12;
  const liftAngle = 25; // degrees from horizontal
  
  // Shortened slanted line length
  const slantedLineLength = breakLength * slantedLineRatio;
  
  // For "up": starts from left, goes up-right (northwest to southeast visually)
  // For "down": starts from right, goes down-left (northeast to southwest visually) - mirror image
  const liftedX1 = direction === "up" ? breakX1 : breakX2;
  const liftedY1 = lineY;
  const liftedX2 = direction === "up" ? breakX1 + slantedLineLength : breakX2 - slantedLineLength;
  const liftedY2 = direction === "up" ? lineY - liftHeight : lineY + liftHeight;

  // Direction vectors for the lifted line
  const dx = liftedX2 - liftedX1;
  const dy = liftedY2 - liftedY1;
  const lineLength = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / lineLength; // unit vector along lifted line
  const uy = dy / lineLength;

  // Perpendicular vector (for stripes)
  const perpX = -uy;
  const perpY = ux;

  // Position for stripes and circle
  const stripeMidX = (liftedX1 + liftedX2) / 2;
  const stripeMidY = (liftedY1 + liftedY2) / 2;
  
  // Offset stripes perpendicular to the lifted line
  // For "up": stripes go above the line 
  // For "down": stripes go below the line (always downward in screen coordinates)
  const stripeOffset = 8;
  let stripeBaseX, stripeBaseY;
  
  if (direction === "up") {
    // Above the line (perpendicular offset upward)
    stripeBaseX = stripeMidX + perpX * stripeOffset * -1;
    stripeBaseY = stripeMidY + perpY * stripeOffset * -1;
  } else {
    // Below the line (perpendicular offset but ensuring it goes downward)
    const downwardPerpX = perpX * (perpY > 0 ? 1 : -1);
    const downwardPerpY = Math.abs(perpY);
    stripeBaseX = stripeMidX + downwardPerpX * stripeOffset;
    stripeBaseY = stripeMidY + downwardPerpY * stripeOffset;
  }

  // Circle position (further from the line in the same direction as stripes)
  const circleOffset = 18;
  let circleX, circleY;
  
  if (direction === "up") {
    circleX = stripeMidX + perpX * circleOffset * -1;
    circleY = stripeMidY + perpY * circleOffset * -1;
  } else {
    const downwardPerpX = perpX * (perpY > 0 ? 1 : -1);
    const downwardPerpY = Math.abs(perpY);
    circleX = stripeMidX + downwardPerpX * circleOffset;
    circleY = stripeMidY + downwardPerpY * circleOffset;
  }

  // Create three parallel stripes
  const stripeSpacing = 4;
  const stripeLength = 8;
  const stripeAngle = Math.atan2(perpY, perpX);

  const createStripe = (offsetAlongLine, key) => {
    const cx = stripeBaseX + ux * offsetAlongLine;
    const cy = stripeBaseY + uy * offsetAlongLine;
    
    return (
      <line
        key={key}
        x1={cx - Math.cos(stripeAngle) * stripeLength / 2}
        y1={cy - Math.sin(stripeAngle) * stripeLength / 2}
        x2={cx + Math.cos(stripeAngle) * stripeLength / 2}
        y2={cy + Math.sin(stripeAngle) * stripeLength / 2}
        stroke="white"
        strokeWidth={0.5}
        strokeLinecap="round"
      />
    );
  };

  const stripes = [
    createStripe(-stripeSpacing, "left"),
    createStripe(0, "center"),
    createStripe(stripeSpacing, "right"),
  ];

  return (
    <>
      {base}

      {/* Mask the original track line with background color */}
      <line
        x1={breakX1}
        y1={lineY}
        x2={breakX2}
        y2={lineY}
        stroke="#333333" // Background color to hide the track
        strokeWidth={4}
        strokeLinecap="butt"
      />

      {/* Lifted track section */}
      <line
        x1={liftedX1}
        y1={liftedY1}
        x2={liftedX2}
        y2={liftedY2}
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Three parallel stripes perpendicular to the lifted line */}
      {stripes}

      {/* Circle above/below the stripes */}
      <circle
        cx={circleX}
        cy={circleY}
        r={3.2}
        stroke="white"
        strokeWidth={0.5}
        fill="none"
      />
    </>
  );
};

export default TrackSectionWithBreak;