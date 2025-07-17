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
  const lines = text.split(/\r?\n/).map(l => l.trim());
  const fromLine = lines.find(l => /^From\s+\d{2}-[A-Za-z]{3}-\d{4}/.test(l));
  if (!fromLine) throw new Error('No "From ..." timestamp found');
  const fromMatch = fromLine.match(/From\s+(\d{2})-([A-Za-z]{3})-(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (!fromMatch) throw new Error('Invalid "From ..." format');
  const [, DD0, Mon0, YYYY0, hh0, mm0, ss0] = fromMatch;
  const initialTime = new Date(+YYYY0, MONTHS[Mon0], +DD0, +hh0, +mm0, +ss0);

  // 2) Split text at each full-precision timestamp (lookahead)
  //    Use strict month pattern to avoid gobbling extra slashes
  const rawEntries = text
    .split(/(?=\d{2}\/[A-Za-z]{3}\/\d{4}\s+\d{2}:\d{2}:\d{2}\.\d{3})/g)
    .map(s => s.trim())
    .filter(s => ENTRY_START.test(s));

  // 3) Parse each entry into { time, raw }
  const allLogEntries = rawEntries.map(full => {
    const flat = full.replace(/\r?\n/g, ' ');
    const m = flat.match(/^(\d{2})\/([A-Za-z]{3})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})\.(\d{3})/);
    if (!m) throw new Error('Bad entry timestamp: ' + flat.slice(0, 30));
    const [, DD, Mon, YYYY, hh, mm, ss, mmm] = m;
    const time = new Date(+YYYY, MONTHS[Mon], +DD, +hh, +mm, +ss, +mmm);
    return { time, raw: flat };
  });

  return { initialTime, allLogEntries };
}
