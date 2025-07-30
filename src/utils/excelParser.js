// src/utils/excelParser.js

/**
 * Helper function to safely parse comma-separated track strings from the Excel file.
 * @param {string} trackString The raw string from the Excel cell.
 * @returns {string[]} An array of cleaned track IDs.
 */
const splitTracks = (trackString) => {
  if (!trackString || typeof trackString !== 'string') return [];
  return trackString.split(',').map(t => t.trim()).filter(Boolean);
};

/**
 * Parses the raw JSON data from the Excel sheet and structures it into a Map
 * for efficient lookups, similar to a database.
 * @param {object[]} jsonData The raw JSON array from the xlsx library.
 * @returns {Map<string, object>} A Map where the key is a composite of signal and route buttons,
 * and the value is an object with all the route's details.
 */
export function parseAndStructureData(jsonData) {
  const routeDatabase = new Map();
  if (!jsonData) return routeDatabase;

  // Define the exact column names from the Excel file, including newlines.
  // These keys are based on how the xlsx library interprets the merged headers.
  const SIGNAL_KEY = 'SIGNAL\nBUTTON\nGN';
  const ROUTE_KEY = 'ROUTE\nBUTTON\nUN';
  const IN_ROUTE_TRACKS_KEY = 'TRACK\nSECTIONS';
  // The xlsx library will likely rename the second "TRACK SECTIONS" column to avoid duplicates.
  const IN_OVERLAP_TRACKS_KEY = 'TRACK\nSECTIONS_1';
  const OVERLAP_CLEARED_KEY = 'OVERLAP RELEASES\n120SEC. AFTER DAC\nTRACK SECTION';
  const OVERLAP_OCCUPIED_KEY = '__EMPTY'; // xlsx library often uses this for merged/empty headers

  jsonData.forEach(row => {
    const signalButton = row[SIGNAL_KEY];
    const routeButton = row[ROUTE_KEY];

    // Only process rows that have both a signal and route button defined.
    if (signalButton && routeButton) {
      // Create a unique composite key for this route (e.g., "S1-02AA").
      const routeKey = `${signalButton}-${routeButton}`;

      const routeInfo = {
        id: routeKey,
        inRouteTracks: splitTracks(row[IN_ROUTE_TRACKS_KEY]),
        timedOverlapTracks: splitTracks(row[IN_OVERLAP_TRACKS_KEY]), 
        overlapReleaseCondition: {
          cleared: row[OVERLAP_CLEARED_KEY],
          occupied: row[OVERLAP_OCCUPIED_KEY],
        },
        timedOverlapDuration: 120000, // 120 seconds
      };
      
      // Store the structured route information in our "database".
      routeDatabase.set(routeKey, routeInfo);
    }
  });
  
  console.log('[excelParser] Created route database with', routeDatabase.size, 'entries.');
  return routeDatabase;
}
