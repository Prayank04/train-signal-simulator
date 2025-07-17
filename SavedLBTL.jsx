import React from 'react';
import { BASE_MAINLINE_START, BASE_MAINLINE_END } from './/../../utils/constants';

const LeftBottomTrackLayout = () => {
  const spacing = 80; // Distance between signals
  const circleRadius = 4;
  const lineY1 = 35;  // Top line 
  const lineY2 = 55;  // Second line 
  const lineY3 = 75;  // Third line 
  const lineY4 = 95;  // Bottom line
  const startX = 40;  // Starting X position (shifted left from 80)
  const signalOffsetY = 12;


  // Signal data for each line
  const line1Signals = [
    'A3221', 'A3222', 'A3220', 'A3218', 'A3216', 'A3114', 
    'A3212', 'A3210', 'A3208', 'A3206', 'A3204', 'A3202'
  ];

  const line2Signals = [
    'A3219', 'A3217', 'A3215', 'A3213', 'A3211', 'A3209',
    'A3207', 'A3205', 'A3203', 'A3201', 'A3199', 'A3197'
  ];

  const line3Signals = [
    'A3229', 'A3227', 'A3225', 'A3223', 'A3221', 'A3219',
    'A3217', 'A3215', 'A3213', 'A3211', 'A3209', 'A3207'
  ];

  const line4Signals = [
    'A3207', 'A3209', 'A3211', 'A3213', 'A3215', 'A3217',
    'A3219', 'A3221', 'A3223', 'A3225', 'A3227', 'A3229'
  ];

  // DN signal for first line - mirror image of UP signal (T-shape first, then circle, then 4 circles)
  const renderDNSignal = (signalName, x, y, fillPattern = [false, false, false, false]) => {
    const circles = [];
    const signalSpacing = 10; // 10px spacing between circles
    
    // 4 circles starting after the single circle and horizontal line
    const circlesStartX = x + 25; // Start circles after T-shape and single circle
    for (let i = 0; i < 4; i++) {
      circles.push(
        <circle
          key={`${signalName}-${i}`}
          cx={circlesStartX + i * signalSpacing}
          cy={y}
          r={circleRadius}
          fill={fillPattern[i] ? "green" : "none"}
          stroke="white"
          strokeWidth="1"
        />
      );
    }

    // T-shape at the beginning
    const tHorizStartX = x;
    const tHorizEndX = x + 3; // Same length as Line 4
    const tVertX = (tHorizStartX + tHorizEndX) / 2;
    const tVertYTop = y - 5; // Same length as Line 4
    const tVertYBottom = y + 5; // Same length as Line 4
    
    // Single circle with A - attached to T-shape
    const singleCircleX = tHorizEndX + circleRadius; // Position circle right after T-shape
    
    // Horizontal line connecting A circle to 4 circles
    const lineStartX = singleCircleX + circleRadius; // Start from A circle edge
    const lineEndX = circlesStartX - circleRadius;

    return (
      <g key={signalName}>
        {/* T-shape first */}
        <line x1={tHorizStartX} y1={y} x2={tHorizEndX} y2={y} stroke="white" strokeWidth="1" />
        <line x1={tVertX} y1={tVertYTop} x2={tVertX} y2={tVertYBottom} stroke="white" strokeWidth="1" />
        
        {/* Single circle with A - attached to T-shape */}
        <circle cx={singleCircleX} cy={y} r={circleRadius} fill="none" stroke="white" strokeWidth="1" />
        <text x={singleCircleX} y={y + 2} fill="white" fontSize="6" fontFamily="Arial" fontWeight="bold" textAnchor="middle">A</text>
        
        {/* Horizontal line connecting A circle to 4 circles */}
        <line x1={lineStartX} y1={y} x2={lineEndX} y2={y} stroke="white" strokeWidth="1" />
        
        {/* 4 circles */}
        {circles}
        
        <text x={x + 15} y={y - 12} fill="#00bfff" fontSize="8">{signalName}</text>
      </g>
    );
  };

  // UP signal for last line - adapted from renderUPSimpleSignalNoA
  const renderUPSignal = (signalName, x, y, fillPattern = [false, false, false, false]) => {
    const circles = [];
    const signalSpacing = 10; // 10px spacing between circles
    
    for (let i = 0; i < 4; i++) {
      circles.push(
        <circle
          key={`${signalName}-${i}`}
          cx={x + i * signalSpacing}
          cy={y}
          r={circleRadius}
          fill={fillPattern[i] ? "green" : "none"}
          stroke="white"
          strokeWidth="1"
        />
      );
    }

    const x4 = x + 3 * signalSpacing;
    const x5 = x4 + signalSpacing + 8;
    const tHorizStartX = x5 + circleRadius;
    const tHorizEndX = tHorizStartX + 3;
    const tVertX = (tHorizStartX + tHorizEndX) / 2;
    const tVertYTop = y - 5;
    const tVertYBottom = y + 5;

    return (
      <g key={signalName}>
        {circles}
        <line x1={x4 + circleRadius} y1={y} x2={x5 - circleRadius} y2={y} stroke="white" strokeWidth="1" />
        <circle cx={x5} cy={y} r={circleRadius} fill="none" stroke="white" strokeWidth="1" />
        <text x={x5} y={y + 2} fill="white" fontSize="6" fontFamily="Arial" fontWeight="bold" textAnchor="middle">A</text>
        <line x1={x5 + circleRadius} y1={y} x2={x5 + circleRadius + 3} y2={y} stroke="white" strokeWidth="1" />
        <line x1={tVertX} y1={tVertYTop} x2={tVertX} y2={tVertYBottom} stroke="white" strokeWidth="1" />
        
        <text x={x} y={y + 25} fill="#00bfff" fontSize="8">{signalName}</text>
      </g>
    );
  };

  return (
    <div className="bottom-track-layout" style={{ marginTop: '-100px' }}>
      <svg width="1200" height="180" style={{ backgroundColor: "#333333" }}>
        
        {/* Four horizontal track lines */}
        <line x1={BASE_MAINLINE_START - 25} y1={lineY1} x2={BASE_MAINLINE_END - 475} y2={lineY1} stroke="white" strokeWidth="3" />
        <line x1={BASE_MAINLINE_START - 25} y1={lineY2} x2={BASE_MAINLINE_END - 475} y2={lineY2} stroke="white" strokeWidth="3" />
        <line x1={BASE_MAINLINE_START - 25} y1={lineY3} x2={BASE_MAINLINE_END - 475} y2={lineY3} stroke="white" strokeWidth="3" />
        <line x1={BASE_MAINLINE_START - 25} y1={lineY4} x2={BASE_MAINLINE_END - 475} y2={lineY4} stroke="white" strokeWidth="3" />

        {/* DN and UP direction labels */}
        <text x={15} y={lineY1 + 5} fill="yellow" fontSize="10">DN</text>
        <text x={15} y={lineY4 + 5} fill="yellow" fontSize="10">UP</text>

        {/* Line 1 Signals - Mirror image of Line 4 (T-shape first) */}
        {line1Signals.map((signal, index) => {
          const fillPattern = signal === 'A3114' ? [false, false, true, false] : 
                            signal === 'A3202' ? [false, false, false, true] :
                            [false, true, false, false];
          return renderDNSignal(signal, startX + index * spacing, lineY1 - signalOffsetY, fillPattern);
        })}

        {/* Line 2 Signals - Removed */}
        
        {/* Line 3 Signals - Removed */}

        {/* Line 4 Signals - Using UP signal logic */}
        {line4Signals.map((signal, index) => {
          const fillPattern = signal === 'A3229' ? [false, false, false, true] :
                            [false, true, false, false];
          return renderUPSignal(signal, startX + index * spacing, lineY4 + signalOffsetY, fillPattern);
        })}

        {/* Vertical lines on DN line (Line 1) - 24 lines */}
        {[
          (BASE_MAINLINE_START - 25) + (1.85) * ((BASE_MAINLINE_END - 475) - (BASE_MAINLINE_START - 25))/ 24, (BASE_MAINLINE_START - 25) + (1.5) * ((BASE_MAINLINE_END - 475) - (BASE_MAINLINE_START - 25))/ 24, 124, 132, 204, 212, 284, 292, 364, 372, 444, 452,
          524, 532, 604, 612, 684, 692, 764, 772, 844, 852, 924, 932
        ].map((xPos, index) => (
          <line
            key={`dn-line1-${index}`}
            x1={xPos}
            y1={lineY1 - 6}
            x2={xPos}
            y2={lineY1 + 6}
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Vertical lines on Line 2 - 12 lines (alternating pairs) */}
        {[
          44, 52, 204, 212, 364, 372, 524, 532, 684, 692, 844, 852
        ].map((xPos, index) => (
          <line
            key={`line2-${index}`}
            x1={xPos}
            y1={lineY2 - 6}
            x2={xPos}
            y2={lineY2 + 6}
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Vertical lines on Line 3 - 12 lines (alternating pairs) */}
        {[
          82, 99, 242, 259, 402, 419, 562, 579, 722, 739, 882, 899
        ].map((xPos, index) => (
          <line
            key={`line3-${index}`}
            x1={xPos}
            y1={lineY3 - 6}
            x2={xPos}
            y2={lineY3 + 6}
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Vertical lines on UP line (Line 4) - 24 lines */}
        {[
          82, 99, 162, 179, 242, 259, 322, 339, 402, 419, 482, 499,
          562, 579, 642, 659, 722, 739, 802, 819, 882, 899, 962, 979
        ].map((xPos, index) => (
          <line
            key={`up-line4-${index}`}
            x1={xPos}
            y1={lineY4 - 6}
            x2={xPos}
            y2={lineY4 + 6}
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* XT Labels between signals on Line 1 */}
        {line1Signals.map((signal, index) => {
          if (index < line1Signals.length - 1) { // Don't create label after last signal
            const signalX = startX + index * spacing;
            const nextSignalX = startX + (index + 1) * spacing;
            
            // Calculate positions for current signal's second line and next signal's first line
            const currentACircleX = signalX + 3 + circleRadius;
            const nextACircleX = nextSignalX + 3 + circleRadius;
            const currentSecondLineX = currentACircleX + circleRadius;
            const nextFirstLineX = nextACircleX - circleRadius - 1;
            
            // Position label between these two lines
            const labelX = (currentSecondLineX + nextFirstLineX) / 2;
            
            // Generate XT label: 3224XT, 3222XT, 3220XT, etc.
            const xtNumber = 3224 - (index * 2);
            const xtLabel = `${xtNumber}XT`;
            
            return (
              <text 
                key={`xt-label-${index}`}
                x={labelX} 
                y={lineY1 + 8} 
                fill="#00bfff" 
                fontSize="7" 
                textAnchor="middle"
              >
                {xtLabel}
              </text>
            );
          }
          return null;
        })}

        {/* XT Labels for Line 2 - between vertical line pairs */}
        {[
          { x1: 52, x2: 204, label: '3224XT_3222XT' },
          { x1: 212, x2: 364, label: '3220XT_3218XT' },
          { x1: 372, x2: 524, label: '3216XT_3214XT' },
          { x1: 532, x2: 684, label: '3212XT_3210XT' },
          { x1: 692, x2: 844, label: '3208XT_3206XT' },
          { x1: 852, x2: 960, label: '3204XT_3202XT' }
        ].map((item, index) => {
          const labelX = (item.x1 + item.x2) / 2;
          return (
            <text 
              key={`line2-xt-label-${index}`}
              x={labelX} 
              y={lineY2 - 8} 
              fill="#00bfff" 
              fontSize="7" 
              textAnchor="middle"
            >
              {item.label}
            </text>
          );
        })}

        {/* XT Labels for Line 3 - between and before vertical line pairs */}
        {[
          { x: 35, label: '3207XT_3205XT' }, // Before first vertical line
          { x1: 99, x2: 242, label: '3211XT_3209XT' }, // After 2nd vertical line and first vertical line of second pair
          { x1: 259, x2: 402, label: '3215XT_3213XT' },
          { x1: 419, x2: 562, label: '3219XT_3217XT' },
          { x1: 579, x2: 722, label: '3223XT_3221XT' },
          { x1: 739, x2: 882, label: '3227XT_3225XT' },
          { x: 940.5, label: '99XT_3229XT' } // After last vertical line
        ].map((item, index) => {
          const labelX = item.x1 ? (item.x1 + item.x2) / 2 : item.x;
          return (
            <text 
              key={`line3-xt-label-${index}`}
              x={labelX} 
              y={lineY3 - 8} 
              fill="#00bfff" 
              fontSize="7" 
              textAnchor="middle"
            >
              {item.label}
            </text>
          );
        })}

        {/* XT Labels for Line 4 - individual labels positioned between vertical line pairs */}
        {[
          { x: 35, label: '3207XT' }, // Before first vertical line
          { x1: 99, x2: 162, label: '3209XT' }, // After vertical line 2 and before vertical line 1 of pair 2
          { x1: 179, x2: 242, label: '3211XT' },
          { x1: 259, x2: 322, label: '3213XT' },
          { x1: 339, x2: 402, label: '3215XT' },
          { x1: 419, x2: 482, label: '3217XT' },
          { x1: 499, x2: 562, label: '3219XT' },
          { x1: 579, x2: 642, label: '3221XT' },
          { x1: 659, x2: 722, label: '3223XT' },
          { x1: 739, x2: 802, label: '3225XT' },
          { x1: 819, x2: 882, label: '3227XT' },
          { x1: 899, x2: 962, label: '3229XT' },
          { x: 1020.5, label: '99XT' } // After last vertical line
        ].map((item, index) => {
          const labelX = item.x1 ? (item.x1 + item.x2) / 2 : item.x;
          return (
            <text 
              key={`line4-xt-label-${index}`}
              x={labelX} 
              y={lineY4 - 8} 
              fill="#00bfff" 
              fontSize="7" 
              textAnchor="middle"
            >
              {item.label}
            </text>
          );
        })}

        {/* Distance marker */}
        <text x={600} y={140} fill="white" fontSize="9" textAnchor="middle">
          (/SPL/ CLASS NEW MARWAR(RS) AT A DISTANCE OF Km 35.789)
        </text>

        {/* Track identification labels */}
        <text x={20} y={lineY1 - 5} fill="yellow" fontSize="8">Line 1</text>
        <text x={20} y={lineY2 - 5} fill="yellow" fontSize="8">Line 2</text>
        <text x={20} y={lineY3 - 5} fill="yellow" fontSize="8">Line 3</text>
        <text x={20} y={lineY4 - 5} fill="yellow" fontSize="8">Line 4</text>

      </svg>
    </div>
  );
};

export default LeftBottomTrackLayout;