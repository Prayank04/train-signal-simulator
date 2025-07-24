// Railway Control System Constants

// Utility to parse initial timestamp from file text
export function parseInitialTimeFromText(text) {
  // Look for: From DD-Mon-YYYY HH:MM:SS
  const regex = /From\s+(\d{1,2}-[A-Za-z]+-\d{4})\s+(\d{2}:\d{2}:\d{2})/;
  const match = text.match(regex);
  if (match) {
    const datePart = match[1]; // e.g., 26-May-2025
    const timePart = match[2]; // e.g., 15:21:00
    const normalized = datePart.replace(/-/g, ' ');
    const dateString = `${normalized} ${timePart}`; // "26 May 2025 15:21:00"
    const parsed = new Date(dateString);
    if (!isNaN(parsed)) return parsed;
  }
  return null;
}

export function parseDateFromEntry(raw) {
  // raw starts with: DD/Mon/YYYY HH:MM:SS.mmm ...
  const regex = /^(\d{1,2})\/([A-Za-z]{3})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})\.(\d{3})/;
  const m = raw.match(regex);
  if (!m) return null;
  const [ , day, monStr, year, hh, mm, ss, msec ] = m;
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = monthNames.findIndex(mn => mn.toLowerCase() === monStr.toLowerCase());
  if (month < 0) return null;
  // Construct Date in local or UTC? Use UTC to avoid timezone shifts:
  const dt = new Date(Date.UTC(
    parseInt(year), month, parseInt(day),
    parseInt(hh), parseInt(mm), parseInt(ss), parseInt(msec)
  ));
  return dt;
}

export const trackStatusToColor = {
  Reserved: 'yellow',
  Occupied: 'red',
  Clear: 'white'
};


export const BASE_MAINLINE_START = 25;
export const BASE_MAINLINE_END = 1360;

// Keep TRACK_LAYOUT_CONSTANTS as is but reference the base values
export const TRACK_LAYOUT_CONSTANTS = {
  marginX: 25,
  spacing: 10,
  circleRadius: 4,
  dnLoopLineY: 40,
  dnMainLineY: 90,
  upMainLineY: 140,
  upLoopLineY: 190,
  yardLine:240,
  xtline:130,
  signalOffsetY: 12,

  mainlineStart: BASE_MAINLINE_START,
  mainlineEnd: BASE_MAINLINE_END,
  dnLoopLineStart: (BASE_MAINLINE_END - BASE_MAINLINE_START) / 7,
  dnLoopLineEnd: (3.5) * (BASE_MAINLINE_END - BASE_MAINLINE_START) / 7,
  upLoopLineStart: BASE_MAINLINE_END - (2.5) * (BASE_MAINLINE_END - BASE_MAINLINE_START)/ 4.1,
  upLoopLineEnd: BASE_MAINLINE_END - (BASE_MAINLINE_END - BASE_MAINLINE_START)/ 4.1,
  yardLineStart:  BASE_MAINLINE_START + (BASE_MAINLINE_END - BASE_MAINLINE_START) / 2.025,
  yardLineEnd : BASE_MAINLINE_START + 2.75 * (BASE_MAINLINE_END - BASE_MAINLINE_START) / 5,
  xtLineStart : BASE_MAINLINE_START + (BASE_MAINLINE_END - BASE_MAINLINE_START) / 2.1,
  xtLineEnd : BASE_MAINLINE_START + 2.65 * (BASE_MAINLINE_END - BASE_MAINLINE_START) / 5,


  leftbot_lineStart: BASE_MAINLINE_START - 26,
  leftbot_lineEnd: BASE_MAINLINE_END - 475,
  rightbot_lineStart: BASE_MAINLINE_START + 1030,
  rightbot_lineEnd: BASE_MAINLINE_END - 3,
  bottom_line1_Y: 25,
  bottom_line2_Y: 60,
  bottom_line3_Y: 90,
  bottom_line4_Y: 125
};


export const UP_MAIN_LINE_SECTIONS = [
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Between UZ and UX' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (2.8)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Between 298AXT and UX' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (4.1)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'At S97/SH197 signal' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (6.32)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Between 249B and 02B' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (7.7)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'At S41/SH141 signal' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (10.06)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Between 203B and 02A' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (11.41)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Between 202B and 203BXT' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (12.55)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'After UW' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (13.85)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Above "C" circle in S1/C1 signal' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (15.2)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Above 4th circle of 3101A' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (15.4)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Above "A" circle of 3101A' }
];

export const DN_MAIN_LINE_SECTIONS = [
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Between 3202XT and 98XT' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (1.9)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Between 98XT and DW' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (3.25)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Between 298B and 296BXT' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (4.25)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Before 03AXT' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (6.9)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'At signal S42/SH142' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (7.88)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'At SH143' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (10.55)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'At signal S4/SH104' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (11.68)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'Just before A2XT' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (14)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'At S2' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (15.4)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'On signal A3114 (first line)' },
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (15.6)*(TRACK_LAYOUT_CONSTANTS.mainlineEnd - TRACK_LAYOUT_CONSTANTS.mainlineStart)/16.3, label: 'On signal A3114 (second line)' }
];

export const DN_LOOP_LINE_SECTIONS = [
  { x: TRACK_LAYOUT_CONSTANTS.dnLoopLineStart + (TRACK_LAYOUT_CONSTANTS.dnLoopLineEnd - TRACK_LAYOUT_CONSTANTS.dnLoopLineStart)/9.45, label: 'At SH196 signal' },
  { x: TRACK_LAYOUT_CONSTANTS.dnLoopLineStart + (3.62) * (TRACK_LAYOUT_CONSTANTS.dnLoopLineEnd - TRACK_LAYOUT_CONSTANTS.dnLoopLineStart)/9.45, label: 'At SH193 signal' },
  { x: TRACK_LAYOUT_CONSTANTS.dnLoopLineStart + (7.9) * (TRACK_LAYOUT_CONSTANTS.dnLoopLineEnd - TRACK_LAYOUT_CONSTANTS.dnLoopLineStart)/9.45, label: 'At S44/SH144 signal' }
];

export const UP_LOOP_LINE_SECTIONS = [
  { x: TRACK_LAYOUT_CONSTANTS.upLoopLineStart + (TRACK_LAYOUT_CONSTANTS.upLoopLineEnd - TRACK_LAYOUT_CONSTANTS.upLoopLineStart)/ 5.6, label: 'Between 249AXT and 247XT' },
  { x: TRACK_LAYOUT_CONSTANTS.upLoopLineStart + (1.87)*(TRACK_LAYOUT_CONSTANTS.upLoopLineEnd - TRACK_LAYOUT_CONSTANTS.upLoopLineStart)/ 5.6, label: 'At S39 signal' },
  { x: TRACK_LAYOUT_CONSTANTS.upLoopLineStart + (3.48)*(TRACK_LAYOUT_CONSTANTS.upLoopLineEnd - TRACK_LAYOUT_CONSTANTS.upLoopLineStart)/ 5.6, label: 'At SH124 signal' },
  { x: TRACK_LAYOUT_CONSTANTS.upLoopLineStart + (5)*(TRACK_LAYOUT_CONSTANTS.upLoopLineEnd - TRACK_LAYOUT_CONSTANTS.upLoopLineStart)/ 5.6, label: 'At SH123 signal' }
];

export const YARD_LINES_SECTIONS = [
  {x : TRACK_LAYOUT_CONSTANTS.yardLineStart + (TRACK_LAYOUT_CONSTANTS.yardLineEnd - TRACK_LAYOUT_CONSTANTS.yardLineStart)/2.2, label: 'Yard Line'}
]

export const XT_LINE_SECTIONS = [
  {
    x: TRACK_LAYOUT_CONSTANTS.xtLineStart + (0.15) * (TRACK_LAYOUT_CONSTANTS.xtLineEnd - TRACK_LAYOUT_CONSTANTS.xtLineStart) / 1.0,
  }
];


// DN MAIN LINE arrows (right to left) - LEFT-facing
export const DN_MAIN_LINE_ARROWS = [
  { x: TRACK_LAYOUT_CONSTANTS.mainlineStart + (0.87) * (DN_MAIN_LINE_SECTIONS[0].x  - TRACK_LAYOUT_CONSTANTS.mainlineStart), direction: 'left' },
  { x: DN_MAIN_LINE_SECTIONS[3].x + (0.9) * (DN_MAIN_LINE_SECTIONS[4].x - DN_MAIN_LINE_SECTIONS[3].x) , direction: 'left' },
  { x: DN_MAIN_LINE_SECTIONS[5].x + (0.07) * (DN_MAIN_LINE_SECTIONS[6].x - DN_MAIN_LINE_SECTIONS[5].x) , direction: 'right' },
  { x: DN_MAIN_LINE_SECTIONS[5].x + (0.93) * (DN_MAIN_LINE_SECTIONS[6].x - DN_MAIN_LINE_SECTIONS[5].x) , direction: 'left'},
  { x: DN_MAIN_LINE_SECTIONS[7].x + (0.93) * (DN_MAIN_LINE_SECTIONS[8].x - DN_MAIN_LINE_SECTIONS[7].x) , direction: 'left'}
];

// DN LOOP LINE arrows (right to left) - LEFT-facing
export const DN_LOOP_LINE_ARROWS = [
  { x: TRACK_LAYOUT_CONSTANTS.dnLoopLineStart + (2 / 3) * (250 - TRACK_LAYOUT_CONSTANTS.dnLoopLineStart), direction: 'left' },
  { x: DN_LOOP_LINE_SECTIONS[1].x + (0.07) * (DN_LOOP_LINE_SECTIONS[2].x - DN_LOOP_LINE_SECTIONS[1].x) , direction: 'right' },
  { x: DN_LOOP_LINE_SECTIONS[1].x + (0.93) * (DN_LOOP_LINE_SECTIONS[2].x - DN_LOOP_LINE_SECTIONS[1].x) , direction: 'left' }
];

// UP MAIN LINE arrows (left to right) - RIGHT-facing
export const UP_MAIN_LINE_ARROWS = [
  { x: UP_MAIN_LINE_SECTIONS[0].x + (0.06) * (UP_MAIN_LINE_SECTIONS[1].x - UP_MAIN_LINE_SECTIONS[0].x), direction: 'right'},
  { x: UP_MAIN_LINE_SECTIONS[2].x + (0.06) * (UP_MAIN_LINE_SECTIONS[3].x - UP_MAIN_LINE_SECTIONS[2].x), direction: 'right' },
  { x: UP_MAIN_LINE_SECTIONS[2].x + (0.93) * (UP_MAIN_LINE_SECTIONS[3].x - UP_MAIN_LINE_SECTIONS[2].x), direction: 'left' },
  { x: UP_MAIN_LINE_SECTIONS[4].x + (0.08) * (UP_MAIN_LINE_SECTIONS[5].x - UP_MAIN_LINE_SECTIONS[4].x), direction: 'right'},
  { x: UP_MAIN_LINE_SECTIONS[8].x + (0.09) * (UP_MAIN_LINE_SECTIONS[9].x - UP_MAIN_LINE_SECTIONS[8].x), direction: 'right' }
];

// UP LOOP LINE arrows (left to right) - RIGHT-facing
export const UP_LOOP_LINE_ARROWS = [
  { x: UP_LOOP_LINE_SECTIONS[3].x + (0.2) * (TRACK_LAYOUT_CONSTANTS.upLoopLineEnd - UP_LOOP_LINE_SECTIONS[3].x), direction: 'right' },
  { x: UP_LOOP_LINE_SECTIONS[1].x + (0.92) * (UP_LOOP_LINE_SECTIONS[2].x - UP_LOOP_LINE_SECTIONS[1].x), direction: 'left' },
  { x: UP_LOOP_LINE_SECTIONS[1].x + (0.06) * (UP_LOOP_LINE_SECTIONS[2].x - UP_LOOP_LINE_SECTIONS[1].x), direction: 'right'}
];

export const YD_LINE_ARROW = [
  { x: TRACK_LAYOUT_CONSTANTS.yardLineStart + (0.5) * (TRACK_LAYOUT_CONSTANTS.yardLineEnd - TRACK_LAYOUT_CONSTANTS.yardLineStart), direction: 'right' }
];


export const LEFT_BOTTOM_LINE1_SECTIONS = [
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25) + 1.5 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24, label: 'sec 1' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 1.85  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24, label: 'sec 2' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 3.2  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24, label: 'sec 3' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 3.55  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 4' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 4.8  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 5' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 5.2  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 6' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 6.5  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 7' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 6.9  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 8' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 8.6  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 9' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 9  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 10' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 10.55  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 11' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 10.92  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 12' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 12.8  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 13' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 13.24  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 14' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 14.77  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 15' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 15.18  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 16' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 16.8  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 17' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 17.2  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 18' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 18.7  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 19' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 19.05  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 20' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 20.67  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 21' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 21.05  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 22' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 22.5  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 23' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 22.9  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 24' },
];

// “Line 2” – the second bottom track
export const LEFT_BOTTOM_LINE2_SECTIONS = [
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25) + 1.5 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 1' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25) + 1.85 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 2' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 4.8  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 3' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 5.2  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 4' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 8.6 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 5' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 9  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 6' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 12.8 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 7' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 13.24  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 8' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 16.8  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 9' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 17.2  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 10' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 20.67  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 11' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 21.05  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 12' },
];

// “Line 3” – the third bottom track
export const LEFT_BOTTOM_LINE3_SECTIONS = [
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 1.55 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 1' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 1.95  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 2' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 5.15  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 3' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 5.55  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 4' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 9.18 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 5' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 9.56  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 6' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 13.15  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 7' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 13.5  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 8' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 17.2  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 9' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 17.6  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 10' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 20.65  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 11' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 21.03  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 12' },
];

// “Line 4” (the UP bottom track)
export const LEFT_BOTTOM_LINE4_SECTIONS = [
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 1.52 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 1' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 1.92 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,   label: 'sec 2' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 3.35 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 3' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 3.75 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 4' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 5.1 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 5' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 5.5 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 6' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 7.06 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 7' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 7.45 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 8' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 9.15 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 9' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 9.54 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 10' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 11.2 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 11' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 11.6 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 12' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 13.1 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 13' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 13.5 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 14' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 15.5 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 15' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 15.9 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 16' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 17.25 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 17' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 17.65 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 18' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 18.9 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 19' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 19.3 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 20' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 20.65 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 21' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 21.05 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 22' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 22.32 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 23' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  - 25) + 22.72 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd - 475) - (TRACK_LAYOUT_CONSTANTS.mainlineStart - 25)) / 24,  label: 'sec 24' },
];



export const RIGHT_BOTTOM_LINE1_SECTIONS = [
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040) + 2.4 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4, label: 'sec 1' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  + 1040) + 2.69  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4, label: 'sec 2' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  + 1040) + 4.13  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4, label: 'sec 3' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  + 1040) + 4.4  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4,   label: 'sec 4' },
];

export const RIGHT_BOTTOM_LINE2_SECTIONS = [
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040) + 2.4 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4, label: 'sec 1' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  + 1040) + 2.57  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4, label: 'sec 2' },
];

export const RIGHT_BOTTOM_LINE3_SECTIONS = [
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040) + 1.55 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4, label: 'sec 1' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  + 1040) + 1.84  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4, label: 'sec 2' },
];

export const RIGHT_BOTTOM_LINE4_SECTIONS = [
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040) + 1.55 * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4, label: 'sec 1' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  + 1040) + 1.84  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4, label: 'sec 2' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  + 1040) + 3.37  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4, label: 'sec 3' },
  { x: (TRACK_LAYOUT_CONSTANTS.mainlineStart  + 1040) + 3.64  * ((TRACK_LAYOUT_CONSTANTS.mainlineEnd) - (TRACK_LAYOUT_CONSTANTS.mainlineStart + 1040)) / 6.4,   label: 'sec 4' },
];