import React, { createContext, useContext, useState, useCallback } from 'react';

// 1️⃣ Create the context
export const RouteContext = createContext();

// 2️⃣ Hard‑coded mapping of route IDs → the tracks they reserve
const routeToTracks = {
  'S1-01A':     ['1XT','202BXT','203BXT','203AXT','01XT'],
  'S1-01B':     ['1XT','202BXT','203BXT','203AXT','01XT'],
  'C1-01A':     ['1XT'],
  'S1-02AA':    ['1XT','202BXT','203BXT','02AXT'],
  'C1-02AA':    ['1XT'],
  'S2-DZ':      ['2XT','2AXT'],
  'S4-DX':      ['202AXT','A2XT'],
  'S39-02BA':   ['247XT','249AXT','249BXT','02BXT'],
  'S41-02BA':   ['249BXT','02BXT'],
  'S97-UX':     ['298AXT','A99XT'],
  'S99-UZ':     ['99XT','99AXT'],
  'SH104-UW':   ['202AXT','202BXT'],
  'SH123-01A':  ['203AXT'],
  'SH124-SE1':  ['203AXT'],
  'SH124-UW':   ['203AXT','203BXT','202BXT'],
  'SH131-02BA': ['247XT','249XT','249BXT'],
  'SH139-02BA': ['247XT','249AXT','249BXT'],
  'SH140-02AA': ['249BXT'],
  'SH140-01A':  ['249BXT','249AXT','247XT'],
  'SH140-SM1':  ['249BXT','249AXT','247XT'],
  'SH141-02BA': ['249BXT'],
  'SH142-03BA': ['242BXT'],
  'SH143-03AA': ['242BXT'],
  'SH143-04A':  ['242BXT','242AXT'],
  'SH144-03BA': ['242AXT','242BXT'],
  'SH193-SW2':  ['296AXT'],
  'SH193-DW':   ['296AXT','296BXT','298BXT'],
  'SH196-04A':  ['296AXT'],
  'SH197-DW':   ['298AXT','298BXT'],
};

export function RouteProvider({ children }) {
  // holds the Set of all reserved track IDs
  const [reservedTracks, setReservedTracks] = useState(new Set());

  // call this for every raw log line
  const parseRouteLine = useCallback((logLine) => {
    if (!logLine.includes('Type:Route Set')) return;

    const m = logLine.match(/Type:Route Set\s*\[([^\]]+)\]/);
    if (!m) return;

    const routeId = m[1].trim();
    const tracks = routeToTracks[routeId];
    if (tracks) {
      console.log(`📦 [RouteContext] Adding route "${routeId}" →`, tracks);
      setReservedTracks(prev => {
        const merged = new Set(prev);
        tracks.forEach(id => merged.add(id));
        return merged;
      });
    } else {
      console.warn(`⚠️ [RouteContext] No mapping for route "${routeId}"`);
    }
  }, []);

  return (
    <RouteContext.Provider value={{
      reservedTracks,
      parseRouteLine
    }}>
      {children}
    </RouteContext.Provider>
  );
}

export const useRouteContext = () => useContext(RouteContext);
