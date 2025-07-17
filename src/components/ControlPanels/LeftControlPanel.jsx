import React, { useState } from 'react';

const LeftControlPanel = () => {
  // State to track which points are active
  const [pointStates, setPointStates] = useState({
    298: { in: true, free: false, out: false },
    296: { in: true, free: false, out: false },
    294: { in: true, free: false, out: false },
    249: { in: true, free: false, out: false },
    247: { in: true, free: false, out: false },
    242: { in: true, free: false, out: false },
    205: { in: true, free: false, out: false },
    203: { in: true, free: false, out: false },
    202: { in: true, free: false, out: false }
  });

  const togglePointState = (pointId, type) => {
    setPointStates(prev => ({
      ...prev,
      [pointId]: {
        ...prev[pointId],
        [type]: !prev[pointId][type]
      }
    }));
  };

  // Simple circle button for IN/FREE/OUT
  const SimpleButton = ({ isActive, onClick }) => {
    return (
      <button
        onClick={onClick}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          border: '1px solid white',
          backgroundColor: isActive ? '#333333' : 'transparent',
          cursor: 'pointer'
        }}
      />
    );
  };

  // Complex button for CH controls (white with black center)
  const ComplexButton = () => {
    return (
      <div style={{
        position: 'relative',
        width: '14px',
        height: '14px'
      }}>
        <div style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '1px solid #9ca3af'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '3px',
          left: '3px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'black'
        }}></div>
      </div>
    );
  };

  const PointControl = ({ pointId }) => {
    const state = pointStates[pointId];
    
    // Determine CHG number based on point ID
    const getChgNumber = (id) => {
      const chgMap = {
        298: '98', 296: '96', 294: '94',
        249: '49', 247: '47', 242: '42',
        205: '05', 203: '03', 202: '02'
      };
      return chgMap[id] || '0';
    };

    const labelStyle = {
      color: '#22d3ee',
      fontSize: '8px',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '2px 0'
    };
    
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60px',
        padding: '4px'
      }}>
        {/* IN FREE OUT labels */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          ...labelStyle,
          marginBottom: '4px'
        }}>
          <span>IN</span>
          <span>FREE</span>
          <span>OUT</span>
        </div>
        
        {/* Control buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '8px'
        }}>
          <SimpleButton
            isActive={state.in}
            onClick={() => togglePointState(pointId, 'in')}
          />
          <SimpleButton
            isActive={state.free}
            onClick={() => togglePointState(pointId, 'free')}
          />
          <SimpleButton
            isActive={state.out}
            onClick={() => togglePointState(pointId, 'out')}
          />
        </div>
        
        {/* Point labels with button */}
        <div style={{
          ...labelStyle,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>CH{getChgNumber(pointId)}</span>
            <ComplexButton />
          </div>
          <div>POINT {pointId}</div>
        </div>
      </div>
    );
  };

  const boxStyle = {
    border: '2px solid #9ca3af',
    backgroundColor: '#333333', // Match bottom track layout background
    padding: '8px',
    display: 'flex',
    minHeight: '50px'
  };

  return (
    <div style={{
      position: 'absolute',
      top: '140px', // Moved down from 10px to position near main track
      left: '50px',
      zIndex: 1000,
      backgroundColor: '#333333',
      padding: '8px',
      transform: 'scale(0.7)',
      transformOrigin: 'top left'
    }}>
      <div style={{
        display: 'flex',
        gap: '4px'
      }}>
        {/* First Rectangle - Points 298, 296, 294 */}
        <div style={boxStyle}>
          <PointControl pointId={298} />
          <PointControl pointId={296} />
          <PointControl pointId={294} />
        </div>

        {/* Second Rectangle - Points 249, 247, 242 */}
        <div style={boxStyle}>
          <PointControl pointId={249} />
          <PointControl pointId={247} />
          <PointControl pointId={242} />
        </div>

        {/* Third Rectangle - Points 205, 203, 202 */}
        <div style={boxStyle}>
          <PointControl pointId={205} />
          <PointControl pointId={203} />
          <PointControl pointId={202} />
        </div>
      </div>
    </div>
  );
};

export default LeftControlPanel;