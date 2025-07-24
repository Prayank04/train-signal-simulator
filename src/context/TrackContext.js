import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { TimeContext } from './TimeContext';

export const TrackContext = createContext();
export const useTrackContext = () => useContext(TrackContext);

export const statusColors = {
  RESERVED: 'yellow',
  OCCUPIED: 'red',
  CLEAR: 'white'
};

// Helper function to safely parse comma-separated track strings from the Excel file
const splitTracks = (trackString) => {
  if (!trackString || typeof trackString !== 'string') return [];
  return trackString.split(',').map(t => t.trim()).filter(Boolean);
};

export function TrackProvider({ children }) {
  const { excelData } = useContext(TimeContext);
  const [trackStates, setTrackStates] = useState({});
  const [activeRoutes, setActiveRoutes] = useState([]);

  // Function to update multiple tracks at once
  const setMultipleTrackStates = useCallback((updates) => {
    if (Object.keys(updates).length > 0) {
        setTrackStates(prev => ({ ...prev, ...updates }));
    }
  }, []);

  // This function now ONLY handles direct track occupancy/clear events from the log file.
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
      return;
    }

    if (isOccupancy) {
      const m = logLine.match(/TS\s*\[(\w+)\]/);
      if (m) {
        console.log(`🔴 Track Occupied: ${m[1]} → red`);
        setTrackStates(prev => ({ ...prev, [m[1]]: 'OCCUPIED' }));
      }
      return;
    }

    if (isClear) {
      const m = logLine.match(/TS\s*\[(\w+)\]/);
      if (m) {
        console.log(`⚪ Track Cleared: ${m[1]} → white`);
        setTrackStates(prev => ({ ...prev, [m[1]]: 'CLEAR' }));
      }
    }
  }, []);

  // This is the main function that processes a "Route Set" command from a log line
  const parseRouteLine = useCallback((logLine) => {
    if (!excelData || !logLine.includes('Type:Route Set')) return;

    const routeMatch = logLine.match(/\[([A-Z0-9]+)-([A-Z0-9]+)\]/);
    if (!routeMatch) return;

    const [, signalButton, routeButton] = routeMatch;
    console.log(`[TrackContext] Parsed route command: Signal=${signalButton}, Route=${routeButton}`);

    const SIGNAL_KEY = 'SIGNAL\nBUTTON\nGN';
    const ROUTE_KEY = 'ROUTE\nBUTTON\nUN';
    const IN_ROUTE_TRACKS_KEY = 'IN ROUTE';
    const IN_OVERLAP_TRACKS_KEY = 'IN OVERLAP';
    const OVERLAP_CLEARED_KEY = 'OVERLAP RELEASES\n120SEC. AFTER DAC\nTRACK SECTION';
    const OVERLAP_OCCUPIED_KEY = '__EMPTY';

    const routeInfo = excelData.find(row => 
        String(row[SIGNAL_KEY]) === signalButton && 
        String(row[ROUTE_KEY]) === routeButton
    );

    if (!routeInfo) {
      console.warn(`[TrackContext] No route found in Excel for Signal=${signalButton}, Route=${routeButton}`);
      return;
    }
    console.log('[TrackContext] Found matching route in Excel:', routeInfo);

    const inRouteTracks = splitTracks(routeInfo[IN_ROUTE_TRACKS_KEY]);
    const inOverlapTracks = splitTracks(routeInfo[IN_OVERLAP_TRACKS_KEY]);
    const allTracksToReserve = [...inRouteTracks, ...inOverlapTracks];
    
    const updates = {};
    allTracksToReserve.forEach(trackId => {
      updates[trackId] = 'RESERVED';
    });
    setMultipleTrackStates(updates);
    console.log(`[TrackContext] Reserving tracks for route ${signalButton}-${routeButton}:`, allTracksToReserve);

    const newActiveRoute = {
      id: `${signalButton}-${routeButton}`,
      inRouteTracks,
      overlapReleaseCondition: {
        cleared: routeInfo[OVERLAP_CLEARED_KEY],
        occupied: routeInfo[OVERLAP_OCCUPIED_KEY],
      },
      timedOverlapTracks: inOverlapTracks,
      timedOverlapDuration: 120000 // 120 seconds
    };
    
    if (newActiveRoute.timedOverlapTracks.length > 0) {
        setTimeout(() => {
            const timedUpdates = {};
            newActiveRoute.timedOverlapTracks.forEach(trackId => {
                // We need the most current state, so we use a function form of setTrackStates
                setTrackStates(currentStates => {
                    if (currentStates[trackId] === 'RESERVED') {
                        timedUpdates[trackId] = 'CLEAR';
                    }
                    return currentStates; // This doesn't update state, just reads it.
                });
            });
            setMultipleTrackStates(timedUpdates);
            console.log(`[TrackContext] Timed overlap release for ${newActiveRoute.id}:`, newActiveRoute.timedOverlapTracks);
        }, newActiveRoute.timedOverlapDuration);
    }

    setActiveRoutes(prev => [...prev, newActiveRoute]);

  }, [excelData, setMultipleTrackStates]);

  useEffect(() => {
    if (activeRoutes.length === 0 || !Object.keys(trackStates).length) return;

    const remainingRoutes = [];
    let wasRouteReleased = false;

    activeRoutes.forEach(route => {
      const { cleared, occupied } = route.overlapReleaseCondition;
      
      if (cleared && occupied && trackStates[cleared] === 'CLEAR' && trackStates[occupied] === 'OCCUPIED') {
        console.log(`[TrackContext] Conditional overlap release met for route ${route.id}. Releasing 'In Route' tracks.`);
        const updates = {};
        route.inRouteTracks.forEach(trackId => {
           if (trackStates[trackId] === 'RESERVED') {
             updates[trackId] = 'CLEAR';
           }
        });
        setMultipleTrackStates(updates);
        wasRouteReleased = true;
      } else {
        remainingRoutes.push(route);
      }
    });

    if (wasRouteReleased) {
      setActiveRoutes(remainingRoutes);
    }

  }, [trackStates, activeRoutes, setMultipleTrackStates]);

  const resetTracks = useCallback(() => {
    console.log("♻️ Resetting all track states to default");
    setTrackStates({});
    setActiveRoutes([]);
  }, []);

  return (
    <TrackContext.Provider value={{
      trackStates,
      processTrackLine,
      parseRouteLine, // Provide the new function
      setMultipleTrackStates,
      resetTracks
    }}>
      {children}
    </TrackContext.Provider>
  );
}
