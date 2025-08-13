import React, { useContext } from "react";
import { TrackContext, statusColors } from "../../../context/TrackContext";

const SlantingLineWOper = ({
  UpName,
  DnName,
  Upx,
  Dnx,
  Upy,
  Dny,
  strokeWidth = 3,
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
  const Ucx = Upx + (m > 0 ? 4 : m < 0 ? -4 : 0);
  const Ucy = Upy - 15;
  

  const Uuslx = Ucx; // Up up small line x
  const Uusly = Ucy + 5; // Up up small line y
  const Udslx = x1 + 2; // Up down small line x
  const Udsly = y1 - 11; // Up down small line y

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
       

      {/* Indicator circles */}
      <circle
        cx= {Ucx}
        cy= {Ucy}
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

      

      
    </g>
  );
};

export default SlantingLineWOper;
