import React, { useContext, useState } from 'react';
import { TRACK_LAYOUT_CONSTANTS } from '../../../utils/constants';
import { useSignalContext } from '../../../context/SignalContext'; // Make sure this import exists

const {
  spacing,
  circleRadius,
  dnLoopLineY,
  dnMainLineY,
  upMainLineY,
  upLoopLineY,
  signalOffsetY,
} = TRACK_LAYOUT_CONSTANTS;

// Render signal on vertical line with rectangle and cross

function InitialColors(lineY, color) {
  // Use the constants from TRACK_LAYOUT_CONSTANTS
  const { upMainLineY, upLoopLineY, dnMainLineY, dnLoopLineY } = TRACK_LAYOUT_CONSTANTS;
    
  const isUpLine = lineY === upMainLineY || lineY === upLoopLineY;

  switch (color) {
    case 'R':
      return isUpLine
        ? ['none', 'none', 'none', 'red']
        : ['red', 'none', 'none', 'none'];
    case 'Y':
      return isUpLine
        ? ['none', 'none', 'yellow', 'none']
        : ['none', 'yellow', 'none', 'none'];
    case 'YY':
      return isUpLine
        ? ['yellow', 'none', 'yellow', 'none']
        : ['none', 'yellow', 'none', 'yellow'];
    case 'G':
      return isUpLine
        ? ['none', 'green', 'none', 'none']
        : ['none', 'none', 'green', 'none'];
    default:
      return ['none', 'none', 'none', 'none'];
  }
}

//SH196,SH140,SH124
function ShuntUp({startX, label, lineY}) {
    const signalY = lineY - 13; // 12px above the line
    const circleRadius = 3; // Define circle radius
    
    // Circle positioned at the LEFT (start position)
    const circleX = startX + 3;
    const firstCircle = (
        <circle
            cx={circleX}
            cy={signalY + 3}
            r={circleRadius}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
        />
    );
    
    // Vertical line going DOWN from circle (shorter to move everything up)
    const verticalLineStartX = circleX + circleRadius + 2; // Small gap from circle
    const verticalLineLength = 6; // Reduced length to move everything up
    const verticalLineBottomY = signalY + verticalLineLength;
    const verticalLineMidY = signalY + verticalLineLength/2; // Middle of vertical line
    const verticalLine = (
        <line
            x1={verticalLineStartX}
            y1={signalY}
            x2={verticalLineStartX}
            y2={verticalLineBottomY}
            stroke="white"
            strokeWidth="1"
        />
    );
    
    // Horizontal line going RIGHT from MIDDLE of vertical line
    const horizontalLineEndX = startX + 10;
    const horizontalLine = (
        <line
            x1={verticalLineStartX}
            y1={verticalLineMidY}
            x2={horizontalLineEndX}
            y2={verticalLineMidY}
            stroke="white"
            strokeWidth="1"
        />
    );
    
    // Quadrant positioned to the RIGHT (aligned so its middle matches horizontal line level)
    const quadX = horizontalLineEndX + 3; // Small gap from horizontal line
    const quadY = verticalLineMidY - 6; // Position so quadrant's middle aligns with horizontal line
    const quadWidth = 10;
    const quadHeight = 10;
    
    // Horizontal line connecting directly to the quadrant (straight line, no slant)
    const connectionLine = (
        <line
            x1={horizontalLineEndX}
            y1={verticalLineMidY}
            x2={quadX}
            y2={verticalLineMidY}
            stroke="white"
            strokeWidth="1"
        />
    );
    
    // Quadrant shape (top-right quarter of a circle, positioned based on middle connection)
    const quadrant = (
        <path
            d={`
                M ${quadX} ${quadY + quadHeight}
                L ${quadX} ${quadY}
                A ${quadWidth} ${quadHeight} 0 0 1 ${quadX + quadWidth} ${quadY + quadHeight}
                Z
            `}
            fill="none"
            stroke="white"
            strokeWidth="1"
        />
    );
    
    // 3 circles inside quadrant (repositioned for top-right quadrant)
   const innerCircles = (
        <>
            {/* Two circles on the left side - filled white */}
            <circle cx={quadX + 3} cy={quadY + 4} r={1.2} fill="white" stroke="white" strokeWidth="0.5"/>
            <circle cx={quadX + 3} cy={quadY + 8} r={1.2} fill="white" stroke="white" strokeWidth="0.5"/>
            {/* One circle on the right side - empty (stroke only) */}
            <circle cx={quadX + 7} cy={quadY + 6} r={1.2} fill="none" stroke="white" strokeWidth="0.5"/>
        </>
    );
    
    // Signal label
    const labelText = (
        <text 
            x={startX + 15} 
            y={signalY - 10} 
            fill="#00bfff" 
            fontSize="9" 
            textAnchor="middle"
        >
            {label}
        </text>
    );
    
    return (
        <>
            {firstCircle}
            {verticalLine}
            {horizontalLine}
            {connectionLine}
            {quadrant}
            {innerCircles}
            {labelText}
        </>
    );
}

  // SH123, SH143, SH131   
// SH123, SH143, SH131   
function ShuntDown ({startX, label, lineY}) {
    const signalY = lineY + 12; // 12px below the line
    const circleRadius = 3; // Define circle radius
     
    // Circle positioned to the right
    const circleX = startX + 27; // Position circle to the right
    const firstCircle = (
      <circle
         cx={circleX}
         cy={signalY}
         r={circleRadius}
         fill="none"
         stroke="white"
         strokeWidth="0.5"
       />
    );
     
    // Small vertical line with distance from circle (to the left of circle)
    const verticalLineStartX = circleX - circleRadius - 3; // 3px gap from circle, to the left
    const verticalLineLength = 8; // Small vertical line
    const verticalLineMidY = signalY; // Middle of vertical line (same as circle level)
         
    // Quadrant position - to the left of vertical line
    const quadX = startX + 3;
    const quadY = signalY - 5;
    const quadWidth = 10;
    const quadHeight = 10;
         
    return (
      <>
        {firstCircle}
                 
        {/* Small vertical line with gap from circle (to the left) */}
        <line
           x1={verticalLineStartX}
           y1={signalY - verticalLineLength/2 + 1}
           x2={verticalLineStartX}
           y2={signalY + verticalLineLength/2 -1}
           stroke="white"
           strokeWidth="1"
         />
                 
        {/* Horizontal line from middle of vertical line to quadrant surface (going left) */}
        <line
           x1={verticalLineStartX }
           y1={verticalLineMidY }
           x2={quadX + quadWidth + 1 }
           y2={verticalLineMidY}
           stroke="white"
           strokeWidth="1"
         />
                 
        {/* Quadrant shape (bottom-right quadrant - facing left and bottom) */}
        <path
          d={`
            M ${quadX} ${quadY}
            L ${quadX + quadWidth} ${quadY}
            L ${quadX + quadWidth} ${quadY + quadHeight}
            A ${quadWidth} ${quadHeight} 0 0 1 ${quadX} ${quadY}
            Z
          `}
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
                 
       {/* 3 circles inside quadrant - equidistant arrangement */}
        <circle cx={quadX + 4} cy={quadY + 5} r={1.2} fill="none" stroke="white" strokeWidth="0.5"/>
        <circle cx={quadX + 8} cy={quadY + 3} r={1.2} fill="white" stroke="white" strokeWidth="0.5"/>
        <circle cx={quadX + 8} cy={quadY + 7} r={1.2} fill="white" stroke="white" strokeWidth="0.5"/>

                 
        {/* Signal label */}
        <text x={startX + 15} y={signalY + 15} fill="#00bfff" fontSize="9" textAnchor="middle">{label}</text>
      </>
    );
};
  

  // UP S39/SH139 (UP Loop Line Signal)
function UpLoopLineSignal({ startX, label = "S39/SH139", lineY = upLoopLineY, initialColor, signalName }) {
  const { signalStates } = useSignalContext();

  let fillColors;
  if (signalStates && signalStates[signalName]) {
    fillColors = InitialColors(lineY + 12, signalStates[signalName]);
  } else {
    fillColors = ['none', 'white', 'none', 'red'];
  }

  const signalY = lineY + 12;
  const y = signalY;

  const circleClusterStartX = startX;
  const xAfterCluster = startX + (fillColors.length - 1) * spacing + circleRadius;

  // Horizontal line to quadrant
  const lineToQuadStartX = xAfterCluster + 2;
  const lineToQuadEndX = lineToQuadStartX + 4;

  // Quadrant parameters
  const quadX = lineToQuadEndX;
  const quadY = y - 6;
  const quadWidth = 10 ;
  const quadHeight = 10;

  const quadRightMidX = quadX + quadWidth;
  const quadRightMidY = quadY + quadHeight / 2;

  return (
    <>
      {/* Signal color circles */}
      {fillColors.map((fill, i) => (
        <circle
          key={`${signalName || label}-${i}`}
          cx={startX + i * spacing}
          cy={signalY}
          r={circleRadius}
          fill={fill}
          stroke="white"
          strokeWidth="1"
        />
      ))}

      {/* Horizontal line from last circle to quadrant */}
      <line
        x1={xAfterCluster}
        y1={y}
        x2={lineToQuadEndX}
        y2={y}
        stroke="white"
        strokeWidth="1"
      />

      {/* Quadrant shape (bottom-right quadrant - facing left and bottom) */}
        <path
          d={`
            M ${quadX} ${quadY}
            L ${quadX + quadWidth} ${quadY}
            L ${quadX + quadWidth} ${quadY + quadHeight}
            A ${quadWidth} ${quadHeight} 0 0 1 ${quadX} ${quadY}
            Z
          `}
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
                 
       {/* Empty quadrant circles: one near 90° joint and one near arc (diagonal placement) */}
        <circle
          cx={quadX + quadWidth - 3}  // near 90° corner (bottom-right)
          cy={quadY + quadHeight - 8}
          r={1.2}
          fill="none"
          stroke="white"
          strokeWidth="0.5"
        />
        <circle
          cx={quadX + 5}  // near arc (top-left)
          cy={quadY + 6}
          r={1.2}
          fill="none"
          stroke="white"
          strokeWidth="0.5"
        />

      {/* Horizontal line from quadrant to vertical T */}
      <line
        x1={quadRightMidX}
        y1={quadRightMidY}
        x2={quadRightMidX + 5}
        y2={quadRightMidY}
        stroke="white"
        strokeWidth="1"
      />

      {/* Vertical line for T-shape */}
      <line
        x1={quadRightMidX + 5}
        y1={quadRightMidY - 3}
        x2={quadRightMidX + 5}
        y2={quadRightMidY + 3}
        stroke="white"
        strokeWidth="1"
      />

      {/* Small empty circle to the right of T */}
      <circle
        cx={quadRightMidX + 10}
        cy={quadRightMidY}
        r={3}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
      />

      {/* Label below the signal */}
      <text x={startX} y={y + 20} fill="#00bfff" fontSize="9" fontFamily="Arial">
        {label}
      </text>
    </>
  );
}


  // S44/SH144 (DN Loop Line Signal)
  function DnLoopLineSignal({startX, label = "S44/SH144", lineY = dnLoopLineY, initialColor = 'R', signalName}) {
    const { signalStates } = useSignalContext();

    // Use real-time color if available, otherwise use hardcoded pattern
    let fillColors;
    if (signalStates && signalStates[signalName]) {
      fillColors = InitialColors(lineY, signalStates[signalName]);
    } else {
      // Hardcoded: red, none, white, none
      fillColors = ['red', 'none', 'white', 'none'];
    }

    const signalY = lineY - 12;
    const x1 = startX;
    const x0 = x1 - 14;
    const y = signalY;

    const rectX = x0 - 4;
    const rectY = y - 5;
    const rectWidth = 10;
    const rectHeight = 10;

    const quadLeftMidX = rectX;
    const quadLeftMidY = rectY + rectHeight / 2;
    const shortLineLength = 5;

    return (
      <>
        {fillColors.map((fill, i) => (
          <circle
            key={`${signalName || label}-${i}`}
            cx={startX + i * spacing}
            cy={signalY}
            r={circleRadius}
            fill={fill}
            stroke="white"
            strokeWidth="1"
          />
        ))}
        <line x1={x1 - circleRadius} y1={y} x2={x0 + rectWidth} y2={y} stroke="white" strokeWidth="1" />
        <path
          d={`
            M ${rectX} ${rectY}
            L ${rectX} ${rectY + rectHeight}
            L ${rectX + rectWidth} ${rectY + rectHeight}
            A ${rectWidth} ${rectHeight} 0 0 0 ${rectX} ${rectY}
            Z
          `}
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        {/* 2 circles inside rectangle - diagonal positioning */}
        <circle cx={rectX + 3} cy={rectY + 7} r={1.2} fill="none" stroke="white" strokeWidth="0.5"/>
        <circle cx={rectX + 5} cy={rectY + 4} r={1.2} fill="none" stroke="white" strokeWidth="0.5"/>
        <line
          x1={quadLeftMidX}
          y1={quadLeftMidY}
          x2={quadLeftMidX - shortLineLength}
          y2={quadLeftMidY}
          stroke="white"
          strokeWidth="1"
        />
        <line
          x1={quadLeftMidX - shortLineLength}
          y1={quadLeftMidY - 3}
          x2={quadLeftMidX - shortLineLength}
          y2={quadLeftMidY + 3}
          stroke="white"
          strokeWidth="1"
        />
        {/* Small circle to the left of T-shape */}
        <circle
          cx={quadLeftMidX - shortLineLength - 5}
          cy={quadLeftMidY}
          r={3}
          fill="none"
          stroke="white"
          strokeWidth="0.5"
        />



      {/* Horizontal connecting line from quadrant to first signal circle */}
        <line
          x1={rectX - 1 + rectWidth}           // Right edge of the quadrant
          y1={signalY}
          x2={startX - 4}                  // Just before the first circle
          y2={signalY}
          stroke="white"
          strokeWidth="1"
        />

        <text x={startX - 15} y={y - 15} fill="#00bfff" fontSize="9" fontFamily="Arial">{label}</text>
      </>
    );
  };




  // Render S1/C1 signal group
  function S98C98Signal ({startX, label = "S98/SH198", lineY = dnMainLineY, initialColor = 'R', signalName = "S98"}) {
    const { signalStates } = useSignalContext();

    // Get real-time color if available, otherwise use initial color
    const currentColor = signalStates && signalStates[signalName] ? signalStates[signalName] : initialColor;

    // Use your existing InitialColors function
    const fillColors = InitialColors(lineY, currentColor);

    const signalY = dnMainLineY - Math.abs(signalOffsetY);

    // S98/SH198 or custom label - Exact mirror image of S1/C1
    const x1 = startX; // First circle (leftmost, with red fill)
    const x5 = x1 - spacing - 8; // Fifth circle (to the left)
    const x6 = x5 - spacing - 3; // Sixth circle with C (even further left)
    const y = signalY;

    // L-shaped connection point - between x1 and x5
    const lConnectionX = x1 - spacing - 4;
    const aCircleOffset = -13; // Above the line for mirrored version

    const tHorizStartX = x6 - circleRadius;
    const tHorizEndX = tHorizStartX - 3;
    const tVertX = (tHorizStartX + tHorizEndX) / 2;
    const tVertYTop = y - 5;
    const tVertYBottom = y + 5;

    return (
      <>
        {fillColors.map((fill, i) => (
        <circle
          key={`${signalName || label}-${i}`}
          cx={startX + (i) * spacing}
          cy={signalY}
          r={circleRadius}
          fill={fill}
          stroke="white"
          strokeWidth="1"
        />
  ))}
        <line x1={x1 - circleRadius} y1={y} x2={x5 + circleRadius} y2={y} stroke="white" strokeWidth="1" />
        <circle cx={x5} cy={y} r={circleRadius} fill="none" stroke="white" strokeWidth="1" />
        <line x1={x5 - circleRadius} y1={y} x2={x6 + circleRadius} y2={y} stroke="white" strokeWidth="1" />
        <circle cx={x6} cy={y} r={circleRadius} fill="none" stroke="white" strokeWidth="1" />
        <text x={x6} y={y + 1} fill="white" fontSize="5" fontWeight="bold" textAnchor="middle">C</text>
        <line x1={tHorizStartX} y1={y} x2={tHorizEndX - 5} y2={y} stroke="white" strokeWidth="1" />
        <line x1={tVertX - 6} y1={tVertYTop + 2} x2={tVertX - 6} y2={tVertYBottom -2} stroke="white" strokeWidth="1" />

        {/* L-shaped connection to A circle */}
        <line x1={lConnectionX + 4} y1={y} x2={lConnectionX + 4}  y2={y + aCircleOffset} stroke="white" strokeWidth="1" />
        <line x1={lConnectionX + 4} y1={y + aCircleOffset} x2={lConnectionX + 11} y2={y + aCircleOffset} stroke="white" strokeWidth="1" />
        <circle cx={lConnectionX + 10 + circleRadius} cy={y + aCircleOffset} r={circleRadius} fill="none" stroke="white" strokeWidth="1" />
        <text x={lConnectionX + 10 + circleRadius} y={y + aCircleOffset + 2} fill="white" fontSize="6" fontFamily="Arial" fontWeight="bold" textAnchor="middle">A</text>
        <text x={startX - 50} y={y - 10} fill="#00bfff" fontSize="9" fontFamily="Arial">{label}</text>

        {/* Horizontal line after the last circle */}
        <line
          x1={startX - 1 + (fillColors.length - 1) * spacing + circleRadius + 2}
          y1={signalY }
          x2={startX + (fillColors.length -1 ) * spacing + circleRadius + 12}
          y2={signalY - 4}
          stroke="white"
          strokeWidth="1"
        />

        {/* Extra circle left of T-shape */}
        <circle
          cx={tHorizEndX - 10} // some space left of the T
          cy={y}
          r={3}
          fill="none"
          stroke="white"
          strokeWidth="0.5"
        />


      </>
    );
  };

  //S42/SH142,S4/SH104
  function DnMainLineSignalType2({ startX, label, lineY = dnMainLineY, initialColor = 'R', signalName }) {
  const { signalStates } = useSignalContext();

  const currentColor = signalStates && signalStates[signalName]
    ? signalStates[signalName]
    : initialColor;

  const fillColors = InitialColors(lineY, currentColor);
  const signalY = dnMainLineY - signalOffsetY;

  const spacing = 10;            // Adjust if your circles are closer/further
  const circleRadius = 4;        // Update if you're using a different size
  const shortLineLength = 5;

  const signalGroupOffsetX = -10; // Shift entire structure left or right

  // X positions for quadrant
  const x1 = startX;
  const x0 = x1 - 14;

  const rectX = x0 - 10 + signalGroupOffsetX;
  const rectY = signalY - 5;
  const rectWidth = 10;
  const rectHeight = 10;

  const quadLeftMidX = rectX;
  const quadLeftMidY = rectY + rectHeight / 2;

  // Midpoint for L-shape upward connector
  const lShapeX = (startX - circleRadius + rectX - 8 + rectWidth + 2 + signalGroupOffsetX) / 2;

  return (
    <>
      {/* Signal Circles */}
      {fillColors.map((fill, i) => (
        <circle
          key={`${signalName || label}-${i}`}
          cx={startX -4  + i * spacing + signalGroupOffsetX}
          cy={signalY}
          r={circleRadius}
          fill={fill}
          stroke="white"
          strokeWidth="1"
        />
      ))}

      {/* Horizontal connecting line between quadrant and circles */}
      <line
        x1={rectX - 1 + rectWidth}
        y1={signalY}
        x2={startX - 4 - circleRadius - 2 + signalGroupOffsetX + 2}
        y2={signalY}
        stroke="white"
        strokeWidth="1"
      />

      {/* Quadrant shape */}
      <path
        d={`
          M ${rectX} ${rectY}
          L ${rectX} ${rectY + rectHeight}
          L ${rectX + rectWidth} ${rectY + rectHeight}
          A ${rectWidth} ${rectHeight} 0 0 0 ${rectX} ${rectY}
          Z
        `}
        fill="none"
        stroke="white"
        strokeWidth="1"
      />

      {/* Small diagonal circles inside quadrant */}
      <circle
        cx={rectX + 3}
        cy={rectY + 7}
        r={1.2}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
      />
      <circle
        cx={rectX + 5}
        cy={rectY + 4}
        r={1.2}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
      />

      {/* T-shape lines */}
      <line
        x1={quadLeftMidX}
        y1={quadLeftMidY}
        x2={quadLeftMidX - shortLineLength}
        y2={quadLeftMidY}
        stroke="white"
        strokeWidth="1"
      />
      <line
        x1={quadLeftMidX - shortLineLength}
        y1={quadLeftMidY - 3}
        x2={quadLeftMidX - shortLineLength}
        y2={quadLeftMidY + 3}
        stroke="white"
        strokeWidth="1"
      />

      {/* Small circle to the left of T */}
      <circle
        cx={quadLeftMidX - shortLineLength - 5}
        cy={quadLeftMidY}
        r={3}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
      />

      {/* L-shape connector and labeled circle 'A' above */}
      <line
        x1={lShapeX}
        y1={signalY}
        x2={lShapeX }
        y2={signalY - 13}
        stroke="white"
        strokeWidth="1"
      />
      <line
        x1={lShapeX}
        y1={signalY - 13}
        x2={lShapeX + 8 + circleRadius - 1}
        y2={signalY - 13}
        stroke="white"
        strokeWidth="1"
      />
      <circle
        cx={lShapeX + 10 + circleRadius}
        cy={signalY - 13}
        r={circleRadius}
        fill="none"
        stroke="white"
        strokeWidth="1"
      />
      <text
        x={lShapeX + 10 + circleRadius}
        y={signalY - 13 + 2}
        fill="white"
        fontSize="6"
        fontFamily="Arial"
        fontWeight="bold"
        textAnchor="middle"
      >
        A
      </text>

      {/* Label for the signal */}
      <text
        x={startX - 70}
        y={signalY - 10}
        fill="#00bfff"
        fontSize="9"
        fontFamily="Arial"
      >
        {label}
      </text>
    </>
  );
}

function S2Signal({ startX, label, lineY = dnMainLineY, initialColor = 'R', signalName = "S2" }) {
  const { signalStates } = useSignalContext();

  const currentColor = signalStates && signalStates[signalName] ? signalStates[signalName] : initialColor;
  const fillColors = InitialColors(lineY, currentColor);

  const signalY = dnMainLineY - signalOffsetY;
  const spacing = 10;
  const circleRadius = 4;

  // Positioning
  const circlesStartX = startX + 45; // Shifted to right to make room on left
  const redCircleX = circlesStartX;

  // T-shape
  const tVertX = redCircleX - circleRadius - 10; // vertical line 10px left of red circle
  const tVertTopY = signalY - 4;
  const tVertBottomY = signalY + 4;
  const tHorizX1 = tVertX;
  const tHorizX2 = redCircleX - circleRadius;

  // Circle to the left of T-shape
  const singleCircleX = tVertX - 10;

  // A-circle and L-shape shifted to align perfectly
  const lShapeX = (tHorizX1 + tHorizX2) / 2 - 2;  // mid of horizontal T line (shifted left a bit)
  const aCircleX = lShapeX + 10 + circleRadius;
  const aCircleY = signalY - 13;

  return (
    <>
      {/* Circle left of T-shape */}
      <circle
        cx={singleCircleX + 8}
        cy={signalY}
        r={3}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
      />

      {/* T-shape */}
      <line
        x1={tVertX + 3}
        y1={tVertTopY + 1}
        x2={tVertX +3}
        y2={tVertBottomY  -1 }
        stroke="white"
        strokeWidth="1"
      />
      <line
        x1={tHorizX1 + 3}
        y1={signalY }
        x2={tHorizX2}
        y2={signalY}
        stroke="white"
        strokeWidth="1"
      />

      {/* 4 signal aspect circles */}
      {fillColors.map((fill, i) => (
        <circle
          key={`${signalName || label}-${i}`}
          cx={circlesStartX + i * spacing}
          cy={signalY}
          r={circleRadius}
          fill={fill}
          stroke="white"
          strokeWidth="1"
        />
      ))}

      {/* L-shape connector */}
      <line
        x1={lShapeX + 4}
        y1={signalY}
        x2={lShapeX + 4}
        y2={aCircleY}
        stroke="white"
        strokeWidth="1"
      />
      <line
        x1={lShapeX + 4 }
        y1={aCircleY}
        x2={aCircleX -4}
        y2={aCircleY}
        stroke="white"
        strokeWidth="1"
      />

      {/* A-circle */}
      <circle
        cx={aCircleX}
        cy={aCircleY}
        r={circleRadius}
        fill="none"
        stroke="white"
        strokeWidth="1"
      />
      <text
        x={aCircleX}
        y={aCircleY + 2}
        fill="white"
        fontSize="6"
        fontFamily="Arial"
        fontWeight="bold"
        textAnchor="middle"
      >
        A
      </text>

      {/* Label */}
      <text
        x={startX + 60}
        y={signalY - 10}
        fill="#00bfff"
        fontSize="9"
        fontFamily="Arial"
      >
        {label}
      </text>
    </>
  );
}




  // DN A3114 signal - FLIPPED ORDER without L-shape and A circle
  function A3114Signal ({startX, label = "A3114", lineY = dnMainLineY, initialColor = 'R', signalName = "A3114"}) {
    const { signalStates } = useSignalContext();

    // Get real-time color if available, otherwise use initial color
    const currentColor = signalStates && signalStates[signalName] ? signalStates[signalName] : initialColor;

    // Use InitialColors for correct aspect order
    const fillColors = InitialColors(lineY, currentColor);

    const signalY = lineY - signalOffsetY; // 12px above DN line

    // 4 circles starting after the single circle and horizontal line
    const circlesStartX = startX + 25; // Distance for horizontal line

    const tHorizStartX = startX + 6;
    const tHorizEndX = startX - 2; // left by 5 like shortLineLength
    const tVertX = tHorizEndX;     // vertical line at the end
    const tVertYTop = signalY - 3; // same as -3 from center
    const tVertYBottom = signalY + 3;


    // Single circle after T-shape
    const singleCircleX = startX + 10; // Closer to T-shape
    {/* Circle with "A" inside */}

    // Horizontal line connecting single circle to 4 circles
    const lineStartX = singleCircleX + circleRadius;
    const lineEndX = circlesStartX - circleRadius;

    return (
      <>
        {/* T-shape first - more visible */}
        <line x1={tHorizStartX} y1={signalY} x2={tHorizEndX} y2={signalY} stroke="white" strokeWidth="1" />
        <line x1={tVertX} y1={tVertYTop} x2={tVertX} y2={tVertYBottom} stroke="white" strokeWidth="1" />

       {/* Single circle with "A" inside */}
       <circle
       cx={singleCircleX}
       cy={signalY}
     r={circleRadius}
  fill="none"
  stroke="white"
  strokeWidth="1"
/>
<text
  x={singleCircleX}
  y={signalY + 2} // slightly adjusted for vertical centering
  fill="white"
  fontSize="6"
  fontFamily="Arial"
  fontWeight="bold"
  textAnchor="middle"
>
  A
</text>


        {/* Horizontal line connecting single circle to 4 circles */}
        <line x1={lineStartX} y1={signalY} x2={lineEndX} y2={signalY} stroke="white" strokeWidth="1" />

        {/* 4 circles with dynamic colors */}
        {fillColors.map((fill, i) => (
          <circle
            key={`${signalName || label}-${i}`}
            cx={circlesStartX + i * spacing}
            cy={signalY}
            r={circleRadius}
            fill={fill}
            stroke="white"
            strokeWidth="1"
          />
        ))}

        <text x={startX + 15} y={signalY - 10} fill="#00bfff" fontSize="9" fontFamily="Arial">{label}</text>
      </>
    );
  };




  // A3101
  function A3101Signal ({startX, label, lineY = upMainLineY, initialColor = 'R', signalName = label}) {
    const { signalStates } = useSignalContext();

    // Get real-time color if available, otherwise use initial color
    const currentColor =
      signalStates && signalStates[signalName]
        ? signalStates[signalName]
        : initialColor;

    // Use InitialColors for correct aspect order
    const fillColors = InitialColors(lineY + signalOffsetY, currentColor);

    const signalY = lineY + signalOffsetY; // 12px below UP line

    const x4 = startX + 3 * spacing;
    const x5 = x4 + spacing + 8;
    const y = signalY;
    const tHorizStartX = x5 + circleRadius;
    const tHorizEndX = tHorizStartX + 3;
    const tVertX = (tHorizStartX + tHorizEndX) / 2;
    const tVertYTop = y - 5;
    const tVertYBottom = y + 5;

    return (
      <>
        {fillColors.map((fill, i) => (
          <circle
            key={`${signalName || label}-${i}`}
            cx={startX + (3-i) * spacing}
            cy={signalY}
            r={circleRadius}
            fill={fill}
            stroke="white"
            strokeWidth="1"
          />
        ))}
        <line x1={x4 + circleRadius} y1={y} x2={x5 - circleRadius} y2={y} stroke="white" strokeWidth="1" />
        <circle
          cx={x5}
          cy={y}
          r={circleRadius}
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        <text
          x={x5}
          y={y + 2} // slight vertical centering adjustment
          fill="white"
          fontSize="6"
          fontFamily="Arial"
          fontWeight="bold"
          textAnchor="middle"
        >
          A
        </text>

        <line x1={x5 + circleRadius} y1={y } x2={x5 + circleRadius + 5 } y2={y} stroke="white" strokeWidth="1" />
        <line x1={tVertX + 3} y1={tVertYTop + 2  } x2={tVertX + 3} y2={tVertYBottom -2 } stroke="white" strokeWidth="1" />
        <text x={startX + 10} y={y + 15} fill="#00bfff" fontSize="9" fontFamily="Arial">{label}</text>
      </>
    );
  };

 // S1/C1
function S1C1Signal({ startX, label, lineY = upMainLineY, initialColor = 'R', signalName = label }) {
  const { signalStates } = useSignalContext();

  const currentColor =
    signalStates && signalStates[signalName]
      ? signalStates[signalName]
      : initialColor;

  const fillColors = InitialColors(lineY + signalOffsetY, currentColor);

  const signalY = lineY + signalOffsetY;
  const spacing = 10;
  const circleRadius = 4;
  const shortLineLength = 4;

  const aspectStartX = startX;

  const rightmostCircleX = aspectStartX + 3 * spacing;
  const emptyCircleX = rightmostCircleX + spacing + 4;
  const cCircleX = emptyCircleX + shortLineLength + spacing;

  const midAspectX = aspectStartX + (3 * spacing + spacing) / 2;
  const aOffsetY = 13;

  const tHorizStartX = cCircleX + circleRadius;
  const tHorizEndX = tHorizStartX + 6;
  const tVertX = tHorizEndX;
  const tVertTopY = signalY - 3;
  const tVertBottomY = signalY + 3;

  return (
    <>
      {/* 4 filled signal aspect circles */}
      {fillColors.map((fill, i) => (
        <circle
          key={`${signalName}-${i}`}
          cx={aspectStartX + (3 - i) * spacing}
          cy={signalY}
          r={circleRadius}
          fill={fill}
          stroke="white"
          strokeWidth="1"
        />
      ))}

      {/* Horizontal line to the left of first circle */}
<line
  x1={aspectStartX - 15}  // Start 10 units left of the circle
  y1={signalY + 4 }
  x2={aspectStartX - circleRadius}
  y2={signalY}
  stroke="white"
  strokeWidth="1"
/>


      {/* Horizontal line from RIGHTMOST circle to empty circle */}
      <line
        x1={rightmostCircleX + circleRadius }
        y1={signalY}
        x2={emptyCircleX - circleRadius + 2}
        y2={signalY}
        stroke="white"
        strokeWidth="1"
      />

      {/* Empty circle */}
      <circle
        cx={emptyCircleX + 2}
        cy={signalY}
        r={circleRadius}
        fill="none"
        stroke="white"
        strokeWidth="1"
      />

      {/* Small horizontal line to 'C' circle */}
      <line
        x1={emptyCircleX + circleRadius +2  }
        y1={signalY}
        x2={cCircleX - circleRadius}
        y2={signalY}
        stroke="white"
        strokeWidth="1"
      />
      {/* Circle with 'C' only ONCE */}
      <circle
        cx={cCircleX}
        cy={signalY}
        r={circleRadius}
        fill="none"
        stroke="white"
        strokeWidth="1"
      />
      <text
        x={cCircleX}
        y={signalY + 2}
        fill="white"
        fontSize="6"
        fontWeight="bold"
        textAnchor="middle"
      >
        C
      </text>

      
      {/* T-shape */}
      <line x1={tHorizStartX} y1={signalY} x2={tHorizEndX} y2={signalY} stroke="white" strokeWidth="1" />
      <line x1={tVertX} y1={tVertTopY} x2={tVertX} y2={tVertBottomY} stroke="white" strokeWidth="1" />

      {/* L-shape connector to "A" circle */}
      <line x1={midAspectX + 17 } y1={signalY} x2={midAspectX + 17} y2={signalY + aOffsetY} stroke="white" strokeWidth="1" />
      <line x1={midAspectX + 17} y1={signalY + aOffsetY} x2={midAspectX - 10 - circleRadius + 19} y2={signalY + aOffsetY} stroke="white" strokeWidth="1" />
      <circle cx={midAspectX - 10 - circleRadius + 15} cy={signalY + aOffsetY} r={circleRadius} fill="none" stroke="white" strokeWidth="1" />
      <text x={midAspectX - 10 - circleRadius +15} y={signalY + aOffsetY + 2} fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">A</text>

      <circle
  cx={aspectStartX + 73}  // Add spacing
  cy={signalY}
  r={3}
  fill="none"
  stroke="white"
  strokeWidth="0.5"
/>

      {/* Signal label */}
      <text x={startX + 43} y={signalY + 20} fill="#00bfff" fontSize="9" fontFamily="Arial">{label}</text>
    </>
  );
}


  function VerticalLineSignalWithCross ({startX, lineY}) {
    
        const signalY = lineY - 12; // 12px above the line (same as SH140)
        
        // Small vertical line
        const verticalLineLength = 8;
        
        // Horizontal line from middle of vertical line
        const horizontalLineLength = 12;
        const horizontalLineEndX = startX + horizontalLineLength;
        
        // Rectangle position
        const rectX = horizontalLineEndX;
        const rectY = signalY - 4;
        const rectWidth = 8;
        const rectHeight = 8;
        
        return (
          <>
            {/* Small vertical line */}
            <line 
              x1={startX} 
              y1={signalY - verticalLineLength/2} 
              x2={startX} 
              y2={signalY + verticalLineLength/2} 
              stroke="white" 
              strokeWidth="1" 
            />
            
            {/* Horizontal line from middle of vertical line */}
            <line 
              x1={startX} 
              y1={signalY} 
              x2={horizontalLineEndX} 
              y2={signalY} 
              stroke="white" 
              strokeWidth="1" 
            />
            
            {/* Rectangle */}
            <rect 
              x={rectX} 
              y={rectY} 
              width={rectWidth} 
              height={rectHeight} 
              fill="none" 
              stroke="white" 
              strokeWidth="1" 
            />
            
            {/* Cross inside rectangle */}
            <line 
              x1={rectX + 1} 
              y1={rectY + 1} 
              x2={rectX + rectWidth - 1} 
              y2={rectY + rectHeight - 1} 
              stroke="white" 
              strokeWidth="1" 
            />
            <line 
              x1={rectX + rectWidth - 1} 
              y1={rectY + 1} 
              x2={rectX + 1} 
              y2={rectY + rectHeight - 1} 
              stroke="white" 
              strokeWidth="1" 
            />
          </>
        );
      };
  
  // Render signal on vertical line with rectangle
  function VerticalLineSignal ({startX, lineY}) {
      const signalY = lineY - 12; // 12px above the line (same as SH140)
      
      // Small vertical line
      const verticalLineLength = 8;
      
      // Horizontal line from middle of vertical line
      const horizontalLineLength = 12;
      const horizontalLineEndX = startX + horizontalLineLength;
      
      // Rectangle position
      const rectX = horizontalLineEndX;
      const rectY = signalY - 4;
      const rectWidth = 8;
      const rectHeight = 8;
      
      return (
        <>
          {/* Small vertical line */}
          <line 
            x1={startX} 
            y1={signalY - verticalLineLength/2} 
            x2={startX} 
            y2={signalY + verticalLineLength/2} 
            stroke="white" 
            strokeWidth="1" 
          />
          
          {/* Horizontal line from middle of vertical line */}
          <line 
            x1={startX} 
            y1={signalY} 
            x2={horizontalLineEndX} 
            y2={signalY} 
            stroke="white" 
            strokeWidth="1" 
          />
          
          {/* Rectangle */}
          <rect 
            x={rectX} 
            y={rectY} 
            width={rectWidth} 
            height={rectHeight} 
            fill="none" 
            stroke="white" 
            strokeWidth="1" 
          />
          
          {/* Letters S and  B inside rectangle */}
          <text x={rectX + 2} y={rectY + 5} fill="white" fontSize="4" fontFamily="Arial" fontWeight="bold">S</text>
          <text x={rectX + 5} y={rectY + 5} fill="white" fontSize="4" fontFamily="Arial" fontWeight="bold">B</text>
        </>
      );
  };


  //S41/SH141,S97/SH197
  function UpMainLineSignalType2 ({startX, label , lineY = upMainLineY, initialColor = 'R', signalName = label}) {
    const { signalStates } = useSignalContext();

    // Get real-time color if available, otherwise use initial color
    const currentColor =
      signalStates && signalStates[signalName]
        ? signalStates[signalName]
        : initialColor;

    // Use InitialColors for correct aspect order
    const fillColors = InitialColors(lineY + signalOffsetY, currentColor);

    const signalY = lineY + signalOffsetY; // 12px below UP line

    const x4 = startX + 3 * spacing;
    const x5 = x4 + 10;
    const y = signalY;

    const rectX = x5;
    const rectY = y - 5;
    const rectWidth = 10;
    const rectHeight = 10;

    const midX = (x4 + circleRadius + x5) / 2;
    const aCircleY = y + 13;
    const verticalLineTopY = y;

    const quadRightMidX = rectX + rectWidth;
    const quadRightMidY = rectY + rectHeight / 2;
    const shortLineLength = 5;

    // Right-end small circle center
  const smallCircleX = quadRightMidX + shortLineLength + 3;
  const smallCircleY = quadRightMidY;

    return (
      <>
        {fillColors.map((fill, i) => (
          <circle
            key={`${signalName || label}-${i}`}
            cx={startX + (3-i) * spacing}
            cy={signalY}
            r={circleRadius}
            fill={fill}
            stroke="white"
            strokeWidth="1"
          />
        ))}

        {/* Line connecting circles to quadrant */}
        <line x1={x4 + circleRadius} y1={y} x2={x5} y2={y} stroke="white" strokeWidth="1" />

        {/* Quadrant (same design as original) */}
        <path
          d={`
            M ${rectX + rectWidth} ${rectY + rectHeight}
            A ${rectWidth} ${rectHeight} 0 0 1 ${rectX} ${rectY}
            L ${rectX} ${rectY}
            L ${rectX + rectWidth} ${rectY}
            Z
          `}
          fill="none"
          stroke="white"
          strokeWidth="1"
        />

        {/* Empty quadrant circles: diagonal positions */}
<circle
  cx={rectX + rectWidth - 3} // near 90° angle (bottom-right)
  cy={rectY + rectHeight - 7}
  r={1.2}
  fill="none"
  stroke="white"
  strokeWidth="0.5"
/>
<circle
  cx={rectX + 4} // near arc (top-left)
  cy={rectY + 6}
  r={1.2}
  fill="none"
  stroke="white"
  strokeWidth="0.5"
/>


        {/* L-shaped connection to A circle */}
        <line x1={midX} y1={verticalLineTopY } x2={midX} y2={aCircleY} stroke="white" strokeWidth="1" />
        <line x1={midX } y1={aCircleY} x2={midX - 10 - circleRadius + 4} y2={aCircleY} stroke="white" strokeWidth="1" />

        {/* A circle */}
        <circle cx={midX - 10 - circleRadius} cy={aCircleY} r={circleRadius} fill="none" stroke="white" strokeWidth="1" />
        <text x={midX - 10 - circleRadius} y={aCircleY + 2} fill="white" fontSize="6" fontFamily="Arial" fontWeight="bold" textAnchor="middle">A</text>

        {/* Horizontal line extending right from quadrant */}
        <line
          x1={quadRightMidX}
          y1={quadRightMidY}
          x2={quadRightMidX + shortLineLength}
          y2={quadRightMidY}
          stroke="white"
          strokeWidth="1"
        />

        {/* Vertical line at end of horizontal line */}
        <line
          x1={quadRightMidX + shortLineLength}
          y1={quadRightMidY - 3}
          x2={quadRightMidX + shortLineLength}
          y2={quadRightMidY + 3}
          stroke="white"
          strokeWidth="1"
        />

        {/* Small circle at the end of T-shape */}
      <circle
        cx={smallCircleX + 2}
        cy={smallCircleY}
        r={3}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
      />

        {/* Label */}
        <text x={startX + 40} y={y + 20} fill="#00bfff" fontSize="9" fontFamily="Arial">{label}</text>
      </>
    );
  };

  // S99
  function S99Signal ({startX, label, lineY = upMainLineY, initialColor = 'R', signalName = label}) {
    const { signalStates } = useSignalContext();

    // Get real-time color if available, otherwise use initial color
    const currentColor =
      signalStates && signalStates[signalName]
        ? signalStates[signalName]
        : initialColor;

    // Use InitialColors for correct aspect order
    const fillColors = InitialColors(lineY + signalOffsetY, currentColor);

    const signalY = lineY + signalOffsetY; // 12px below UP line

    const x4 = startX + 3 * spacing;
    const x5 = x4 + spacing + 8;
    const y = signalY;
    const tHorizStartX = x5 + circleRadius;
    const tHorizEndX = tHorizStartX + 3;
    const tVertX = (tHorizStartX + tHorizEndX) / 2;
    const tVertYTop = y - 5;
    const tVertYBottom = y + 5;

    // L-shaped connection with A circle (similar to S1/C1)
    const midX = (x4 + circleRadius + x5 - circleRadius) / 2;
    const aCircleOffset = 13;

    return (
      <>
        {fillColors.map((fill, i) => (
          <circle
            key={`${signalName || label}-${i}`}
            cx={startX + (3-i) * spacing}
            cy={signalY}
            r={circleRadius}
            fill={fill}
            stroke="white"
            strokeWidth="1"
          />
        ))}
        <line x1={x4 + circleRadius} y1={y} x2={x5 - circleRadius} y2={y} stroke="white" strokeWidth="1" />
        <line x1={tVertX - 9} y1={tVertYTop +2 } x2={tVertX - 9} y2={tVertYBottom - 2} stroke="white" strokeWidth="1" />

        <circle
  cx={tHorizEndX - 5}
  cy={y}
  r={3}
  fill="none"
  stroke="white"
  strokeWidth="0.5"
/>


        {/* L-shaped connection with A circle */}
        <line x1={midX} y1={y} x2={midX} y2={y + aCircleOffset} stroke="white" strokeWidth="1" />
        <line x1={midX } y1={y + aCircleOffset } x2={midX - 10 - circleRadius + 4} y2={y + aCircleOffset} stroke="white" strokeWidth="1" />
        <circle cx={midX - 10 - circleRadius } cy={y + aCircleOffset} r={circleRadius} fill="none" stroke="white" strokeWidth="1" />
        <text x={midX - 10 - circleRadius} y={y + aCircleOffset + 2} fill="white" fontSize="6" fontFamily="Arial" fontWeight="bold" textAnchor="middle">A</text>

        <text x={startX} y={y + 15} fill="#00bfff" fontSize="9" fontFamily="Arial">{label}</text>
      </>
    );
  };

  // for bottom track layouts only
  function DNSignal({ signalName, x, y, initialColor = 'R' }) {
  const { signalStates } = useSignalContext();
  const currentColor = signalStates?.[signalName] ?? initialColor;
  const fillPattern  = InitialColors(y, currentColor);

  // T‑shape
  const tStart = x, tEnd = x + 3, midX = (tStart + tEnd)/2;
  const tTop = y - 5, tBot = y + 5;
  // “A” circle link
  const singleX = tEnd + circleRadius;
  const lineStartX = singleX + circleRadius;
  const circlesStartX = x + 25;

  return (
    <g key={signalName}>
      {/* T‐shape */}
      <line x1={tStart + 8} y1={y} x2={tEnd + 2} y2={y} stroke="white" strokeWidth="1"/>
      <line x1={midX  + 3} y1={tTop + 2} x2={midX +3} y2={tBot -2 } stroke="white" strokeWidth="1"/>

      {/* A‐circle */}
      <circle cx={singleX + 5} cy={y} r={circleRadius} fill="none" stroke="white" strokeWidth="1"/>
      <text x={singleX + 5} y={y+2} fill="white" fontSize="6" textAnchor="middle">A</text>
      <line x1={lineStartX + 5} y1={y} x2={circlesStartX - circleRadius} y2={y} stroke="white" strokeWidth="1"/>

      {/* 4 aspect circles */}
      {fillPattern.map((fill, i) => (
        <circle
          key={i}
          cx={circlesStartX + i*spacing}
          cy={y}
          r={circleRadius}
          fill={fill}
          stroke="white"
          strokeWidth="1"
        />
      ))}

      {/* Signal name */}
      <text x={x + 15} y={y - 7} fill="#00bfff" fontSize="8">{signalName}</text>
    </g>
  );
}

// for bottom track layout only
function UPSignal({ signalName, x, y, initialColor = 'G' }) {
  const { signalStates } = useSignalContext();
  const currentColor = signalStates?.[signalName] ?? initialColor;
  const fillPattern  = InitialColors(y, currentColor);

  const x4 = x + 3*spacing;
  const x5 = x4 + spacing + 8;
  const tStart = x5 + circleRadius;
  const tEnd   = tStart + 3;
  const midX   = (tStart + tEnd)/2;
  const tTop   = y - 5, tBot = y + 5;

  return (
    <g key={signalName}>
      {/* 4 aspect circles */}
      {fillPattern.map((fill,i) => (
        <circle
          key={i}
          cx={x + (3-i)*spacing}
          cy={y}
          r={circleRadius}
          fill={fill}
          stroke="white"
          strokeWidth="1"
        />
      ))}

      {/* link and A‐circle */}
      <line x1={x4+circleRadius } y1={y} x2={x5 - circleRadius - 5} y2={y} stroke="white" strokeWidth="1"/>
      <circle cx={x5 - 5} cy={y} r={circleRadius} fill="none" stroke="white" strokeWidth="1"/>
      <text x={x5 - 5} y={y+2} fill="white" fontSize="6" textAnchor="middle">A</text>
      {/*<line x1={x5+circleRadius + 2} y1={y} x2={tStart} y2={y} stroke="white" strokeWidth="1"/>

      {/* T‐shape vertical */}
      <line x1={midX-3} y1={tTop +2 } x2={midX-3} y2={tBot - 2} stroke="white" strokeWidth="1"/>
      <line x1={midX - 7} y1={y} x2={midX- 4} y2={y} stroke="white" strokeWidth="1"/>


      {/* Signal name */}
      <text x={x} y={y + 20} fill="#00bfff" fontSize="8">{signalName}</text>
    </g>
  );
}
   
  export {
    ShuntUp,
    ShuntDown,
    UpLoopLineSignal,
    S98C98Signal,
    DnMainLineSignalType2,
    S2Signal,
    A3114Signal,
    A3101Signal,
    S1C1Signal,
    VerticalLineSignalWithCross,
    VerticalLineSignal,
    UpMainLineSignalType2,
    S99Signal,
    DnLoopLineSignal,
    InitialColors,
    DNSignal,
    UPSignal
  };