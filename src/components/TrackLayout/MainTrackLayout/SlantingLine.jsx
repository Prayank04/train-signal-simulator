import React, { useContext } from "react";
import { TrackContext, statusColors } from "../../../context/TrackContext";

const SlantingLine = ({
  UpName,
  DnName,
  Upx,
  Dnx,
  Upy,
  Dny,
  strokeWidth = 2,
  showPerpendicular = true,
  perpendicularLength = 10
}) => {
  const { trackStates } = useContext(TrackContext);
  const statusUp = trackStates[`${UpName}XT`];
  const statusDn = trackStates[`${DnName}XT`];

  // If both tracks share the same state, use it; otherwise treat as CLEAR
  const lineCode = statusUp === statusDn ? statusUp : "CLEAR";
  const strokeColor = statusColors[lineCode] || "white";

  // Main line endpoints
  const x1 = Upx;
  const y1 = Upy + 7;
  const x2 = Dnx;
  const y2 = Dny - 7;

  // Perpendicular line calculation
  const m = (y2 - y1) / (x2 - x1);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
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

  const Uuslx = Ucx; // Up up small line x
  const Uusly = Ucy + 5; // Up up small line y
  const Udslx = x1 + 2; // Up down small line x
  const Udsly = y1 - 11; // Up down small line y

  const Duslx = Dcx; // Down up small line x
  const Dusly = Dcy - 5; // Down up small line y
  const Ddslx = x2 - 2; // Down down small line x
  const Ddsly = y2 + 11; // Down down small line y

  // === CAP SLANT for yard point ===
  const yardCap = UpName === "YARD"; // Only add for yard line
  const capX1 = Ucx - 5;
  const capY1 = Ucy - 6;
  const capX2 = Ucx + 5;
  const capY2 = Ucy - 1;

  return (
    <g>
      {/* Main slanting line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />

      {/* Optional perpendicular styling */}
      {showPerpendicular && (
        <line
          x1={perpX1}
          y1={perpY1}
          x2={perpX2}
          y2={perpY2}
          stroke={strokeColor}
          strokeWidth={strokeWidth / 2}
        />
      )}

      {/* Indicator circles */}
      <circle
        cx= {Ucx}
        cy= {Ucy}
        r={3}
        fill="#333333"
        stroke="white"
        strokeWidth={0.5}
      />
      <circle
        cx= {Dcx}
        cy= {Dcy}
        r={3}
        fill="#333333"
        stroke="white"
        strokeWidth={0.5}
      />

      <line
        x1={Uuslx}
        y1={Uusly}
        x2={Udslx}
        y2={Udsly}
        stroke={strokeColor}
        strokeWidth={0.5}
      />

      <line
        x1={Uuslx - 3}
        y1={Uusly}
        x2={Udslx - 3}
        y2={Udsly}
        stroke={strokeColor}
        strokeWidth={0.5}
      />

      <line
        x1={Uuslx + 3}
        y1={Uusly}
        x2={Udslx + 3}
        y2={Udsly}
        stroke={strokeColor}
        strokeWidth={0.5}
      />

      

      <line
        x1={Duslx}
        y1={Dusly}
        x2={Ddslx}
        y2={Ddsly}
        stroke={strokeColor}
        strokeWidth={0.5}
      />

      <line
        x1={Duslx - 3}
        y1={Dusly}
        x2={Ddslx - 3}
        y2={Ddsly}
        stroke={strokeColor}
        strokeWidth={0.5}
      />

      <line
        x1={Duslx + 3}
        y1={Dusly}
        x2={Ddslx + 3}
        y2={Ddsly}
        stroke={strokeColor}
        strokeWidth={0.5}
      />
     {/* Add slant cap ONLY for yard line */}
      {yardCap && (
        <line
          x1={capX1}
          y1={capY1}
          x2={capX2}
          y2={capY2}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      )}
    </g>
  );
};

export default SlantingLine;

