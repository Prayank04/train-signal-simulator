import React, { useContext } from 'react';
import { usePointContext } from '../../../context/PointContext';
import { TrackContext, statusColors } from '../../../context/TrackContext';
// Import constants to deduce Y coordinates and line ends
import {
  TRACK_LAYOUT_CONSTANTS,
  UP_MAIN_LINE_SECTIONS,
  DN_MAIN_LINE_SECTIONS,
  UP_LOOP_LINE_SECTIONS,
  DN_LOOP_LINE_SECTIONS,
  YARD_LINES_SECTIONS
} from '../../../utils/constants';

/**
 * Deduces the base Y coordinate for a track line by matching the provided section array
 * with the known constant arrays.
 * @param {Array} sectionArray The array passed via props (e.g., upSectionArr).
 * @returns {number|null} The corresponding Y coordinate or null if not found.
 */
const getBaseYForSection = (sectionArray) => {
  if (!sectionArray) return null;
  if (sectionArray === UP_MAIN_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.upMainLineY;
  if (sectionArray === DN_MAIN_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.dnMainLineY;
  if (sectionArray === UP_LOOP_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.upLoopLineY;
  if (sectionArray === DN_LOOP_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.dnLoopLineY;
  if (sectionArray === YARD_LINES_SECTIONS) return TRACK_LAYOUT_CONSTANTS.yardLine;
  return null;
};

/**
 * Deduces the end X coordinate for a track line.
 * @param {Array} sectionArray The array passed via props.
 * @returns {number|null} The corresponding line end X coordinate.
 */
const getLineEndForSection = (sectionArray) => {
    if (!sectionArray) return null;
    if (sectionArray === UP_MAIN_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.mainlineEnd;
    if (sectionArray === DN_MAIN_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.mainlineEnd;
    if (sectionArray === UP_LOOP_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.upLoopLineEnd;
    if (sectionArray === DN_LOOP_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.dnLoopLineEnd;
    if (sectionArray === YARD_LINES_SECTIONS) return TRACK_LAYOUT_CONSTANTS.yardLineEnd;
    return null;
};

const getLineStartForSection = (sectionArray) => {
  if (!sectionArray) return null;
  if (sectionArray === UP_MAIN_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.mainlineStart;
  if (sectionArray === DN_MAIN_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.mainlineStart;
  if (sectionArray === UP_LOOP_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.upLoopLineStart;
  if (sectionArray === DN_LOOP_LINE_SECTIONS) return TRACK_LAYOUT_CONSTANTS.dnLoopLineStart;
  if (sectionArray === YARD_LINES_SECTIONS) return TRACK_LAYOUT_CONSTANTS.yardLineStart;
  return null;
};

const SlantingLine = ({
  pointId,
  UpName,
  DnName,
  upSectionArr,
  upSectionIdx,
  dnSectionArr,
  dnSectionIdx,
  upSectionRatio = 0,
  dnSectionRatio = 0,
  UpTrainMovement,
  DnTrainMovement,
  strokeWidth = 2,
  showPerpendicular = true,
  perpendicularLength = 10
}) => {
  const { pointStates } = usePointContext();
  const { trackStates } = useContext(TrackContext);

  // --- Coordinate Calculation ---
  let upX1, upX2, Upx, dnX1, dnX2, Dnx;

  // Calculate Upper X coordinate
  if (upSectionArr && upSectionArr[upSectionIdx]) {
    upX1 = upSectionArr[upSectionIdx].x;
    // Check if it's the last defined section break
    if (upSectionIdx === upSectionArr.length - 1) {
        upX2 = getLineEndForSection(upSectionArr); // Get the absolute end of the line
    } else {
        upX2 = upSectionArr[upSectionIdx + 1]?.x;
    }
  } else {
    upX1 = upSectionIdx;
    upX2 = upSectionArr?.[0]?.x;
  }
  Upx = upX1 + upSectionRatio * (upX2 - upX1);

  // Calculate Lower X coordinate
  if (dnSectionArr && dnSectionArr[dnSectionIdx]) {
    dnX1 = dnSectionArr[dnSectionIdx].x;
    // Check if it's the last defined section break
    if (dnSectionIdx === dnSectionArr.length - 1) {
        dnX2 = getLineEndForSection(dnSectionArr); // Get the absolute end of the line
    } else {
        dnX2 = dnSectionArr[dnSectionIdx + 1]?.x;
    }
  } else {
    dnX1 = dnSectionIdx;
    dnX2 = dnSectionArr?.[0]?.x;
  }
  Dnx = dnX1 + dnSectionRatio * (dnX2 - dnX1);

  // Deduce Y coordinates based on the array that was passed in.
  const Upy = getBaseYForSection(upSectionArr);
  const Dny = getBaseYForSection(dnSectionArr);

  // Safety check: If we couldn't calculate valid coordinates, don't render anything.
  if (Upy === null || Dny === null || isNaN(Upx) || isNaN(Dnx)) {
    console.error(`[SlantingLine] Could not render point ${pointId} due to invalid coordinates. Upx=${Upx}, Dnx=${Dnx}, Upy=${Upy}, Dny=${Dny}`);
    return null;
  }

  // --- Determine line color from TrackContext ---
  const statusUp = trackStates[`${UpName}XT`];
  const statusDn = trackStates[`${DnName}XT`];
  const lineCode = statusUp === statusDn ? statusUp : "CLEAR";
  const strokeColor = statusColors[lineCode] || "white";

  // --- Determine line position from PointContext ---
  const pointState = pointStates[pointId] || 'Normal';
  
  let x1_main, y1_main, x2_main, y2_main;

  if (pointState === 'Reverse') {
    x1_main = Upx; y1_main = Upy; x2_main = Dnx; y2_main = Dny;
  } else {
    x1_main = Upx; y1_main = Upy + 7; x2_main = Dnx; y2_main = Dny - 7;
  }

  // --- Calculations for decorative elements ---
  const m = (y2_main - y1_main) / (x2_main - x1_main);
  const midX = (x1_main + x2_main) / 2;
  const midY = (y1_main + y2_main) / 2;
  const perpSlope = -1 / m;
  const halfLen = perpendicularLength / 2;
  const denom = Math.sqrt(1 + perpSlope ** 2);
  const dx = halfLen * (1 / denom);
  const dy = halfLen * (perpSlope / denom);
  const perpX1 = midX + dx;
  const perpY1 = midY + dy;
  const perpX2 = midX - dx;
  const perpY2 = midY - dy;

  const Ucx = Upx + (m > 0 ? 4 : m < 0 ? -4 : 0);
  const Ucy = Upy - 15;
  const Dcx = Dnx - (m > 0 ? 4 : m < 0 ? -4 : 0);
  const Dcy = Dny + 15;

  const Uuslx = Ucx;
  const Uusly = Ucy + 5;
  const Udslx = Upx + 2;
  const Udsly = Upy - 4;

  const Duslx = Dcx;
  const Dusly = Dcy - 5;
  const Ddslx = Dnx - 2;
  const Ddsly = Dny + 4;

  const yardCap = UpName === "YARD";
  const capX1 = Ucx - 5;
  const capY1 = Ucy - 6;
  const capX2 = Ucx + 5;
  const capY2 = Ucy - 1;

  // Calculate coordinates for the two extra lines in Reverse state
  const offset = 2; // The distance between the parallel lines
  const angle = Math.atan2(y2_main - y1_main, x2_main - x1_main);
  const offsetX = offset * Math.sin(angle);
  const offsetY = offset * Math.cos(angle);

  

  return (
    <g>
      <line x1={x1_main} y1={y1_main} x2={x2_main} y2={y2_main} stroke={strokeColor} strokeWidth={strokeWidth} />
      
      {/* Conditionally render the two extra lines only when in Reverse state */}
      // ...existing code...

      {pointState === 'Reverse' && (
        <>
          <line
            x1={Upx}
            y1={Upy}
            x2={UpTrainMovement === "left" ? Upx + 10 : Upx - 10}
            y2={Upy}
            stroke="#333333"
            strokeWidth={3}
          />
          <line
            x1={UpTrainMovement === "left" ? Upx + 10 : Upx - 10}
            y1={Upy}
            x2={
              UpTrainMovement === "left"
                ? (upSectionArr[upSectionIdx + 1] ? upSectionArr[upSectionIdx + 1].x : getLineEndForSection(upSectionArr))
                : (upSectionArr[upSectionIdx] ? upSectionArr[upSectionIdx].x : getLineStartForSection(upSectionArr))
            }
            y2={Upy}
            stroke="white"
            strokeWidth={3}
          />
          <line
            x1={Dnx}
            y1={Dny}
            x2={DnTrainMovement === "right" ? Dnx - 10 : Dnx + 10}
            y2={Dny}
            stroke="#333333"
            strokeWidth={3}
          />
          <line
            x1={DnTrainMovement === "right" ? Dnx - 10 : Dnx + 10}
            y1={Dny}
            x2={
              DnTrainMovement === "right"
                ? (dnSectionArr[dnSectionIdx] ? dnSectionArr[dnSectionIdx].x : getLineStartForSection(dnSectionArr))
                : (dnSectionArr[dnSectionIdx + 1] ? dnSectionArr[dnSectionIdx + 1].x : getLineEndForSection(dnSectionArr))
            }
            y2={Dny}
            stroke="white"
            strokeWidth={3}
          />
        </>
      )}

      {showPerpendicular && isFinite(perpX1) && (
        <line x1={perpX1} y1={perpY1} x2={perpX2} y2={perpY2} stroke={strokeColor} strokeWidth={strokeWidth / 2} />
      )}
      
      <circle cx={Ucx} cy={Ucy} r={3} fill="#333333" stroke="white" strokeWidth={0.5} />
      <text
        x={Ucx}
        y={Ucy - 8}
        fill="#00BFFF"
        fontSize={8}
        fontFamily="Arial"
        textAnchor="middle"
      >
        {UpName}
      </text>
      <circle cx={Dcx} cy={Dcy} r={3} fill="#333333" stroke="white" strokeWidth={0.5} />
      <text
        x={Dcx}
        y={Dcy + 14}
        fill="#00BFFF"
        fontSize={8}
        fontFamily="Arial"
        textAnchor="middle"
      >
        {DnName}
      </text>
      <line x1={Uuslx} y1={Uusly} x2={Udslx} y2={Udsly} stroke={strokeColor} strokeWidth={0.5} />
      <line x1={Uuslx - 3} y1={Uusly} x2={Udslx - 3} y2={Udsly} stroke={strokeColor} strokeWidth={0.5} />
      <line x1={Uuslx + 3} y1={Uusly} x2={Udslx + 3} y2={Udsly} stroke={strokeColor} strokeWidth={0.5} />
      <line x1={Duslx} y1={Dusly} x2={Ddslx} y2={Ddsly} stroke={strokeColor} strokeWidth={0.5} />
      <line x1={Duslx - 3} y1={Dusly} x2={Ddslx - 3} y2={Ddsly} stroke={strokeColor} strokeWidth={0.5} />
      <line x1={Duslx + 3} y1={Dusly} x2={Ddslx + 3} y2={Ddsly} stroke={strokeColor} strokeWidth={0.5} />
      {yardCap && (
        <line x1={capX1} y1={capY1} x2={capX2} y2={capY2} stroke={strokeColor} strokeWidth={strokeWidth} />
      )}
    </g>
  );
};

export default SlantingLine;
