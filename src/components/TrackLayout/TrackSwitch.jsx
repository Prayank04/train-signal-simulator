import React from 'react';

const TrackSwitch = ({ 
  x, 
  y, 
  position = 'normal', 
  id, 
  active = false,
  onClick 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id, position === 'normal' ? 'reverse' : 'normal');
    }
  };

  return (
    <g transform={`translate(${x}, ${y})`} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <circle 
        r="8" 
        fill={active ? '#ff6b6b' : '#444'} 
        stroke={active ? '#fff' : '#666'} 
        strokeWidth="2"
        className="track-switch"
      />
      
      {/* Switch blade indicator */}
      {position === 'reverse' && (
        <line 
          x1="-12" 
          y1="0" 
          x2="12" 
          y2="0" 
          stroke="#ff6b6b" 
          strokeWidth="3"
        />
      )}
      
      {/* Switch ID label */}
      <text 
        x="0" 
        y="25" 
        textAnchor="middle" 
        className="track-text"
        fontSize="10"
      >
        {id}
      </text>
      
      {/* Active indicator */}
      {active && (
        <circle 
          r="12" 
          fill="none" 
          stroke="#00ff00" 
          strokeWidth="1" 
          opacity="0.8"
          className="animate-pulse"
        />
      )}
    </g>
  );
};

export default TrackSwitch;