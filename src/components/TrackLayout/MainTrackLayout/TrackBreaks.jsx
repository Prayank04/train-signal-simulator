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
  breakLengthRatio = 0.1,
  direction = "up", // "up" or "down"
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

  const { xStart, xEnd, ratio: breakRatio = 0.3 } = breakBetween;
  const breakCenterX = xStart + breakRatio * (xEnd - xStart);
  const breakLength = (xEnd - xStart) * breakLengthRatio;
  const breakX1 = breakCenterX - breakLength / 2;
  const breakX2 = breakCenterX + breakLength / 2;

  const strokeColor = getTrackColor(TSName) || "white";

  // Lifted line geometry
  const slantLength = breakX2 - breakX1;
  const liftHeight = 9 * (direction === "up" ? -1 : 1); // Y offset based on direction

  // Start and end of the lifted slant
const liftedX1 = breakX1;
const liftedY1 = lineY;
const liftedX2 = breakX2 - 3;
const liftedY2 = lineY + liftHeight;

// Direction vector (unit)
const dx = liftedX2 - liftedX1;
const dy = liftedY2 - liftedY1;
const len = Math.sqrt(dx * dx + dy * dy);
const ux = dx / len;
const uy = dy / len;

// Perpendicular (normal)
const perpX = -uy;
const perpY = ux;

// Center of slant
const midX = (liftedX1 + liftedX2) / 2;
const midY = (liftedY1 + liftedY2) / 2;

// Move the stripes **above** the slanted line
const liftOffset = 5; // adjust how high above the slant they are

const circleOffset = 14; // how far above the slant the circle should be

const circleX = midX - perpX * circleOffset;
const circleY = midY - perpY * circleOffset;

// Draw perpendicular stripes at fixed spacing
const spacing = 4;
const stripeLength = 6;

// Repositioned center for the 3 stripes
const stripeCenterX = midX - perpX * liftOffset;
const stripeCenterY = midY - perpY * liftOffset;

const createStripe = (cx, cy, i) => (
  <line
    key={i}
    x1={cx - (perpX * stripeLength) / 2}
    y1={cy - (perpY * stripeLength) / 2}
    x2={cx + (perpX * stripeLength) / 2}
    y2={cy + (perpY * stripeLength) / 2}
    stroke="white"
    strokeWidth={0.6}
  />
);

const stripes = [
  createStripe(stripeCenterX, stripeCenterY, "mid"),
  createStripe(stripeCenterX - ux * spacing, stripeCenterY - uy * spacing, "left"),
  createStripe(stripeCenterX + ux * spacing, stripeCenterY + uy * spacing, "right"),
];
  return (
    <>
      {base}

      {/* Mask the track with background color */}
      <line
        x1={breakX1}
        y1={lineY}
        x2={breakX2}
        y2={lineY}
        stroke="#333333" // Background color
        strokeWidth={5}
        strokeLinecap="butt"
      />

      {/* Slanting lifted line */}
      <line
        x1={breakX1}
        y1={lineY}
        x2={breakX2 - 3}
        y2={lineY + liftHeight}
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Perpendicular lifted stripes above slant */}
      {stripes}

      {/* Center circle on slant */}
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