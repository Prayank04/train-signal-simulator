import React, { useState } from 'react';

const RightControlPanel = () => {
  // State to track button states
  const [buttonStates, setButtonStates] = useState({
    reset: false,
    echyke: true,
    vlc1: true,
    vlc2: false,
    systemNormal: true,
    red: true,
    green: true,
    blue: true,
    fcoorReset: true,
    aggn: false,
    aggrn: false,
    block: false,
    unblock: false,
    keyIn: false,
    keyOut: false,
    allUnblock: false,
    egbs: false,
    errb: false,
    serrb: false,
    ebpu: false,
    ebpu14: false,
    gsb: false,
    gsrb: false,
    keyInGsb: false,
    keyMiddle: false,
  });

  const toggleButton = (buttonName) => {
    setButtonStates(prev => ({
      ...prev,
      [buttonName]: !prev[buttonName]
    }));
  };

  const CircleButton = ({ name, isActive, type = "complex", color = null }) => {
    if (type === "simple") {
      return (
        <button
          onClick={() => toggleButton(name)}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: '1px solid white',
            backgroundColor: color === 'red' 
              ? '#ef4444'
              : isActive 
                ? '#facc15' 
                : 'transparent',
            cursor: 'pointer'
          }}
        />
      );
    }
    
    // Complex button design with white outer ring and black center
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

  const ColorButton = ({ color, isActive }) => {
    const colorMap = {
      red: '#ef4444',
      green: '#22c55e',
      blue: '#3b82f6'
    };
    
    return (
      <button
        onClick={() => toggleButton(color)}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: colorMap[color],
          opacity: isActive ? 1 : 0.5,
          cursor: 'pointer',
          border: 'none'
        }}
      />
    );
  };

  const boxStyle = {
    border: '2px solid #9ca3af',
    backgroundColor: '#333333', // Match bottom track layout background
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50px'
  };

  const labelStyle = {
    color: '#22d3ee',
    fontSize: '8px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '2px 0'
  };

  return (
    <div 
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        backgroundColor: '#333333', // Match bottom track layout background
        padding: '8px',
        minWidth: '220px',
        transform: 'scale(0.7)', // Scale down the entire panel
        transformOrigin: 'top right'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '4px'
      }}>
        
        {/* Row 1 */}
        {/* EBPU 14 COUNTERS */}
        <div style={boxStyle}>
          <div style={labelStyle}>EBPU</div>
          <CircleButton name="ebpu14" isActive={buttonStates.ebpu14} type="simple" />
          <div style={{...labelStyle, fontSize: '9px'}}>14<br/>COUNTERS</div>
        </div>

        {/* RESET / RST DAC */}
        <div style={boxStyle}>
          <div style={labelStyle}>RESET</div>
          <CircleButton name="reset" isActive={buttonStates.reset} type="complex" />
          <div style={labelStyle}>RST DAC</div>
        </div>

        {/* ECHYKE */}
        <div style={boxStyle}>
          <div style={labelStyle}>ECHYKE</div>
          <CircleButton name="echyke" isActive={buttonStates.echyke} type="simple" />
        </div>

        {/* VLC1 VLC2 / SYSTEM STATUS */}
        <div style={boxStyle}>
          <div style={{...labelStyle, display: 'flex', gap: '12px'}}>
            <span>VLC1</span>
            <span>VLC2</span>
          </div>
          <div style={{display: 'flex', gap: '12px', margin: '8px 0'}}>
            <CircleButton name="vlc1" isActive={buttonStates.vlc1} type="simple" />
            <CircleButton name="vlc2" isActive={buttonStates.vlc2} type="simple" color="red" />
          </div>
          <div style={{...labelStyle, fontSize: '9px'}}>SYSTEM STATUS</div>
        </div>

        {/* Color buttons with R G B */}
        <div style={boxStyle}>
          <div style={{display: 'flex', gap: '8px', marginBottom: '8px'}}>
            <ColorButton color="red" isActive={buttonStates.red} />
            <ColorButton color="green" isActive={buttonStates.green} />
            <ColorButton color="blue" isActive={buttonStates.blue} />
          </div>
          <div style={{...labelStyle, display: 'flex', gap: '12px'}}>
            <span>R</span>
            <span>G</span>
            <span>B</span>
          </div>
        </div>

        {/* Row 2 */}
        {/* Empty space */}
        <div></div>

        {/* FCOOR RESET */}
        <div style={boxStyle}>
          <CircleButton name="fcoorReset" isActive={buttonStates.fcoorReset} type="simple" />
          <div style={{...labelStyle, fontSize: '9px'}}>FCOOR RESET</div>
        </div>

        {/* COMMON BUTTON (spans 2 columns) */}
        <div style={{...boxStyle, gridColumn: 'span 2'}}>
          <div style={{...labelStyle, display: 'flex', gap: '8px', fontSize: '9px'}}>
            <span>AGGN</span>
            <span>AGGRN</span>
            <span>BLOCK</span>
            <span>UNBLOCK</span>
          </div>
          <div style={{display: 'flex', gap: '8px', margin: '8px 0'}}>
            <CircleButton name="aggn" isActive={buttonStates.aggn} />
            <CircleButton name="aggrn" isActive={buttonStates.aggrn} />
            <CircleButton name="block" isActive={buttonStates.block} />
            <CircleButton name="unblock" isActive={buttonStates.unblock} />
          </div>
          <div style={{...labelStyle, fontSize: '9px'}}>COMMON BUTTON</div>
        </div>

        {/* KEY IN KEY OUT */}
        <div style={boxStyle}>
          <div style={{...labelStyle, display: 'flex', gap: '6px', fontSize: '9px'}}>
            <span>KEY IN</span>
            <span>KEY OUT</span>
          </div>
          <div style={{display: 'flex', gap: '8px', margin: '8px 0'}}>
            <CircleButton name="keyInGsb" isActive={true} type="simple" />
            <CircleButton name="keyMiddle" isActive={buttonStates.keyMiddle} type="complex" />
            <CircleButton name="keyOutGsb" isActive={false} type="simple" />
          </div>
          <div style={{...labelStyle, fontSize: '9px'}}>ON KEY</div>
        </div>

        {/* Row 3 */}
        {/* Empty space */}
        <div></div>

        {/* ALL UNBLOCK */}
        <div style={boxStyle}>
          <CircleButton name="allUnblock" isActive={buttonStates.allUnblock} />
          <div style={{...labelStyle, fontSize: '9px'}}>ALL UNBLOCK</div>
        </div>

        {/* EMERGENCY BUTTON (spans 2 columns) */}
        <div style={{...boxStyle, gridColumn: 'span 2'}}>
          <div style={{...labelStyle, display: 'flex', gap: '8px', fontSize: '9px'}}>
            <span>EGBS</span>
            <span>ERRB</span>
            <span>SERRB</span>
            <span>EBPU</span>
          </div>
          <div style={{display: 'flex', gap: '8px', margin: '8px 0'}}>
            <CircleButton name="egbs" isActive={buttonStates.egbs} />
            <CircleButton name="errb" isActive={buttonStates.errb} />
            <CircleButton name="serrb" isActive={buttonStates.serrb} />
            <CircleButton name="ebpu" isActive={buttonStates.ebpu} />
          </div>
          <div style={{...labelStyle, fontSize: '9px'}}>EMERGENCY BUTTON</div>
        </div>

        {/* GSB GSRB */}
        <div style={boxStyle}>
          <div style={{display: 'flex', gap: '8px', margin: '8px 0'}}>
            <CircleButton name="gsb" isActive={buttonStates.gsb} />
            <CircleButton name="gsrb" isActive={buttonStates.gsrb} />
          </div>
          <div style={{...labelStyle, display: 'flex', gap: '8px', fontSize: '9px'}}>
            <span>GSB</span>
            <span>GSRB</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RightControlPanel;