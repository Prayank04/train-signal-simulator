import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { TrackContext, statusColors } from '../../../context/TrackContext';
import { scaleSections, trackStatusToColor } from '../../../utils/constants';
import VerticalSections from './VerticalSections';
import {
  getScaledMainLineDimensions,
  scaleSections,
  TRACK_LAYOUT_CONSTANTS,
  UP_MAIN_LINE_SECTIONS,
  DN_MAIN_LINE_SECTIONS,
  DN_LOOP_LINE_SECTIONS,
  UP_LOOP_LINE_SECTIONS,
} from "../../../constants";
import {
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
    DnLoopLineSignal
} from './signals';
import Triangles from './Triangles';
import { MainLine, LoopLine } from './Lines';
import TrackSection from './TrackSection';
import Circle from './circles'; 
import SlantingLine from './SlantingLine';


const {
  marginX,
  spacing,
  circleRadius,
  dnLoopLineY,
  dnMainLineY,
  upMainLineY,
  upLoopLineY,
  signalOffsetY,
  mainlineStart,
  mainlineEnd,
  dnLoopLineStart,
  dnLoopLineEnd,
  upLoopLineStart,
  upLoopLineEnd
} = TRACK_LAYOUT_CONSTANTS;



const MainTrackLayout = () => {

  const svgRef = useRef(null);
  const [svgWidth, setSvgWidth] = useState(0);
  const [mainDims, setMainDims] = useState(getScaledMainLineDimensions(1));
  const [sections, setSections] = useState({
    up: UP_MAIN_LINE_SECTIONS,
    dn: DN_MAIN_LINE_SECTIONS,
    dnLoop: DN_LOOP_LINE_SECTIONS,
    upLoop: UP_LOOP_LINE_SECTIONS,
  });

  const {
    upMainLineY,
    dnMainLineY,
    upLoopLineY,
    dnLoopLineY,
    signalOffsetY,
    designWidth,
  } = TRACK_LAYOUT_CONSTANTS;

  const { trackStates } = useContext(TrackContext);
  const getTrackColor = (trackId) => {
    return statusColors[trackStates[trackId]] || "white";
  };

  // Update SVG width
  useEffect(() => {
    const updateWidth = () => {
      if (svgRef.current) setSvgWidth(svgRef.current.clientWidth);
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Scale dimensions and sections
  useEffect(() => {
    if (svgWidth > 0) {
      const scale = svgWidth / designWidth;
      setMainDims(getScaledMainLineDimensions(scale));
      setSections({
        up: scaleSections(UP_MAIN_LINE_SECTIONS, scale),
        dn: scaleSections(DN_MAIN_LINE_SECTIONS, scale),
        dnLoop: scaleSections(DN_LOOP_LINE_SECTIONS, scale),
        upLoop: scaleSections(UP_LOOP_LINE_SECTIONS, scale),
      });
    }
  }, [svgWidth, designWidth]);


  return (
    <div className="main-track-layout">
      <svg
        ref={svgRef}
        width="100%"
        height="400"
        viewBox={`0 0 ${svgWidth} 400`}
        preserveAspectRatio="xMinYMin meet"
        style={{ backgroundColor: '#333333' }}
      >
        
        {/* UP MAIN LINE */}
        <MainLine
          x1={mainDims.mainlineStart}
          x2={mainDims.mainlineEnd}
          y={upMainLineY}
          labels={[
            { x: sections.up[2].x + 0.3 * (sections.up[3].x - sections.up[2].x), y: upMainLineY + 15, text: 'UP MAIN LINE NO. 2A' },
            { x: sections.up[4].x + 0.45 * (sections.up[5].x - sections.up[4].x), y: upMainLineY + 15, text: 'UP MAIN LINE NO. 2' },
          ]}
        />

        {/* DN MAIN LINE */}
        <MainLine
          x1={mainDims.mainlineStart}
          x2={mainDims.mainlineEnd}
          y={dnMainLineY}
          labels={[
            { x: sections.dn[3].x + 0.25 * (sections.dn[4].x - sections.dn[3].x), y: dnMainLineY + 15, text: 'DN MAIN LINE NO. 3' },
            { x: sections.dn[5].x + 0.25 * (sections.dn[6].x - sections.dn[5].x), y: dnMainLineY + 15, text: 'DN MAIN LINE NO. 3A' },
          ]}
        />

        {/* DN LOOP LINE */}
        <LoopLine
          x1={mainDims.dnLoopLineStart}
          x2={mainDims.dnLoopLineEnd}
          y={dnLoopLineY}
          label="DN LOOP LINE NO. 4"
          labelX={sections.dnLoop[1].x + 0.25 * (sections.dnLoop[2].x - sections.dnLoop[1].x)}
          labelY={dnLoopLineY + 15}
          verticalEnds={[
            [mainDims.dnLoopLineStart, dnLoopLineY - 8, dnLoopLineY + 8],
            [mainDims.dnLoopLineEnd, dnLoopLineY - 8, dnLoopLineY + 8],
          ]}
          cCaps={[
            [mainDims.dnLoopLineStart - 5, dnLoopLineY - 8, mainDims.dnLoopLineStart],
            [mainDims.dnLoopLineStart - 5, dnLoopLineY + 8, mainDims.dnLoopLineStart],
            [mainDims.dnLoopLineEnd, dnLoopLineY - 8, mainDims.dnLoopLineEnd + 5],
            [mainDims.dnLoopLineEnd, dnLoopLineY + 8, mainDims.dnLoopLineEnd + 5],
          ]}
        />

        {/* UP LOOP LINE */}
        <LoopLine
          x1={mainDims.upLoopLineStart}
          x2={mainDims.upLoopLineEnd}
          y={upLoopLineY}
          label="UP LOOP LINE NO. 1"
          labelX={sections.upLoop[1].x + 0.25 * (sections.upLoop[2].x - sections.upLoop[1].x)}
          labelY={upLoopLineY + 15}
          verticalEnds={[
            [mainDims.upLoopLineStart, upLoopLineY - 8, upLoopLineY + 8],
            [mainDims.upLoopLineEnd, upLoopLineY - 8, upLoopLineY + 8],
          ]}
          cCaps={[
            [mainDims.upLoopLineStart - 5, upLoopLineY - 8, mainDims.upLoopLineStart],
            [mainDims.upLoopLineStart - 5, upLoopLineY + 8, mainDims.upLoopLineStart],
            [mainDims.upLoopLineEnd, upLoopLineY - 8, mainDims.upLoopLineEnd + 5],
            [mainDims.upLoopLineEnd, upLoopLineY + 8, mainDims.upLoopLineEnd + 5],
          ]}
        />

        

        {/* DN LOOP LINE Elements (Left to Right) */}
        
        {/* 0. MACHINE SIDING (at start of line) */}
        <text x={dnLoopLineStart - 88} y={dnLoopLineY - 2} fill="yellow" fontSize="9" fontFamily="Arial">MACHINE SIDING</text>
        <text x={dnLoopLineStart - 64} y={dnLoopLineY + 8} fill="yellow" fontSize="9" fontFamily="Arial">(CSR 120m)</text>

        {/* Extra track line at DNloopLineStart */}
        <line x1={dnLoopLineStart} y1={dnLoopLineY} x2={DN_LOOP_LINE_SECTIONS[0].x} y2={dnLoopLineY} stroke="white" strokeWidth="3" />
        
        {/* 1. SW2 and its circle */}
        <Circle
          sections={DN_LOOP_LINE_SECTIONS}
          CircleName="SW2"
          lineY={dnLoopLineY}
          TextOutside="SW2"
          x1={dnLoopLineStart}
          x2={0} // Using section index
          ratio={1/3}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 2. SH196 - Same as SH140 */}
        <ShuntUp startX={DN_LOOP_LINE_SECTIONS[0].x - (0.1) * (DN_LOOP_LINE_SECTIONS[1].x- DN_LOOP_LINE_SECTIONS[0].x)} label="SH196" lineY={dnLoopLineY -3} />
        
        {/* 4. 296AXT */}
        <TrackSection
          sections={DN_LOOP_LINE_SECTIONS}
          TSName="296AXT"
          lineY={dnLoopLineY}
          x1={0}
          x2={1}
          ratio={0.54}
          textYOffset={-5}
          getTrackColor={getTrackColor}
        />

        
        {/* 6. SH193 - Mirror of SH140 */}
        <ShuntDown startX={DN_LOOP_LINE_SECTIONS[1].x - (0.065) * (DN_LOOP_LINE_SECTIONS[2].x- DN_LOOP_LINE_SECTIONS[1].x)} label="SH193" lineY={dnLoopLineY} />
        
        {/* 7. 04XT */}
        <TrackSection
          sections={DN_LOOP_LINE_SECTIONS}
          TSName="04XT"
          lineY={dnLoopLineY}
          x1={1}
          x2={2}
          ratio={0.7}         // Centered between section 1 and 2
          textYOffset={-5}    // Place text below the line
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        {/* 8. 04A and its circle */}
        <Circle
          sections={DN_LOOP_LINE_SECTIONS}
          CircleName="04A"
          lineY={dnLoopLineY}
          TextOutside="04"
          TextInside="A"
          x1={1}
          x2={2} // Using section index
          ratio={0.35}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 9. 04B and its circle */}
        <Circle
          sections={DN_LOOP_LINE_SECTIONS}
          CircleName="04B"
          lineY={dnLoopLineY}
          TextOutside="04"
          TextInside="B"
          x1={1}
          x2={2} // Using section index
          ratio={0.45}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 10. 242AXT */}
        <TrackSection
          sections={DN_LOOP_LINE_SECTIONS}
          TSName="242AXT"
          lineY={dnLoopLineY}
          x1={2}
          x2={dnLoopLineEnd}
          ratio={0.3}           // Adjust as needed for label position
          textYOffset={10}      // Place text below the line
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        
        {/* 11. S44/SH144 - Mirror of S39/SH139 */}
        <DnLoopLineSignal startX={DN_LOOP_LINE_SECTIONS[2].x + (0.15) * (TRACK_LAYOUT_CONSTANTS.dnLoopLineEnd- DN_LOOP_LINE_SECTIONS[2].x)} label="S44,SH144" lineY={dnLoopLineY} initialColor="R" signalName="S44" />
        
        
        
        {/* 13. 120M OVERRUN LINE (at end of line) */}
        <text x={dnLoopLineEnd + 12.5} y={dnLoopLineY - 2} fill="yellow" fontSize="9" fontFamily="Arial">120M OVERRUN LINE</text>
        <text x={dnLoopLineEnd + 12.5} y={dnLoopLineY + 8} fill="yellow" fontSize="9" fontFamily="Arial">(NOT FOR STABLING)</text>


        {/* DN MAIN LINE Elements (Left to Right) */}
        
        {/* 1. 3202XT track (leftmost) */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="3202XT"
          lineY={dnMainLineY}
          x1={mainlineStart}
          x2={0}
          ratio={0.4}           // Adjust for label position, or 0.5 for center
          textYOffset={-5}      // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        
        {/* 2. 98XT track */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="98XT"
          lineY={dnMainLineY}
          x1={0}
          x2={1}
          ratio={0.45}         // Center label between the two points
          textYOffset={10}    // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />

        {/* 3. S98/C98 signals (above 98XT) */}
        <S98C98Signal startX={DN_MAIN_LINE_SECTIONS[0].x + (0.50)* (DN_MAIN_LINE_SECTIONS[1].x - DN_MAIN_LINE_SECTIONS[0].x)} label="S98/C98" lineY={dnMainLineY} initialColor="R" signalName="S98" />
        
        
        {/* 5. 298BXT */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="298BXT"
          lineY={dnMainLineY}
          x1={1}
          x2={2}
          ratio={0.65}         // Center label between the two points
          textYOffset={10}    // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />

         {/* 4. DW with its circle */}
        <Circle
          sections={DN_MAIN_LINE_SECTIONS}
          CircleName="DW"
          lineY={dnMainLineY}
          TextOutside="DW"
          x1={1}
          x2={2} // Using section index
          ratio={0.2}
          textYOffset={-8}
          fontSize = {9}
        />
        
        
        {/* 7. 296BXT */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="296BXT"
          lineY={dnMainLineY}
          x1={2}
          x2={3}
          ratio={0.5}         // Center label between the two points
          textYOffset={-5}    // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        
        
        {/* 9. 03AXT */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="03AXT"
          lineY={dnMainLineY}
          x1={3}
          x2={4}
          ratio={0.25}         // Center label between the two points
          textYOffset={-5}    // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        
        {/* 10. 03A with its circle */}
        <Circle
          sections={DN_MAIN_LINE_SECTIONS}
          CircleName="03A"
          lineY={dnMainLineY}
          TextOutside="03A"
          TextInside="A"
          x1={3}
          x2={4} // Using section index
          ratio={0.4}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 11. S42 signal */}
        <DnMainLineSignalType2 startX={DN_MAIN_LINE_SECTIONS[4].x + (0.25)* (DN_MAIN_LINE_SECTIONS[5].x - DN_MAIN_LINE_SECTIONS[4].x)} label="S42/SH142" lineY={dnMainLineY} initialColor="R" signalName="S42" />

      
        {/* 12. 242BXT */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="242BXT"
          lineY={dnMainLineY}
          x1={4}
          x2={5}
          ratio={0.83}         // Center label between the two points
          textYOffset={-5}    // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        
        {/* 13. SH143 - Mirror of SH140 */}
        <ShuntDown startX={DN_MAIN_LINE_SECTIONS[4].x + (0.9)* (DN_MAIN_LINE_SECTIONS[5].x - DN_MAIN_LINE_SECTIONS[4].x)} label="SH143" lineY={dnMainLineY} />
        
        {/* 14. 03BXT */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="03BXT"
          lineY={dnMainLineY}
          x1={5}
          x2={6}
          ratio={0.66}         // Center label between the two points
          textYOffset={-5}    // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        
        {/* 15. 03B with its circle */}
        <Circle
          sections={DN_MAIN_LINE_SECTIONS}
          CircleName="03AB"
          lineY={dnMainLineY}
          TextOutside="03B"
          TextInside="A"
          x1={5}
          x2={6} // Using section index
          ratio={0.4}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 16. S4/SH104 signal */}
        <DnMainLineSignalType2 startX={DN_MAIN_LINE_SECTIONS[5].x + (1.15)* (DN_MAIN_LINE_SECTIONS[6].x - DN_MAIN_LINE_SECTIONS[5].x)} label="S4/SH104" lineY={dnMainLineY} initialColor="R" signalName="S4" />
        
        {/* 17. 202AXT */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="202AXT"
          lineY={dnMainLineY}
          x1={6}
          x2={7}
          ratio={0.4}         // Center label between the two points
          textYOffset={10}    // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        
        
        {/* 19. A2XT */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="A2XT"
          lineY={dnMainLineY}
          x1={7}
          x2={8}
          ratio={0.25}         // Center label between the two points
          textYOffset={-5}    // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        
        {/* 20. DX with its circle */}
        <Circle
          sections={DN_MAIN_LINE_SECTIONS}
          CircleName="DX"
          lineY={dnMainLineY}
          TextOutside="DX"
          x1={7}
          x2={8} // Using section index
          ratio={0.5}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 22. S2 signal - Flipped order */}
        <S2Signal startX={DN_MAIN_LINE_SECTIONS[8].x - (0.2)* (DN_MAIN_LINE_SECTIONS[9].x - DN_MAIN_LINE_SECTIONS[8].x)} label="S2" lineY={dnMainLineY} initialColor="R" signalName="S2" />
        
        {/* 21. A3101 with its circle */}

        {/* 23. 2AXT */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="2AXT"
          lineY={dnMainLineY}
          x1={8}
          x2={10}
          ratio={0.62}         // Center label between the two points
          textYOffset={-5}    // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />

        {/* 22. DZ with its circle */}
        <Circle
          sections={DN_MAIN_LINE_SECTIONS}
          CircleName="DZ"
          lineY={dnMainLineY}
          TextOutside="DZ"
          x1={8}
          x2={9} // Using section index
          ratio={0.45}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 25. A3114 signal - Without L-shape and A circle */}
        <A3114Signal startX={DN_MAIN_LINE_SECTIONS[10].x - (0.35)* (TRACK_LAYOUT_CONSTANTS.mainlineEnd - DN_MAIN_LINE_SECTIONS[10].x)} label="A3114" lineY={dnMainLineY} initialColor="G" signalName="A3114" />

         {/* 25. 3114XT */}
        <TrackSection
          sections={DN_MAIN_LINE_SECTIONS}
          TSName="3114XT"
          lineY={dnMainLineY + 3}
          x1={9}
          x2={mainlineEnd}
          ratio={0.55}
          textYOffset={10} 
          getTrackColor={getTrackColor}
          fontSize={9}
        />


        {/* UP MAIN LINE Elements (Right to Left) */}
      
        {/* 1. 3103XT (rightmost) */}
        <TrackSection
          sections={UP_MAIN_LINE_SECTIONS}
          TSName="3103XT"
          lineY={upMainLineY - 3}
          x1={9}
          x2={mainlineEnd}
          ratio={0.7}           // Adjust as needed for label position
          textYOffset={10}      // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        
        {/* 1. 1XT */}
        <TrackSection
          sections={UP_MAIN_LINE_SECTIONS}
          TSName="1XT"
          lineY={upMainLineY}
          x1={7}
          x2={8}
          ratio={0.5}           // Center label between the two points
          textYOffset={-5}      // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />
                
        {/* 2. A3101 Signal */}
        <A3101Signal startX={UP_MAIN_LINE_SECTIONS[10].x - (0.7)* (TRACK_LAYOUT_CONSTANTS.mainlineEnd - UP_MAIN_LINE_SECTIONS[10].x)} label="A3101" lineY={upMainLineY} initialColor="Y" signalName="A3101" />
        
        {/* 3. 3101XT */}
        <TrackSection
          sections={UP_MAIN_LINE_SECTIONS}
          TSName="3101XT"
          lineY={upMainLineY}
          x1={8}
          x2={10}
          ratio={0.5}           // Adjust as needed for label position
          textYOffset={-5}      // Matches your original text y offset
          getTrackColor={getTrackColor}
          fontSize={9}
        />
        
        {/* 4. S1/C1 Signal */}
        <S1C1Signal startX={UP_MAIN_LINE_SECTIONS[7].x + (0.55)* (UP_MAIN_LINE_SECTIONS[8].x- UP_MAIN_LINE_SECTIONS[7].x)} label="S1/C1" lineY={upMainLineY} initialColor="R" signalName="S1" />

        {/* Separate C circle positioned independently 
        <circle cx="1181" cy={upMainLineY + signalOffsetY} r={circleRadius} fill="none" stroke="white" strokeWidth="1" />
        <text x="1181" y={upMainLineY + signalOffsetY + 1} fill="white" fontSize="5" fontWeight="bold" textAnchor="middle">C</text> */}
        
        
        {/* Signal on vertical line after UW */}
        <VerticalLineSignalWithCross startX={UP_MAIN_LINE_SECTIONS[7].x - (0.000001)* (UP_MAIN_LINE_SECTIONS[8].x- UP_MAIN_LINE_SECTIONS[7].x)} lineY={upMainLineY + 24.5} />
        
        {/* 6. 202BXT */}
        <TrackSection
          sections={UP_MAIN_LINE_SECTIONS}
          TSName="202BXT"
          lineY={upMainLineY}
          x1={6}
          x2={7}
          getTrackColor={getTrackColor}
          fontSize={9}
          ratio={0.5}           // Center label between the two points
          textYOffset={-5}
        />
        
        {/* 5. UW */}
        <Circle
          sections={UP_MAIN_LINE_SECTIONS}
          CircleName="UW"
          lineY={upMainLineY}
          TextOutside="UW"
          x1={6}
          x2={7} // Using section index
          ratio={0.66}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 8. 203BXT - shifted further right */}
        <TrackSection
          sections={UP_MAIN_LINE_SECTIONS}
          TSName="203BXT"
          lineY={upMainLineY}
          x1={5}
          x2={6}
          getTrackColor={getTrackColor}
          fontSize={9}
          ratio = {0.8}
          textYOffset={-5}
        />
        
        
        {/* Signal on vertical line between 02A and 203B */}
        <VerticalLineSignal startX={UP_MAIN_LINE_SECTIONS[5].x - (0.11)* (UP_MAIN_LINE_SECTIONS[6].x- UP_MAIN_LINE_SECTIONS[5].x)} lineY={upMainLineY} />
        
        
        {/* 11. 02AXT */}
        <TrackSection
          sections={UP_MAIN_LINE_SECTIONS}
          TSName="02AXT"
          lineY={upMainLineY}
          x1={4}
          x2={5}
          getTrackColor={getTrackColor}
          ratio = {0.5}           // Center label between the two points
          fontSize={9}
          textYOffset={-5}
        />

        {/* 10. 02A */}
        <Circle
          sections={UP_MAIN_LINE_SECTIONS}
          CircleName="02A"
          lineY={upMainLineY}
          TextOutside="02A"
          TextInside="A"
          x1={4}
          x2={5} // Using section index
          ratio={0.66}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 12. S41/SH141 Signal */}
        <UpMainLineSignalType2 startX={UP_MAIN_LINE_SECTIONS[3].x + (0.6)* (UP_MAIN_LINE_SECTIONS[4].x- UP_MAIN_LINE_SECTIONS[3].x)} label="S41/SH141" lineY={upMainLineY} initialColor="R" signalName="S41" />
        
        
        {/* 14. 249BXT - positioned to the right of 249B */}
        <TrackSection
          sections={UP_MAIN_LINE_SECTIONS}
          TSName="249BXT"
          lineY={upMainLineY}
          x1={3}
          x2={4}
          getTrackColor={getTrackColor}
          ratio = {0.17}           // Center label between the two points
          fontSize={9}
          textYOffset={10}
        />
        
        {/* 15. SH140 Signal - complex signal with quadrant */}
        <ShuntUp startX={UP_MAIN_LINE_SECTIONS[3].x  - (0.1)* (UP_MAIN_LINE_SECTIONS[4].x- UP_MAIN_LINE_SECTIONS[3].x)} label="SH140" lineY={upMainLineY - 3} />
        
        {/* 17. 02BXT */}
        <TrackSection
          sections={UP_MAIN_LINE_SECTIONS}
          TSName="02BXT"
          lineY={upMainLineY}
          x1={2}
          x2={3}
          getTrackColor={getTrackColor}
          ratio = {0.35}
          fontSize={9}
          textYOffset={-5}
        />

         {/* 16. 02B */}
        <Circle
          sections={UP_MAIN_LINE_SECTIONS}
          CircleName="02B"
          lineY={upMainLineY}
          TextOutside="02B"
          TextInside="A"
          x1={2}
          x2={3} // Using section index
          ratio={0.55}
          textYOffset={-8}
          fontSize = {9}
        />
        
        
        {/* 19. 298AXT */}
        <TrackSection
          sections={UP_MAIN_LINE_SECTIONS}
          TSName="298AXT"
          lineY={upMainLineY}
          x1={1}
          x2={2}
          getTrackColor={getTrackColor}
          ratio = {0.7}
          fontSize={9}
          textYOffset={-5}
        />
        
        
        {/* 21. A99XT */}
        <TrackSection
          sections={UP_MAIN_LINE_SECTIONS}
          TSName="A99XT"
          lineY={upMainLineY}
          x1={0}
          x2={1}
          getTrackColor={getTrackColor}
          ratio = {0.65}
          fontSize={9}
          textYOffset={-5}
        />
        
        {/* 22. UX */}
        <Circle
          sections={UP_MAIN_LINE_SECTIONS}
          CircleName="UX"
          lineY={upMainLineY}
          TextOutside="UX"
          x1={0}
          x2={1} 
          ratio={0.44}
          textYOffset={-8}
          fontSize = {9}
        />

        {/* 23. S97/SH197 Signal */}
        <UpMainLineSignalType2 startX={UP_MAIN_LINE_SECTIONS[1].x + (0.53)* (UP_MAIN_LINE_SECTIONS[2].x- UP_MAIN_LINE_SECTIONS[1].x)} label="S97/SH197" lineY={upMainLineY} initialColor="R" signalName="S97" />
        
        {/* 24. S99 Signal */}
        <S99Signal startX={UP_MAIN_LINE_SECTIONS[0].x - (0.35)* (UP_MAIN_LINE_SECTIONS[1].x- UP_MAIN_LINE_SECTIONS[0].x)} label="S99" lineY={upMainLineY} initialColor="R" signalName="S99" />
      

        {/* 21. 99AXT */}
      <TrackSection
        sections={UP_MAIN_LINE_SECTIONS}
        TSName="99AXT"
        lineY={upMainLineY}
        x1={mainlineStart}
        x2={0}
        getTrackColor={getTrackColor}
        ratio = {0.05}
        fontSize={9}
        textYOffset={10}
      />

      {/* 25. UZ (leftmost) */}
        <Circle
          sections={UP_MAIN_LINE_SECTIONS}
          CircleName="UZ"
          lineY={upMainLineY}
          TextOutside="UZ"
          x1={mainlineStart}
          x2={0} 
          ratio={0.8}
          textYOffset={-8}
          fontSize = {9}
        />
        

        {/* UP LOOP LINE Elements (Right to Left) */}
        
        {/* 1. MACHINE SIDING (CSR 120m) - rightmost on loop line */}
        <text x={upLoopLineEnd + 11.61} y={upLoopLineY - 2} fill="yellow" fontSize="9" fontFamily="Arial">MACHINE SIDING</text>
        <text x={upLoopLineEnd + 11.61} y={upLoopLineY + 9} fill="yellow" fontSize="9" fontFamily="Arial">(CSR 120m)</text>

        {/* Extra track line at DNloopLineStart */}
        <line x1={upLoopLineEnd} y1={upLoopLineY} x2={UP_LOOP_LINE_SECTIONS[3].x} y2={upLoopLineY} stroke="white" strokeWidth="3" />
        
        {/* 2. SE1 */}
        <Circle
          sections={UP_LOOP_LINE_SECTIONS}
          CircleName="SE1"
          lineY={upLoopLineY}
          TextOutside="SE1"
          x1={3}
          x2={upLoopLineEnd} 
          ratio={0.66}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 3. SH123 Signal - EXACTLY as your original function */}
        <ShuntDown startX={UP_LOOP_LINE_SECTIONS[2].x + (0.92)* (UP_LOOP_LINE_SECTIONS[3].x- UP_LOOP_LINE_SECTIONS[2].x)} label="SH123" lineY={upLoopLineY} />
        
        
        {/* 6. 203AXT */}
        <TrackSection
          sections={UP_LOOP_LINE_SECTIONS}
          TSName="203AXT"
          lineY={upLoopLineY}
          x1={2}
          x2={3}
          getTrackColor={getTrackColor}
          ratio = {0.15}
          fontSize={9}
          textYOffset={10}
        />
        
        {/* 7. SH124 Signal - EXACTLY as your original function */}
        <ShuntUp startX={UP_LOOP_LINE_SECTIONS[1].x + (0.9)* (UP_LOOP_LINE_SECTIONS[2].x- UP_LOOP_LINE_SECTIONS[1].x)} label="SH124" lineY={upLoopLineY} />

         {/* 10. 01XT */}
        <TrackSection
          sections={UP_LOOP_LINE_SECTIONS}
          TSName="01XT"
          lineY={upLoopLineY}
          x1={1}
          x2={2}
          getTrackColor={getTrackColor}
          ratio = {0.3}
          fontSize={9}
          textYOffset={-5}
        />
        
        {/* 8. 01A */}
        <Circle
          sections={UP_LOOP_LINE_SECTIONS}
          CircleName="01A"
          lineY={upLoopLineY}
          TextOutside="01"
          TextInside="A"
          x1={1}
          x2={2} 
          ratio={0.4}
          textYOffset={-8}
          fontSize = {9}
        />
        
        {/* 9. 01B */}
        <Circle
          sections={UP_LOOP_LINE_SECTIONS}
          CircleName="01B"
          lineY={upLoopLineY}
          TextOutside="01"
          TextInside="B"
          x1={1}
          x2={2} 
          ratio={0.55}
          textYOffset={-8}
          fontSize = {9}
        />
       
        
        {/* 11. S39/SH139 Signal - EXACTLY as your original function */}
        <UpLoopLineSignal startX={UP_LOOP_LINE_SECTIONS[1].x - (0.22)* (UP_LOOP_LINE_SECTIONS[2].x- UP_LOOP_LINE_SECTIONS[1].x)} label="S39/SH139" lineY={upLoopLineY} initialColor="R" signalName="S39" />
        
      

        {/* 247XT - positioned to the left of 247A circle */}
        <TrackSection
          sections={UP_LOOP_LINE_SECTIONS}
          TSName="247XT"
          lineY={upLoopLineY}
          x1={0}
          x2={1}
          getTrackColor={getTrackColor}
          ratio = {0.2}
          fontSize={9}
          textYOffset={10}
        />
        
        {/* 249AXT - positioned to the right of 249A circle */}
        <TrackSection
          sections={UP_LOOP_LINE_SECTIONS}
          TSName="249AXT"
          lineY={upLoopLineY}
          x1={upLoopLineStart}
          x2={0}
          getTrackColor={getTrackColor}
          ratio = {0.76}
          fontSize={9}
          textYOffset={-5}
        />
  
        
        {/* 15. 120M OVERRUN LINE - leftmost */}
        <text x={upLoopLineStart - 110} y={upLoopLineY - 2} fill="yellow" fontSize="9" fontFamily="Arial">120M OVERRUN LINE</text>
        <text x={upLoopLineStart - 110} y={upLoopLineY + 8} fill="yellow" fontSize="9" fontFamily="Arial">(NOT FOR STABLING)</text>


       
        
        {/* SLANTING LINES - Using the new component */}
        <SlantingLine 
          Upx={UP_MAIN_LINE_SECTIONS[3].x + (2.5/10) * (UP_MAIN_LINE_SECTIONS[4].x - UP_MAIN_LINE_SECTIONS[3].x)} 
          Upy={upMainLineY} 
          Dnx={upLoopLineStart + (6/10) * (UP_LOOP_LINE_SECTIONS[0].x - upLoopLineStart)} 
          Dny={upLoopLineY} 
          UpName="249B" 
          DnName="249A" 
        />

        <SlantingLine 
          Upx={UP_MAIN_LINE_SECTIONS[5].x + (6/10) * (UP_MAIN_LINE_SECTIONS[6].x - UP_MAIN_LINE_SECTIONS[5].x)} 
          Upy={upMainLineY} 
          Dnx={UP_LOOP_LINE_SECTIONS[2].x + (4/11) * (UP_LOOP_LINE_SECTIONS[3].x - UP_LOOP_LINE_SECTIONS[2].x)} 
          Dny={upLoopLineY} 
          UpName="203B" 
          DnName="203A" 
        />

        <SlantingLine 
          Upx={DN_MAIN_LINE_SECTIONS[1].x + (8.5/10) * (DN_MAIN_LINE_SECTIONS[2].x - DN_MAIN_LINE_SECTIONS[1].x)} 
          Upy={dnMainLineY} 
          Dnx={UP_MAIN_LINE_SECTIONS[1].x + (4/10) * (UP_MAIN_LINE_SECTIONS[2].x - UP_MAIN_LINE_SECTIONS[1].x)} 
          Dny={upMainLineY} 
          UpName="298B" 
          DnName="298A" 
        />

        <SlantingLine 
          Upx={DN_MAIN_LINE_SECTIONS[6].x + (7/10) * (DN_MAIN_LINE_SECTIONS[7].x - DN_MAIN_LINE_SECTIONS[6].x)} 
          Upy={dnMainLineY} 
          Dnx={UP_MAIN_LINE_SECTIONS[6].x + (1.5/10) * (UP_MAIN_LINE_SECTIONS[7].x - UP_MAIN_LINE_SECTIONS[6].x)} 
          Dny={upMainLineY} 
          UpName="202A" 
          DnName="202B" 
        />

        <SlantingLine 
          Upx={DN_LOOP_LINE_SECTIONS[0].x + (8/10) * (DN_LOOP_LINE_SECTIONS[1].x - DN_LOOP_LINE_SECTIONS[0].x)} 
          Upy={dnLoopLineY} 
          Dnx={DN_MAIN_LINE_SECTIONS[2].x + (4.5/10) * (DN_MAIN_LINE_SECTIONS[3].x - DN_MAIN_LINE_SECTIONS[2].x)} 
          Dny={dnMainLineY} 
          UpName="296A" 
          DnName="296B" 
        />

        <SlantingLine 
          Upx={DN_LOOP_LINE_SECTIONS[2].x + (5/10) * (dnLoopLineEnd - DN_LOOP_LINE_SECTIONS[2].x)} 
          Upy={dnLoopLineY} 
          Dnx={DN_MAIN_LINE_SECTIONS[4].x + (6.5/10) * (DN_MAIN_LINE_SECTIONS[5].x - DN_MAIN_LINE_SECTIONS[4].x)} 
          Dny={dnMainLineY} 
          UpName="242A" 
          DnName="242B" 
        />



        <Triangles
          dnMainLineY={dnMainLineY}
          dnLoopLineY={dnLoopLineY}
          upMainLineY={upMainLineY}
          upLoopLineY={upLoopLineY}
        />

        {/* Vertical section markers for UP MAIN LINE */}
        <VerticalSections
          sections={scaleSections.up}
          lineY={upMainLineY}
          lineKeyPrefix="up"
        />
        {/* Vertical section markers for DN MAIN LINE */}
        <VerticalSections
          sections={scaleSections.dn}
          lineY={dnMainLineY}
          lineKeyPrefix="dn"
        />
        {/* Vertical section markers for DN LOOP LINE */}
        <VerticalSections
          sections={scaleSections.dnLoop}
          lineY={dnLoopLineY}
          lineKeyPrefix="dn-loop"
        />
        {/* Vertical section markers for UP LOOP LINE */}
        <VerticalSections
          sections={scaleSections.upLoop}
          lineY={upLoopLineY}
          lineKeyPrefix="up-loop"
        /> 



      </svg>
    </div>
  );
};

export default MainTrackLayout;