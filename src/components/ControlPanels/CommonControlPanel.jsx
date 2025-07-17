import React, { useState } from 'react';
import { TRACK_LAYOUT_CONSTANTS } from '../../utils/constants';

const CommonControlPanel = () => {
  // State for button controls
  const [buttonStates, setButtonStates] = useState({
    // Left Side
    topLeftCnln: false,
    bottomLeftMind: false,
    bottomLeftComplex: false,
    
    // Right Side
    topRightHprn: false,
    topRightComplex: false,
    bottomRightCnln: false
  });

  const toggleButton = (buttonName) => {
    setButtonStates(prev => ({
      ...prev,
      [buttonName]: !prev[buttonName]
    }));
  };

  // Simple circle button
  const SimpleButton = ({ name, isActive }) => {
    return (
      <button
        onClick={() => toggleButton(name)}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          border: '1px solid white',
          backgroundColor: isActive ? '#facc15' : 'transparent',
          cursor: 'pointer'
        }}
      />
    );
  };

  // Complex button (white with black center)
  const ComplexButton = ({ name, isActive }) => {
    return (
      <button
        onClick={() => toggleButton(name)}
        style={{
          position: 'relative',
          width: '14px',
          height: '14px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: 'none'
        }}
      >
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
      </button>
    );
  };

  const boxStyle = {
    border: '2px solid #9ca3af',
    backgroundColor: '#333333',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '50px', // Increased height for bottom block
    minWidth: '80px'
  };

  const labelStyle = {
    color: '#22d3ee',
    fontSize: '8px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '2px 0'
  };

  const arrowStyle = {
    color: '#22d3ee',
    fontSize: '12px',
    fontWeight: 'bold'
  };




  return (
    <>
      
        {/* Block Near Down Loop Line - Left Side */}
<div style={{
  position: 'absolute',
  top: TRACK_LAYOUT_CONSTANTS.dnLoopLineY + 165,
  left: '10px',
  zIndex: 1000,
  transform: 'scale(0.8)'
}}>
  <div style={boxStyle}>
    <div style={labelStyle}>CNLN<br />LVV</div>
    <SimpleButton name="topLeftCnln" isActive={buttonStates.topLeftCnln} />

    {/* DN LINE and arrow on same line */}
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '4px' }}>
      <div style={labelStyle}>DN LINE</div>
      <div style={{ ...arrowStyle, marginLeft: '8px' }}>→</div>
    </div>
  </div>
</div>


       {/* Block Near Up Loop Line - Left Side */}
<div style={{
  position: 'absolute',
  top: TRACK_LAYOUT_CONSTANTS.upLoopLineY + 220,
  left: '10px',
  zIndex: 1000,
  transform: 'scale(0.8)'
}}>
  <div style={boxStyle}>
    
    {/* Horizontal layout for LVV and RESET buttons */}
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      
      {/* Left side: MIND LVV */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
        <div style={labelStyle}>MIND<br />LVV</div>
        <SimpleButton name="bottomLeftMind" isActive={buttonStates.bottomLeftMind} />
      </div>

      {/* Right side: MIND RESET */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={labelStyle}>MIND<br />RESET</div>
        <ComplexButton name="bottomLeftComplex" isActive={buttonStates.bottomLeftComplex} />
      </div>

    </div>

    {/* Arrow and UP LINE in same horizontal row */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
      <div style={{ ...arrowStyle, marginRight: '10px' }}>←</div>
      <div style={labelStyle}>UP LINE</div>
    </div>

  </div>
</div>



       {/* Block Near Down Loop Line - Right Side */}
<div style={{
  position: 'absolute',
  top: TRACK_LAYOUT_CONSTANTS.dnLoopLineY + 140,
  right: '10px',
  zIndex: 1000,
  transform: 'scale(0.8)'
}}>
  <div style={boxStyle}>

    {/* Horizontal layout for LVV and RESET buttons */}
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      
      {/* Left side: HPRN LVV */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
        <div style={labelStyle}>HPRN<br />LVV</div>
        <SimpleButton name="topRightHprn" isActive={buttonStates.topRightHprn} />
      </div>

      {/* Right side: HPRN RESET */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={labelStyle}>HPRN<br />RESET</div>
        <ComplexButton name="topRightComplex" isActive={buttonStates.topRightComplex} />
      </div>

    </div>

    {/* DN LINE and arrow side-by-side */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
      <div style={labelStyle}>DN LINE</div>
      <div style={{ ...arrowStyle, marginLeft: '10px' }}>→</div>
    </div>

  </div>
</div>


        {/* Block Near Up Loop Line - Right Side */}
<div style={{
  position: 'absolute',
  top: TRACK_LAYOUT_CONSTANTS.upLoopLineY + 220,
  right: '10px',
  zIndex: 1000,
  transform: 'scale(0.8)'
}}>
  <div style={boxStyle}>
    <div style={labelStyle}>CNLN<br />LVV</div>
    <SimpleButton name="bottomRightCnln" isActive={buttonStates.bottomRightCnln} />

    {/* Arrow and label in same row */}
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '4px' }}>
      <div style={{ ...arrowStyle, marginRight: '8px' }}>←</div>
      <div style={labelStyle}>UP LINE</div>
    </div>
  </div>
</div>

    </>
  );
};

export default CommonControlPanel;