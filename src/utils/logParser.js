// src/utils/logParser.js
// Robustly splits raw log text into timestamped entries, preserving milliseconds

const MONTHS = {
  Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
  Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11
};

// Matches start of a valid entry: dd/MMM/yyyy HH:mm:ss.SSS
const ENTRY_START = /^\d{2}\/[A-Za-z]{3}\/\d{4}\s+\d{2}:\d{2}:\d{2}\.\d{3}/;

export function parseLogFile(text) {
  // 1) Extract initial "From ..." timestamp
  const textLines = text.split(/\r?\n/);
  const fromLine = textLines.find(l => /^From\s+\d{2}-[A-Za-z]{3}-\d{4}/.test(l.trim()));
  if (!fromLine) throw new Error('No "From ..." timestamp found');
  const fromMatch = fromLine.trim().match(/From\s+(\d{2})-([A-Za-z]{3})-(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (!fromMatch) throw new Error('Invalid "From ..." format');
  const [, DD0, Mon0, YYYY0, hh0, mm0, ss0] = fromMatch;
  const initialTime = new Date(+YYYY0, MONTHS[Mon0], +DD0, +hh0, +mm0, +ss0);

  // 2) Reconstruct entries by iterating through lines, which is more robust for PDF text extraction.
  const allLogEntries = [];
  textLines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine === '') return; // Skip empty lines

    if (ENTRY_START.test(trimmedLine)) {
      // This line is the start of a new entry.
      const m = trimmedLine.match(/^(\d{2})\/([A-Za-z]{3})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})\.(\d{3})/);
      if (m) {
        const [, DD, Mon, YYYY, hh, mm, ss, mmm] = m;
        const time = new Date(+YYYY, MONTHS[Mon], +DD, +hh, +mm, +ss, +mmm);
        allLogEntries.push({ time, raw: trimmedLine });
      }
    } else if (allLogEntries.length > 0) {
      // This is a continuation of the previous line. Append it.
      const lastEntry = allLogEntries[allLogEntries.length - 1];
      lastEntry.raw += ' ' + trimmedLine;
    }
  });


  if (allLogEntries.length === 0) {
    console.warn("No valid log entries were parsed from the file.");
  }

  return { initialTime, allLogEntries };
}
