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
  // We no longer need to pull reserved tracks from RouteContext for the clear logic.
  // const { reservedTracks = new Set() } = useRouteContext() || {};
  
  const [trackStates, setTrackStates] = useState({});
  // New state to hold a memory of tracks that were part of a reservation.
  const [reservedMemory, setReservedMemory] = useState(new Set());

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
      const newReservedTracks = new Set();
      matches.forEach(m => {
        const trackId = m[1];
        updates[trackId] = 'RESERVED';
        newReservedTracks.add(trackId);
        console.log(`🟡 Track Reserved: ${trackId} → yellow`);
      });
      
      // Update the visual state of the tracks
      setTrackStates(prev => ({ ...prev, ...updates }));

      // Add the newly reserved tracks to our internal memory
      setReservedMemory(prevMemory => {
        const mergedMemory = new Set(prevMemory);
        newReservedTracks.forEach(id => mergedMemory.add(id));
        console.log('🧠 [TrackContext] Updated reserved memory:', mergedMemory);
        return mergedMemory;
      });
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
        // Check against our new internal memory set
        if (reservedMemory.has(trackId)) {
          console.log(`⏳ ${trackId} was in memory, staying yellow for 120s`);
          setTrackStates(prev => ({ ...prev, [trackId]: 'RESERVED' }));
          
          setTimeout(() => {
            console.log(`✅ ${trackId} → white after 120s`);
            setTrackStates(prev => ({ ...prev, [trackId]: 'CLEAR' }));
            
            // Remove the track from the memory set after the timer completes
            setReservedMemory(prevMemory => {
              const newMemory = new Set(prevMemory);
              newMemory.delete(trackId);
              console.log(`🧠 [TrackContext] Removed ${trackId} from memory. New memory:`, newMemory);
              return newMemory;
            });

          }, 120_000);
        } else {
          console.log(`⚪ Track Cleared: ${trackId} → white`);
          setTrackStates(prev => ({ ...prev, [trackId]: 'CLEAR' }));
        }
      }
    }
  }, [reservedMemory]); // Dependency is now on our internal memory set

  const resetTracks = useCallback(() => {
    console.log("♻️ Resetting all track states to default");
    setTrackStates({});
    // Also reset the reserved memory
    setReservedMemory(new Set());
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
