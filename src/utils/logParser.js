// src/utils/logParser.js
// Robustly splits raw log text into timestamped entries by re-combining broken lines.

const MONTHS = {
  Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
  Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11
};

// Matches the start of a valid log entry: dd/MMM/yyyy HH:mm:ss.SSS
const ENTRY_START = /^\d{2}\/[A-Za-z]{3}\/\d{4}\s+\d{2}:\d{2}:\d{2}\.\d{3}/;

export function parseLogFile(text) {
  // 1) Extract initial "From ..." timestamp by searching the entire text block.
  // This version makes the hyphens in the date optional to handle different PDF text extractions.
  const fromMatch = text.match(/From\s+(\d{2})-?([A-Za-z]{3})-?(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (!fromMatch) throw new Error('No "From ..." timestamp found in the log file.');
  
  const [, DD0, Mon0, YYYY0, hh0, mm0, ss0] = fromMatch;
  const initialTime = new Date(+YYYY0, MONTHS[Mon0], +DD0, +hh0, +mm0, +ss0);

  // 2) Reconstruct entries using a more robust line-by-line approach.
  const allLogEntries = [];
  let currentEntryLines = [];
  const textLines = text.split(/\r?\n/);

  for (const line of textLines) {
    const trimmedLine = line.trim();
    if (trimmedLine === '') continue;

    if (ENTRY_START.test(trimmedLine)) {
      // When a new timestamp is found, process the previously collected lines.
      if (currentEntryLines.length > 0) {
        const raw = currentEntryLines.join(' ').trim();
        const m = raw.match(ENTRY_START);
        if (m) {
          const [timestamp] = m;
          const [datePart, timePart] = timestamp.split(' ');
          const [DD, Mon, YYYY] = datePart.split('/');
          const [hh, mm, ss, mmm] = timePart.split(/[:.]/);
          const time = new Date(+YYYY, MONTHS[Mon], +DD, +hh, +mm, +ss, +mmm);
          allLogEntries.push({ time, raw });
        }
      }
      // Start a new entry with the current line.
      currentEntryLines = [trimmedLine];
    } else {
      // If it's not a new timestamp, it's a continuation line.
      if (currentEntryLines.length > 0) {
        currentEntryLines.push(trimmedLine);
      }
    }
  }

  // 3) Don't forget to process the very last entry in the file.
  if (currentEntryLines.length > 0) {
    const raw = currentEntryLines.join(' ').trim();
    const m = raw.match(ENTRY_START);
    if (m) {
        const [timestamp] = m;
        const [datePart, timePart] = timestamp.split(' ');
        const [DD, Mon, YYYY] = datePart.split('/');
        const [hh, mm, ss, mmm] = timePart.split(/[:.]/);
        const time = new Date(+YYYY, MONTHS[Mon], +DD, +hh, +mm, +ss, +mmm);
        allLogEntries.push({ time, raw });
    }
  }

  if (allLogEntries.length === 0) {
    console.warn("Warning: No valid log entries were parsed from the file.");
  }

  return { initialTime, allLogEntries };
}
