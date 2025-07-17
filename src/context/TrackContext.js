import React, { createContext, useContext, useState, useCallback } from 'react';
import { useRouteContext } from './RouteContext';

export const TrackContext = createContext();
export const useTrackContext = () => useContext(TrackContext);

export const statusColors = {
  RESERVED: 'yellow',
  OCCUPIED: 'red',
  CLEAR: 'white'
};

export function TrackProvider({ children }) {
  // Only pull in the set of recently‐reserved IDs
  const { recentReservedTracks = new Set() } = useRouteContext() || {};
  const [trackStates, setTrackStates] = useState({});

  const processTrackLine = useCallback((logLine) => {
    const isReservation =
      logLine.includes('Reservation (Route)') &&
      !logLine.includes('Temporary');
    const isOccupancy =
      logLine.includes('Current[Occupancy]') &&
      logLine.includes('Previous[Clear]');
    const isClear =
      logLine.includes('Current[Clear]') &&
      logLine.includes('Previous[Occupancy]');

    if (!isReservation && !isOccupancy && !isClear) return;

    console.log('🧾 [TrackContext] Processing:', logLine);

    // 🟡 Reservation (Route) → mark all TS[…] as RESERVED
    if (isReservation) {
      const matches = [
        ...logLine.matchAll(/TS\s+\[(\w+)\]/g),
        ...logLine.matchAll(/Equ\.\d+:TS\s+\[(\w+)\]/g),
      ];
      const updates = {};
      matches.forEach(m => {
        const trackId = m[1];
        updates[trackId] = 'RESERVED';
        console.log(`🟡 Track Reserved: ${trackId} → yellow`);
      });
      setTrackStates(prev => ({ ...prev, ...updates }));
      return;
    }

    // 🔴 Occupied
    if (isOccupancy) {
      const m = logLine.match(/TS\s*\[(\w+)\]/);
      if (m) {
        console.log(`🔴 Track Occupied: ${m[1]} → red`);
        setTrackStates(prev => ({ ...prev, [m[1]]: 'OCCUPIED' }));
      }
      return;
    }

    // ⚪ Cleared
    if (isClear) {
      const m = logLine.match(/TS\s*\[(\w+)\]/);
      if (m) {
        const trackId = m[1];
        if (recentReservedTracks.has(trackId)) {
          console.log(`⏳ ${trackId} was reserved, staying yellow for 120s`);
          setTrackStates(prev => ({ ...prev, [trackId]: 'RESERVED' }));
          setTimeout(() => {
            console.log(`✅ ${trackId} → white after 120s`);
            setTrackStates(prev => ({ ...prev, [trackId]: 'CLEAR' }));
          }, 120_000);
        } else {
          console.log(`⚪ Track Cleared: ${trackId} → white`);
          setTrackStates(prev => ({ ...prev, [trackId]: 'CLEAR' }));
        }
      }
    }
  }, [recentReservedTracks]);

  const resetTracks = useCallback(() => {
    console.log("♻️ Resetting all track states to default");
    setTrackStates({});
  }, []);

  return (
    <TrackContext.Provider value={{
      trackStates,
      processTrackLine,
      resetTracks
    }}>
      {children}
    </TrackContext.Provider>
  );
}
