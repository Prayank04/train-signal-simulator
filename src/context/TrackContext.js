import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { TimeContext } from './TimeContext';

export const TrackContext = createContext();
export const useTrackContext = () => useContext(TrackContext);

export const statusColors = {
  RESERVED: 'yellow',
  OCCUPIED: 'red',
  CLEAR: 'white'
};

export function TrackProvider({ children }) {
  const { routeDatabase } = useContext(TimeContext);
  const [trackStates, setTrackStates] = useState({});
  const [activeRoutes, setActiveRoutes] = useState([]);

  const setMultipleTrackStates = useCallback((updates) => {
  setTrackStates(prev => {
    const newStates = { ...prev };
    for (const [trackId, newStatus] of Object.entries(updates)) {
      const currentStatus = prev[trackId];

      if (currentStatus === 'RESERVED' && newStatus === 'CLEAR') {
        console.log(`⛔ Prevented clearing RESERVED track: ${trackId}`);
        continue;
      }

      newStates[trackId] = newStatus;
    }
    return newStates;
  });
}, []);

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
      matches.forEach(m => {
        const trackId = m[1];
        updates[trackId] = 'RESERVED';
        console.log(`🟡 Track Reserved: ${trackId} → yellow`);
      });
      setMultipleTrackStates(updates);
      return;
    }

    if (isOccupancy) {
      const m = logLine.match(/TS\s*\[(\w+)\]/);
      if (m) {
        const trackId = m[1];
        console.log(`🔴 Track Occupied: ${trackId} → red`);
        setTrackStates(prev => ({ ...prev, [trackId]: 'OCCUPIED' }));
      }
      return;
    }

    if (isClear) {
      const m = logLine.match(/TS\s*\[(\w+)\]/);
      if (m) {
        const trackId = m[1];

        const isPartOfActiveRoute = activeRoutes.some(route =>
          route.inRouteTracks.includes(trackId) || route.timedOverlapTracks.includes(trackId)
        );

        if (!isPartOfActiveRoute) {
          // Allow turning white only if it's not part of any route
          setTrackStates(prev => ({ ...prev, [trackId]: 'CLEAR' }));
        } else {
          // Block color change entirely
          console.log(`🛑 Blocked CLEAR for ${trackId} — still part of active route`);
        }
      }
    }
  }, [activeRoutes]);

  const parseRouteLine = useCallback((logLine) => {
    if (!routeDatabase || !logLine.includes('Type:Route Set')) return;

    const routeMatch = logLine.match(/\[([A-Z0-9]+)-([A-Z0-9]+)\]/);
    if (!routeMatch) return;

    const [, signalButton, routeButton] = routeMatch;
    const routeKey = `${signalButton}-${routeButton}`;
    const routeInfo = routeDatabase.get(routeKey);

    if (!routeInfo) {
      console.warn(`[TrackContext] No route found in database for key: ${routeKey}`);
      return;
    }

    console.log(`[TrackContext] Found route in database:`, routeInfo);

    const { inRouteTracks, timedOverlapTracks, overlapReleaseCondition, timedOverlapDuration } = routeInfo;
    const allTracksToReserve = [...inRouteTracks, ...timedOverlapTracks];

    const updates = {};
    allTracksToReserve.forEach(trackId => {
      updates[trackId] = 'RESERVED';
    });
    setMultipleTrackStates(updates);

    console.log(`[TrackContext] Reserving tracks for route ${routeKey}:`, allTracksToReserve);

    const newActiveRoute = {
      id: routeKey,
      inRouteTracks,
      timedOverlapTracks,
      overlapReleaseCondition,
      timedOverlapDuration: timedOverlapDuration || 120000,
    };

    // Schedule timed overlap track release (yellow → white after 120s)
    if (timedOverlapTracks.length > 0) {
      setTimeout(() => {
        setTrackStates(current => {
          const timedUpdates = {};
          timedOverlapTracks.forEach(trackId => {
            if (current[trackId] === 'RESERVED') {
              timedUpdates[trackId] = 'CLEAR';
            }
          });
          setMultipleTrackStates(timedUpdates);
          console.log(`[TrackContext] Timed overlap release for ${routeKey}:`, timedOverlapTracks);
          return current;
        });
      }, newActiveRoute.timedOverlapDuration);
    }

    setActiveRoutes(prev => [...prev, newActiveRoute]);
  }, [routeDatabase, setMultipleTrackStates]);

  // Check for conditional releases (e.g., after DAC events)
  useEffect(() => {
    if (activeRoutes.length === 0 || !Object.keys(trackStates).length) return;

    const remainingRoutes = [];
    let wasRouteReleased = false;

    activeRoutes.forEach(route => {
      const { cleared, occupied } = route.overlapReleaseCondition;

      if (cleared && occupied &&
          trackStates[cleared] === 'CLEAR' &&
          trackStates[occupied] === 'OCCUPIED') {

        console.log(`[TrackContext] Conditional release met for route ${route.id}. Releasing in-route tracks.`);
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
    console.log("♻️ Resetting all track states");
    setTrackStates({});
    setActiveRoutes([]);
  }, []);

  return (
    <TrackContext.Provider value={{
      trackStates,
      processTrackLine,
      parseRouteLine,
      setMultipleTrackStates,
      resetTracks
    }}>
      {children}
    </TrackContext.Provider>
  );
}