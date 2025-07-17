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
  signalOffsetY: 12,
  mainlineStart: BASE_MAINLINE_START,
  mainlineEnd: BASE_MAINLINE_END,
  dnLoopLineStart: (BASE_MAINLINE_END - BASE_MAINLINE_START) / 7,
  dnLoopLineEnd: (3.5) * (BASE_MAINLINE_END - BASE_MAINLINE_START) / 7,
  upLoopLineStart: BASE_MAINLINE_END - (2.5) * (BASE_MAINLINE_END - BASE_MAINLINE_START)/ 4.1,
  upLoopLineEnd: BASE_MAINLINE_END - (BASE_MAINLINE_END - BASE_MAINLINE_START)/ 4.1,
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



