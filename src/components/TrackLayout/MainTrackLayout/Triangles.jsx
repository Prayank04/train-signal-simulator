import React from 'react';
import {
  DN_MAIN_LINE_ARROWS,
  DN_LOOP_LINE_ARROWS,
  UP_MAIN_LINE_ARROWS,
  UP_LOOP_LINE_ARROWS,
  YD_LINE_ARROW
} from '../../../utils/constants';

const Triangles = ({ dnMainLineY, dnLoopLineY, upMainLineY, upLoopLineY, yardLine }) => {
  const renderTriangle = (arrow, yPos, direction) => {
    const points = direction === 'left' 
      ? `${arrow.x},${yPos} ${arrow.x - 10},${yPos - 5} ${arrow.x - 10},${yPos + 5}`
      : `${arrow.x},${yPos} ${arrow.x + 10},${yPos - 5} ${arrow.x + 10},${yPos + 5}`;
    
    return (
      <g key={`${direction}-arrow-${arrow.x}`}>
        {/* White stroke first (behind) */}
        <polygon
          points={points}
          fill="#333333" // Dark fill color
          stroke="" // Match fill color for seamless cover
          strokeWidth="3" // Slightly wider than track line
        />
        {/* Sharp white border */}
        <polygon
          points={points}
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
      </g>
    );
  };

  return (
    <>
      {/* DN MAIN LINE */}
      {DN_MAIN_LINE_ARROWS.map(arrow => 
        renderTriangle(arrow, dnMainLineY, arrow.direction)
      )}

      {/* DN LOOP LINE */}
      {DN_LOOP_LINE_ARROWS.map(arrow => 
        renderTriangle(arrow, dnLoopLineY, arrow.direction)
      )}

      {/* UP MAIN LINE */}
      {UP_MAIN_LINE_ARROWS.map(arrow => 
        renderTriangle(arrow, upMainLineY, arrow.direction)
      )}

      {/* UP LOOP LINE */}
      {UP_LOOP_LINE_ARROWS.map(arrow => 
        renderTriangle(arrow, upLoopLineY, arrow.direction)
      )}

      {YD_LINE_ARROW.map(arrow =>
        renderTriangle(arrow, yardLine, arrow.direction)
      )}
    </>
  );
};

export default Triangles;