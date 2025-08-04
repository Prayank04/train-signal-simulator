import React, {useContext} from 'react';
import { TRACK_LAYOUT_CONSTANTS, LEFT_BOTTOM_LINE1_SECTIONS, LEFT_BOTTOM_LINE2_SECTIONS, LEFT_BOTTOM_LINE3_SECTIONS, LEFT_BOTTOM_LINE4_SECTIONS, RIGHT_BOTTOM_LINE1_SECTIONS, RIGHT_BOTTOM_LINE2_SECTIONS, RIGHT_BOTTOM_LINE3_SECTIONS, RIGHT_BOTTOM_LINE4_SECTIONS} from '../../utils/constants';
import { TrackContext, statusColors } from '../../context/TrackContext';
import VerticalSections from './MainTrackLayout/VerticalSections';
import TrackSection from './MainTrackLayout/TrackSection';
import { DNSignal, UPSignal } from './MainTrackLayout/signals';

 // Signal data for each line
const Leftline1DNSignals = [
  { name: 'A3224', sectionIndex: 0, color: 'G' },   // before sec 1
  { name: 'A3222', sectionIndex: 2, color: 'G' },   // before sec 2
  { name: 'A3220', sectionIndex: 4, color: 'G' },
  { name: 'A3218', sectionIndex: 6, color: 'G' },
  { name: 'A3216', sectionIndex: 8, color: 'G' },
  { name: 'A3214', sectionIndex: 10, color: 'G' },
  { name: 'A3212', sectionIndex: 12, color: 'G' },
  { name: 'A3210', sectionIndex: 14, color: 'G' },
  { name: 'A3208', sectionIndex: 16, color: 'G' },
  { name: 'A3206', sectionIndex: 18, color: 'G' },
  { name: 'A3204', sectionIndex: 20, color: 'YY' },
  { name: 'A3202', sectionIndex: 22, color: 'Y' },
];

const Rightline1DNSignals = [
  { name: 'A3112', sectionIndex: 0, color: 'G' },  
  { name: 'A3110', sectionIndex: 2, color: 'G' },  
]

  const Leftline4UPSignals = [
  { name: "A3207", sectionIndex: 1, color: "G" },  // behind sec 2
  { name: "A3209", sectionIndex: 3, color: "G" },  // behind sec 4
  { name: "A3211", sectionIndex: 5, color: "G" },  // behind sec 6
  { name: "A3213", sectionIndex: 7, color: "G" },  // behind sec 8
  { name: "A3215", sectionIndex: 9, color: "G" },  // behind sec 10
  { name: "A3217", sectionIndex: 11, color: "G" }, // behind sec 12
  { name: "A3219", sectionIndex: 13, color: "G" }, // behind sec 14
  { name: "A3221", sectionIndex: 15, color: "G" }, // behind sec 16
  { name: "A3223", sectionIndex: 17, color: "G" }, // behind sec 18
  { name: "A3225", sectionIndex: 19, color: "G" }, // behind sec 20
  { name: "A3227", sectionIndex: 21, color: "G" }, // behind sec 22
  { name: "A3229", sectionIndex: 23, color: "G" },  // behind sec 24
];

const Rightline4UPSignals = [
  { name: "A3103", sectionIndex: 1, color: "YY" }, 
  { name: "A3105", sectionIndex: 3, color: "G" }, 
];




 const {
    leftbot_lineStart,
    rightbot_lineStart,
    leftbot_lineEnd,
    rightbot_lineEnd,
    bottom_line1_Y,
    bottom_line2_Y,
    bottom_line3_Y,
    bottom_line4_Y,
  } = TRACK_LAYOUT_CONSTANTS;


const BottomTrackLayout = () => {
  const signalOffsetY = 20;


const { trackStates } = useContext(TrackContext);
  const getTrackColor = (trackId) => {
    return statusColors[trackStates[trackId]] || "white";
  };

  
  return (
    <div className="bottom-track-layout" style={{ marginTop: '-100px'}}>
      <svg width="1380" height="300" 
      viewBox="0 -20 1380 300"
      style={{ backgroundColor: "#333333", overflow: 'visible' }}>
        

        {/* DN and UP direction labels */}
        <text x= {leftbot_lineStart + 5} y={bottom_line1_Y - 15} fill="yellow" fontSize="10">DN</text>
        <text x={leftbot_lineStart + 5} y={bottom_line4_Y + 15} fill="yellow" fontSize="10">UP</text>

        <text x= {rightbot_lineEnd - 15} y={bottom_line1_Y - 15} fill="yellow" fontSize="10">DN</text>
        <text x={rightbot_lineEnd - 15} y={bottom_line4_Y + 15} fill="yellow" fontSize="10">UP</text>


        {/* dashed guide‐line: left top track */}
          {/* the dashed line */}
          <line
            x1={leftbot_lineStart}
            y1={bottom_line1_Y - 50}
            x2={leftbot_lineEnd}
            y2={bottom_line1_Y - 50}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

          <line
            x1={leftbot_lineStart}
            y1={bottom_line1_Y - 50}
            x2={leftbot_lineStart}
            y2={bottom_line1_Y - 10}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

          <line
            x1={LEFT_BOTTOM_LINE1_SECTIONS[6].x - 5}
            y1={bottom_line1_Y - 50}
            x2={LEFT_BOTTOM_LINE1_SECTIONS[6].x - 5}
            y2={bottom_line1_Y - 10}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

          <line
            x1={LEFT_BOTTOM_LINE1_SECTIONS[12].x - 5}
            y1={bottom_line1_Y - 50}
            x2={LEFT_BOTTOM_LINE1_SECTIONS[12].x - 5}
            y2={bottom_line1_Y - 10}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />  

          <line
            x1={LEFT_BOTTOM_LINE1_SECTIONS[18].x - 5}
            y1={bottom_line1_Y - 50}
            x2={LEFT_BOTTOM_LINE1_SECTIONS[18].x - 5}
            y2={bottom_line1_Y - 10}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

           <text
            x={(leftbot_lineStart + (LEFT_BOTTOM_LINE1_SECTIONS[6].x -5)) / 2}
            y={bottom_line1_Y - 58}            // nudge the text a bit above the dashes
            fill="#00bfff"
            fontSize="10"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ALH-062
          </text>

          <text
            x={( (LEFT_BOTTOM_LINE1_SECTIONS[6].x -5) + (LEFT_BOTTOM_LINE1_SECTIONS[12].x -5)) / 2}
            y={bottom_line1_Y - 58}            // nudge the text a bit above the dashes
            fill="#00bfff"
            fontSize="10"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ALH-061
          </text>

          <text
            x={( (LEFT_BOTTOM_LINE1_SECTIONS[12].x -5) + (LEFT_BOTTOM_LINE1_SECTIONS[18].x -5)) / 2}
            y={bottom_line1_Y - 58}            // nudge the text a bit above the dashes
            fill="#00bfff"
            fontSize="10"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ALH-060
          </text>

          <text
            x={( (LEFT_BOTTOM_LINE1_SECTIONS[18].x -5) + leftbot_lineEnd) / 2}
            y={bottom_line1_Y - 58}            // nudge the text a bit above the dashes
            fill="#00bfff"
            fontSize="10"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ALH-059
          </text>


        {/* dashed guide‐line: left bottom track */}

          <line
            x1={leftbot_lineStart}
            y1={bottom_line4_Y + 50}
            x2={leftbot_lineEnd}
            y2={bottom_line4_Y + 50}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

          <line
            x1={leftbot_lineStart}
            y1={bottom_line4_Y + 50}
            x2={leftbot_lineStart}
            y2={bottom_line4_Y + 10}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

          <line
            x1={LEFT_BOTTOM_LINE4_SECTIONS[5].x + 10}
            y1={bottom_line4_Y + 50}
            x2={LEFT_BOTTOM_LINE4_SECTIONS[5].x + 10}
            y2={bottom_line4_Y + 10}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          /> 
          
          <line
            x1={LEFT_BOTTOM_LINE4_SECTIONS[11].x + 10}
            y1={bottom_line4_Y + 50}
            x2={LEFT_BOTTOM_LINE4_SECTIONS[11].x + 10}
            y2={bottom_line4_Y + 10}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

           <line
            x1={LEFT_BOTTOM_LINE4_SECTIONS[17].x + 5}
            y1={bottom_line4_Y + 50}
            x2={LEFT_BOTTOM_LINE4_SECTIONS[17].x + 5}
            y2={bottom_line4_Y + 10}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

          {/* right top track */}

           <line
            x1={rightbot_lineStart}
            y1={bottom_line4_Y + 50}
            x2={rightbot_lineEnd}
            y2={bottom_line4_Y + 50}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

          <line
            x1={rightbot_lineStart}
            y1={bottom_line1_Y - 50}
            x2={rightbot_lineEnd}
            y2={bottom_line1_Y - 50}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

          <line
            x1={rightbot_lineEnd}
            y1={bottom_line1_Y - 50}
            x2={rightbot_lineEnd}
            y2={bottom_line1_Y - 25}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

          <line
            x1={rightbot_lineEnd}
            y1={bottom_line4_Y + 50}
            x2={rightbot_lineEnd}
            y2={bottom_line4_Y + 25}
            stroke="white"
            strokeDasharray="5,5"
            strokeWidth={1}
          />

           <text
            x={(rightbot_lineStart + rightbot_lineEnd) / 2}
            y={bottom_line1_Y - 58}            // nudge the text a bit above the dashes
            fill="#00bfff"
            fontSize="10"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ALH-058
          </text>




    

          {/* the text label, centered above the line */}
         

        {/* ← left‐side bracket with “A” label */}
        <g stroke="white" strokeWidth={2}>
          {/* top horizontal */}
          <line 
            x1={leftbot_lineEnd + 12} 
            y1={bottom_line1_Y - 10} 
            x2={leftbot_lineEnd} 
            y2={bottom_line1_Y - 10} 
          />
          {/* bottom horizontal */}
          <line 
            x1={leftbot_lineEnd + 12} 
            y1={bottom_line4_Y + 10} 
            x2={leftbot_lineEnd} 
            y2={bottom_line4_Y + 10} 
          />
          {/* vertical connector */}
          <line 
            x1={leftbot_lineEnd + 12} 
            y1={bottom_line1_Y - 10} 
            x2={leftbot_lineEnd + 12} 
            y2={bottom_line4_Y + 10} 
          />
          {/* line towards A */}
          <line 
            x1={leftbot_lineEnd + 12} 
            y1={(bottom_line1_Y + bottom_line4_Y) / 2 - 5 } 
            x2={leftbot_lineEnd + 18} 
            y2={((bottom_line1_Y + bottom_line4_Y) / 2) -5} 
          />
          {/* the “A” */}
          <text 
            x={leftbot_lineEnd + 25} 
            y={(bottom_line1_Y + bottom_line4_Y) / 2} 
            fill="white" 
            stroke = 'none'
            fontSize="12" 
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
          >
            A
          </text>
        </g>

         {/* ← right‐side bracket with “B” label */}
        <g stroke="white" strokeWidth={2}>
          {/* top horizontal */}
          <line 
            x1={rightbot_lineStart - 12} 
            y1={bottom_line1_Y - 10} 
            x2={rightbot_lineStart} 
            y2={bottom_line1_Y - 10} 
          />
          {/* bottom horizontal */}
          <line 
            x1={rightbot_lineStart - 12} 
            y1={bottom_line4_Y + 10} 
            x2={rightbot_lineStart} 
            y2={bottom_line4_Y + 10} 
          />
          {/* vertical connector */}
          <line 
            x1={rightbot_lineStart - 12} 
            y1={bottom_line1_Y - 10} 
            x2={rightbot_lineStart - 12} 
            y2={bottom_line4_Y + 10} 
          />
          {/* line towards B */}
          <line 
            x1={rightbot_lineStart - 12} 
            y1={(bottom_line1_Y + bottom_line4_Y) / 2 - 5 } 
            x2={rightbot_lineStart - 20} 
            y2={((bottom_line1_Y + bottom_line4_Y) / 2) -5} 
          />
          {/* the “A” */}
          <text 
            x={rightbot_lineStart - 26} 
            y={(bottom_line1_Y + bottom_line4_Y) / 2} 
            fill="white" 
            stroke = 'none'
            fontSize="12" 
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
          >
            B
          </text>
        </g>

        

        {/* DN Signals for Line 1 */}
        {Leftline1DNSignals.map((signal) => {
        const section = LEFT_BOTTOM_LINE1_SECTIONS[signal.sectionIndex];
        const x = section?.x ?? 0;

        return (
          <DNSignal
            key={signal.name}
            signalName={signal.name}
            x={x - 5}  // Slightly left of the vertical line
            y={bottom_line1_Y - signalOffsetY}
            initialColor={signal.color}
          />
        );
      })}

        {/* UP Signals for Line 4 (ahead of odd-indexed vertical sections) */}
        {Leftline4UPSignals.map((signal) => {
          const section = LEFT_BOTTOM_LINE4_SECTIONS[signal.sectionIndex];
          const x = section?.x ?? 0;

          return (
            <UPSignal
              key={signal.name}
              signalName={signal.name}
              x={x - 50}  // Slightly ahead of the vertical line
              y={bottom_line4_Y + signalOffsetY}
              initialColor={signal.color}
            />
          );
        })}

        {/* DN Signals for Line 1 */}
        {Rightline1DNSignals.map((signal) => {
        const section = RIGHT_BOTTOM_LINE1_SECTIONS[signal.sectionIndex];
        const x = section?.x ?? 0;

        return (
          <DNSignal
            key={signal.name}
            signalName={signal.name}
            x={x - 5}  // Slightly left of the vertical line
            y={bottom_line1_Y - signalOffsetY}
            initialColor={signal.color}
          />
        );
      })}

        {/* UP Signals for Line 4 (ahead of odd-indexed vertical sections) */}
        {Rightline4UPSignals.map((signal) => {
          const section = RIGHT_BOTTOM_LINE4_SECTIONS[signal.sectionIndex];
          const x = section?.x ?? 0;

          return (
            <UPSignal
              key={signal.name}
              signalName={signal.name}
              x={x - 50}  // Slightly ahead of the vertical line
              y={bottom_line4_Y + signalOffsetY}
              initialColor={signal.color}
            />
          );
        })}

        {/* Line 1 elements */}
        {/* 1st track( no name) */} 
        <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName=""
          lineY={bottom_line1_Y + 1.5}
          x1={leftbot_lineStart}
          x2={1}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* 3224XT */}
        <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3224XT"
          lineY={bottom_line1_Y - 1.5}
          x1={0}
          x2={3}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        

        {/* 3222XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3222XT"
          lineY={bottom_line1_Y + 1.5}
          x1={2}
          x2={5}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* 3220XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3220XT"
          lineY={bottom_line1_Y - 1.5}
          x1={4}
          x2={7}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* 3218XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3218XT"
          lineY={bottom_line1_Y + 1.5}
          x1={6}
          x2={9}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* 3216XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3216XT"
          lineY={bottom_line1_Y - 1.5}
          x1={8}
          x2={11}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* 3214XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3214XT"
          lineY={bottom_line1_Y + 1.5}
          x1={10}
          x2={13}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* 3212XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3212XT"
          lineY={bottom_line1_Y - 1.5}
          x1={12}
          x2={15}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

         {/* 3210XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3210XT"
          lineY={bottom_line1_Y + 1.5}
          x1={14}
          x2={17}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* 3208XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3208XT"
          lineY={bottom_line1_Y - 1.5}
          x1={16}
          x2={19}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* 3206XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3206XT"
          lineY={bottom_line1_Y + 1.5}
          x1={18}
          x2={21}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* 3204XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3204XT"
          lineY={bottom_line1_Y - 1.5}
          x1={20}
          x2={23}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* 3202XT*/}
         <TrackSection
          sections ={LEFT_BOTTOM_LINE1_SECTIONS}
          TSName="3202XT"
          lineY={bottom_line1_Y + 1.5}
          x1={22}
          x2={leftbot_lineEnd}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* Line 2 elements */} 

        <TrackSection
          sections={LEFT_BOTTOM_LINE2_SECTIONS}
          TSName=""
          lineY={bottom_line2_Y + 1.5}
          x1={leftbot_lineStart}
          x2={1}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE2_SECTIONS}
          TSName="3224XT_3222XT"
          lineY={bottom_line2_Y - 1.5}
          x1={0}
          x2={3}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE2_SECTIONS}
          TSName="3220XT_3218XT"
          lineY={bottom_line2_Y + 1.5}
          x1={2}
          x2={5}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE2_SECTIONS}
          TSName="3216XT_3214XT"
          lineY={bottom_line2_Y - 1.5}
          x1={4}
          x2={7}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE2_SECTIONS}
          TSName="3212XT_3210XT"
          lineY={bottom_line2_Y + 1.5}
          x1={6}
          x2={9}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE2_SECTIONS}
          TSName="3208XT_3206XT"
          lineY={bottom_line2_Y - 1.5}
          x1={8}
          x2={11}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE2_SECTIONS}
          TSName="3204XT_3202XT"
          lineY={bottom_line2_Y + 1.5}
          x1={10}
          x2={leftbot_lineEnd}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* Line 3 elements */} 

        <TrackSection
          sections={LEFT_BOTTOM_LINE3_SECTIONS}
          TSName="3207XT_3205XT"
          lineY={bottom_line3_Y - 1.5}
          x1={leftbot_lineStart}
          x2={1}
          textYOffset={15}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE3_SECTIONS}
          TSName="3211XT_3209XT"
          lineY={bottom_line3_Y + 1.5}
          x1={0}
          x2={3}
          textYOffset={10}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE3_SECTIONS}
          TSName="3215XT_3213XT"
          lineY={bottom_line3_Y - 1.5}
          x1={2}
          x2={5}
          textYOffset={10}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE3_SECTIONS}
          TSName="3219XT_3217XT"
          lineY={bottom_line3_Y + 1.5}
          x1={4}
          x2={7}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE3_SECTIONS}
          TSName="3223XT_3221XT"
          lineY={bottom_line3_Y - 1.5}
          x1={6}
          x2={9}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE3_SECTIONS}
          TSName="3227XT_3225XT"
          lineY={bottom_line3_Y + 1.5}
          x1={8}
          x2={11}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE3_SECTIONS}
          TSName="99AXT_3229XT"
          lineY={bottom_line3_Y - 1.5}
          x1={10}
          x2={leftbot_lineEnd}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* Line 4 elements */} 

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3207XT"
          lineY={bottom_line4_Y + 1.5}
          x1={leftbot_lineStart}
          x2={1}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3209XT"
          lineY={bottom_line4_Y - 1.5}
          x1={0}
          x2={3}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3211XT"
          lineY={bottom_line4_Y + 1.5}
          x1={2}
          x2={5}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3213XT"
          lineY={bottom_line4_Y - 1.5}
          x1={4}
          x2={7}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3215XT"
          lineY={bottom_line4_Y + 1.5}
          x1={6}
          x2={9}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3217XT"
          lineY={bottom_line4_Y - 1.5}
          x1={8}
          x2={11}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3219XT"
          lineY={bottom_line4_Y + 1.5}
          x1={10}
          x2={13}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3221XT"
          lineY={bottom_line4_Y - 1.5}
          x1={12}
          x2={15}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3223XT"
          lineY={bottom_line4_Y + 1.5}
          x1={14}
          x2={17}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3225XT"
          lineY={bottom_line4_Y - 1.5}
          x1={16}
          x2={19}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3227XT"
          lineY={bottom_line4_Y + 1.5}
          x1={18}
          x2={21}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="3229XT"
          lineY={bottom_line4_Y - 1.5}
          x1={20}
          x2={23}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          TSName="99AXT"
          lineY={bottom_line4_Y + 1.5}
          x1={22}
          x2={leftbot_lineEnd}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        {/* Right side track */}

        {/* Line 1 (Top) */}
        <TrackSection
          sections={RIGHT_BOTTOM_LINE1_SECTIONS}
          TSName="3114XT"
          lineY={bottom_line1_Y + 1.5}
          x1={1}
          x2={rightbot_lineStart}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

         <TrackSection
          sections={RIGHT_BOTTOM_LINE1_SECTIONS}
          TSName="3112XT"
          lineY={bottom_line1_Y - 1.5}
          x1={0}
          x2={3}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        <TrackSection
          sections={RIGHT_BOTTOM_LINE1_SECTIONS}
          TSName="3110XT"
          lineY={bottom_line1_Y + 1.5}
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
          textYOffset={10}
          getTrackColor={getTrackColor}
          ratio = {0.4}
        />

        <TrackSection
          sections={RIGHT_BOTTOM_LINE3_SECTIONS}
          TSName=""
          lineY={bottom_line3_Y + 1.5}
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

        {/* Distance marker */}
        <text x={leftbot_lineStart + 175} y={(bottom_line2_Y + bottom_line3_Y)/2} fill="yellow" fontSize="9" textAnchor="middle">
          (/SPL/ CLASS NEW MARWAR(RS) AT A DISTANCE OF Km 35.789)
        </text>

         {/* Distance marker */}
        <text x={rightbot_lineStart + 150} y={(bottom_line2_Y + bottom_line3_Y)/2} fill="yellow" fontSize="9" textAnchor="middle">
          (/SPL/ CLASS NEW HARIPUR(CS) AT A DISTANCE OF Km 19.045)
        </text>


        {/* Vertical section markers for Line 1 (DN) */}
        <VerticalSections
          sections={LEFT_BOTTOM_LINE1_SECTIONS}
          lineY={bottom_line1_Y}
          lineKeyPrefix="leftbot-line1"
        />

        {/* Vertical section markers for Line 2 */}
        <VerticalSections
          sections={LEFT_BOTTOM_LINE2_SECTIONS}
          lineY={bottom_line2_Y}
          lineKeyPrefix="leftbot-line2"
        />

        {/* Vertical section markers for Line 3 */}
        <VerticalSections
          sections={LEFT_BOTTOM_LINE3_SECTIONS}
          lineY={bottom_line3_Y}
          lineKeyPrefix="leftbot-line3"
        />

        {/* Vertical section markers for Line 4 (UP) */}
        <VerticalSections
          sections={LEFT_BOTTOM_LINE4_SECTIONS}
          lineY={bottom_line4_Y}
          lineKeyPrefix="leftbot-line4"
        />

        {/*Right sections*/}

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

export default BottomTrackLayout;