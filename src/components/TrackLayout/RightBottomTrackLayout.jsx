import React, {useContext} from 'react';
import { TRACK_LAYOUT_CONSTANTS, RIGHT_BOTTOM_LINE1_SECTIONS, RIGHT_BOTTOM_LINE2_SECTIONS, RIGHT_BOTTOM_LINE3_SECTIONS, RIGHT_BOTTOM_LINE4_SECTIONS } from './/../../utils/constants';
import { TrackContext, statusColors } from '../../context/TrackContext';
import { trackStatusToColor } from '../../utils/constants';
import VerticalSections from './MainTrackLayout/VerticalSections';
import TrackSection from './MainTrackLayout/TrackSection';
import { DNSignal, UPSignal } from './MainTrackLayout/signals';


const line1DNSignals = [
  { name: 'A3112', sectionIndex: 0, color: 'G' },  
  { name: 'A3110', sectionIndex: 2, color: 'G' },  
];

  const line4UPSignals = [
  { name: "A3103", sectionIndex: 1, color: "YY" }, 
  { name: "A3105", sectionIndex: 3, color: "G" }, 
];

 const {
    rightbot_lineStart,
    rightbot_lineEnd,
    bottom_line1_Y,
    bottom_line2_Y,
    bottom_line3_Y,
    bottom_line4_Y,
    designWidth,
  } = TRACK_LAYOUT_CONSTANTS;



const RightBottomTrackLayout = () => {
  const signalOffsetY = 12;  // Vertical offset for signal heads


  const { trackStates } = useContext(TrackContext);
  const getTrackColor = (trackId) => {
    return statusColors[trackStates[trackId]] || "white";
  };


  // You don't need to pull signalStates here—each render* helper will use useSignalContext internally.

  return (
    <div
      className="right-side-track-layout"
      style={{
        marginTop: '-185px',    // Align vertically with left bottom track
        marginLeft: '1040px',   // Position to the right
        position: 'absolute',
        border: '1px solid red',
      }}
    >
      <svg width="320" height="180" style={{ backgroundColor: "#333333" }}>


        {/* Bright dot at rightbot_lineStart (mapped to x=0) */}
<circle
  cx={0}
  cy={10}
  r={4}
  fill="lime"
>
  <title>rightbot_lineStart</title>
</circle>

{/* Bright dot at rightbot_lineEnd (mapped to end - start) */}
<circle
  cx={rightbot_lineEnd - rightbot_lineStart}
  cy={10}
  r={4}
  fill="red"
>
  <title>rightbot_lineEnd</title>
</circle>

        {/* DN and UP direction labels */}
        <text x= {rightbot_lineEnd - 50} y={bottom_line1_Y - 15} fill="yellow" fontSize="10">DN</text>
        <text x={rightbot_lineEnd - 50} y={bottom_line4_Y + 15} fill="yellow" fontSize="10">UP</text>

        {/* Four horizontal track lines 
        <line x1={-30} y1={lineY1} x2={220} y2={lineY1} stroke="white" strokeWidth="0" />
        <line x1={-30} y1={lineY2} x2={220} y2={lineY2} stroke="white" strokeWidth="0" />
        <line x1={-30} y1={lineY3} x2={220} y2={lineY3} stroke="white" strokeWidth="0" />
        <line x1={-30} y1={lineY4} x2={220} y2={lineY4} stroke="white" strokeWidth="0" />
        */}

        {/* DN Signals for Line 1 (placed just before even-indexed vertical sections) */}
        {line1DNSignals.map((signal) => {
          const section = RIGHT_BOTTOM_LINE1_SECTIONS[signal.sectionIndex];
          const x = (section?.x ?? 0) - rightbot_lineStart;

          return (
            <DNSignal
              key={signal.name}
              signalName={signal.name}
              x={x - 5}  // slightly before the section
              y={bottom_line1_Y - signalOffsetY}
              initialColor={signal.color}
            />
          );
        })}

        {/* UP Signals for Line 4 (placed just after odd-indexed vertical sections) */}
        {line4UPSignals.map((signal) => {
          const section = RIGHT_BOTTOM_LINE4_SECTIONS[signal.sectionIndex];
          const x = (section?.x ?? 0) - rightbot_lineStart;

          return (
            <UPSignal
              key={signal.name}
              signalName={signal.name}
              x={x + 5}  // slightly ahead of the section
              y={bottom_line4_Y + signalOffsetY}
              initialColor={signal.color}
            />
          );
        })}

        {/* Line 1 (Top) */}
        <TrackSection
          sections={RIGHT_BOTTOM_LINE1_SECTIONS}
          TSName="3114XT"
          lineY={bottom_line1_Y - 1.5}
          x1={1}
          x2={rightbot_lineStart}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

         <TrackSection
          sections={RIGHT_BOTTOM_LINE1_SECTIONS}
          TSName="3112XT"
          lineY={bottom_line1_Y + 1.5}
          x1={0}
          x2={3}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={RIGHT_BOTTOM_LINE1_SECTIONS}
          TSName="3110XT"
          lineY={bottom_line1_Y - 1.5}
          x1={2}
          x2={rightbot_lineEnd}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

         {/* Line 2 */}

         <TrackSection
          sections={RIGHT_BOTTOM_LINE2_SECTIONS}
          TSName="2AXT_3114XT"
          lineY={bottom_line2_Y - 1.5}
          x1={rightbot_lineStart}
          x2={1}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={RIGHT_BOTTOM_LINE2_SECTIONS}
          TSName="3112XT_3110XT"
          lineY={bottom_line2_Y + 1.5}
          x1={0}
          x2={rightbot_lineEnd}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* Line 3 */}
        
        <TrackSection
          sections={RIGHT_BOTTOM_LINE3_SECTIONS}
          TSName="3103XT_3101XT"
          lineY={bottom_line3_Y - 1.5}
          x1={rightbot_lineStart}
          x2={1}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={RIGHT_BOTTOM_LINE3_SECTIONS}
          TSName=""
          lineY={bottom_line3_Y - 1.5}
          x1={0}
          x2={rightbot_lineEnd}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* Line 4 */}

        <TrackSection
          sections={RIGHT_BOTTOM_LINE4_SECTIONS}
          TSName="3103XT"
          lineY={bottom_line4_Y - 1.5}
          x1={rightbot_lineStart}
          x2={1}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={RIGHT_BOTTOM_LINE4_SECTIONS}
          TSName="3105XT"
          lineY={bottom_line4_Y + 1.5}
          x1={0}
          x2={3}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={RIGHT_BOTTOM_LINE4_SECTIONS}
          TSName=""
          lineY={bottom_line4_Y - 1.5}
          x1={2}
          x2={rightbot_lineEnd}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />


        {/* Vertical section markers for Line 1 (DN) */}
        <VerticalSections
          sections={RIGHT_BOTTOM_LINE1_SECTIONS}
          lineY={bottom_line1_Y}
          lineKeyPrefix="rightbot-line1"
        />

        {/* Vertical section markers for Line 2 */}
        <VerticalSections
          sections={RIGHT_BOTTOM_LINE2_SECTIONS}
          lineY={bottom_line2_Y}
          lineKeyPrefix="rightbot-line2"
        />

        {/* Vertical section markers for Line 3 */}
        <VerticalSections
          sections={RIGHT_BOTTOM_LINE3_SECTIONS}
          lineY={bottom_line3_Y}
          lineKeyPrefix="rightbot-line3"
        />

        {/* Vertical section markers for Line 4 (UP) */}
        <VerticalSections
          sections={RIGHT_BOTTOM_LINE4_SECTIONS}
          lineY={bottom_line4_Y}
          lineKeyPrefix="rightbot-line4"
        />

      </svg>
    </div>
  );
};

export default RightBottomTrackLayout;
