import React from 'react';
import { DNSignal, UPSignal } from './MainTrackLayout/signals';

const RightBottomTrackLayout = () => {
  const spacing = 80;        // Distance between signals
  const lineY1 = 35;         // Top line
  const lineY2 = 55;         // Second line
  const lineY3 = 75;         // Third line
  const lineY4 = 95;         // Bottom line
  const startX = 20;         // Starting X position for right side
  const signalOffsetY = 12;  // Vertical offset for signal heads

  // You don't need to pull signalStates here—each render* helper will use useSignalContext internally.

  return (
    <div
      className="right-side-track-layout"
      style={{
        marginTop: '-185px',    // Align vertically with left bottom track
        marginLeft: '1150px',   // Position to the right
        position: 'absolute',
      }}
    >
      <svg width="220" height="180" style={{ backgroundColor: "#333333" }}>

        {/* Four horizontal track lines */}
        <line x1={-30} y1={lineY1} x2={220} y2={lineY1} stroke="white" strokeWidth="3" />
        <line x1={-30} y1={lineY2} x2={220} y2={lineY2} stroke="white" strokeWidth="3" />
        <line x1={-30} y1={lineY3} x2={220} y2={lineY3} stroke="white" strokeWidth="3" />
        <line x1={-30} y1={lineY4} x2={220} y2={lineY4} stroke="white" strokeWidth="3" />

        {/* Line 1 DN Signals */}
        <DNSignal
          signalName="A3112"
          x={startX + 0 * spacing}
          y={lineY1 - signalOffsetY}
          initialColor="G"
        />
        <DNSignal
          signalName="A3110"
          x={startX + 1 * spacing}
          y={lineY1 - signalOffsetY}
          initialColor="G"
        />

        {/* Line 4 UP Signals */}
        <UPSignal
          signalName="A3103"
          x={startX + 0 * spacing}
          y={lineY4 + signalOffsetY}
          initialColor="YY"
        />
        <UPSignal
          signalName="A3105"
          x={startX + 1 * spacing}
          y={lineY4 + signalOffsetY}
          initialColor="G"
        />


        {/* XT Labels for Line 1 */}
        <text x={40}  y={lineY1 + 8} fill="#00bfff" fontSize="7" textAnchor="middle">3114XT</text>
        <text x={110} y={lineY1 + 8} fill="#00bfff" fontSize="7" textAnchor="middle">3112XT</text>
        <text x={190} y={lineY1 + 8} fill="#00bfff" fontSize="7" textAnchor="middle">3110XT</text>

        {/* XT Labels for Line 4 */}
        <text x={40}  y={lineY4 - 8} fill="#00bfff" fontSize="7" textAnchor="middle">3103XT</text>
        <text x={140} y={lineY4 - 8} fill="#00bfff" fontSize="7" textAnchor="middle">3105XT</text>

        {/* Vertical markers on Line 1 */}
        {[82, 90, 152, 160].map((xPos, i) => (
          <line
            key={`line1-marker-${i}`}
            x1={xPos} y1={lineY1 - 6}
            x2={xPos} y2={lineY1 + 6}
            stroke="white" strokeWidth="2"
          />
        ))}

        {/* Vertical markers on Line 2 */}
        {[82, 90].map((xPos, i) => (
          <line
            key={`line2-marker-${i}`}
            x1={xPos} y1={lineY2 - 6}
            x2={xPos} y2={lineY2 + 6}
            stroke="white" strokeWidth="2"
          />
        ))}
        {/* XT Label for Line 2 */}
        <text x={40}  y={lineY2 - 6} fill="#00bfff" fontSize="7" textAnchor="middle">3112XT_3110XT</text>
        <text x={150} y={lineY2 - 6} fill="#00bfff" fontSize="7" textAnchor="middle">2AXT_3114XT</text>

        {/* Vertical markers on Line 3 */}
        {[62, 70].map((xPos, i) => (
          <line
            key={`line3-marker-${i}`}
            x1={xPos} y1={lineY3 - 6}
            x2={xPos} y2={lineY3 + 6}
            stroke="white" strokeWidth="2"
          />
        ))}
        {/* XT Label for Line 3 */}
        <text x={30} y={lineY3 - 8} fill="#00bfff" fontSize="7" textAnchor="middle">3103XT_3101XT</text>

        {/* Vertical markers on Line 4 */}
        {[62, 70, 142, 150].map((xPos, i) => (
          <line
            key={`line4-marker-${i}`}
            x1={xPos} y1={lineY4 - 6}
            x2={xPos} y2={lineY4 + 6}
            stroke="white" strokeWidth="2"
          />
        ))}

      </svg>
    </div>
  );
};

export default RightBottomTrackLayout;
