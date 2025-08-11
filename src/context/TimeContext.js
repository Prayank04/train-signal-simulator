// src/context/TimeContext.jsx
import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';

export const TimeContext = createContext();

export function TimeProvider({ children }) {
  const [initialTime, setInitialTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [allLogEntries, setAllLogEntries] = useState([]); 
  const [sentIndex, setSentIndex] = useState(0);
  const [running, setRunning] = useState(true);
  
  // This will now hold the structured Map (our "database") from excelParser.js
  const [routeDatabase, setRouteDatabase] = useState(null);

  // --- Refs for stable timing ---
  const lastRealMsRef = useRef(null);
  const sentIndexRef = useRef(sentIndex);
  const allLogEntriesRef = useRef(allLogEntries);
  useEffect(() => { sentIndexRef.current = sentIndex; }, [sentIndex]);
  useEffect(() => { allLogEntriesRef.current = allLogEntries; }, [allLogEntries]);

  // If initialTime changes (i.e. file upload), reset currentTime & sentIndex
  useEffect(() => {
    if (initialTime) {
      setCurrentTime(initialTime);
      setSentIndex(0);
    }
  }, [initialTime]);

  // Millisecond-accurate ticker using delta time
   useEffect(() => {
     if (!running || !currentTime) return;
     const TICK_MS = 16; // ~60Hz; 10–20ms is a good range
     lastRealMsRef.current = performance.now();

     const id = setInterval(() => {
       // Auto-pause once all logs are processed
       if (
         allLogEntriesRef.current.length > 0 &&
         sentIndexRef.current >= allLogEntriesRef.current.length
       ) {
         console.log("⏹️ [TimeContext] End of logs reached. Pausing timer.");
         setRunning(false);
         return;
       }

       const now = performance.now();
       const deltaMs = now - lastRealMsRef.current;
       lastRealMsRef.current = now;

       setCurrentTime(prev => {
         const next = new Date(prev.getTime() + deltaMs);
         console.log(
           '⏱ [TimeContext] Ticking to',
           next.toLocaleTimeString('en-GB', { hour12: false, fractionalSecondDigits: 3 })
         );
         return next;
       });
     }, TICK_MS);

     return () => clearInterval(id);
   }, [running, !!currentTime]); // don't depend on the Date object itself


  // actions exposed to consumers
  const start = useCallback(() => {
    if (initialTime && !currentTime) setCurrentTime(initialTime);
    setRunning(true);
  }, [initialTime, currentTime]);

  const pause = useCallback(() => setRunning(false), []);

  const stop = useCallback(() => {
    setRunning(false);
    if (initialTime) {
      setCurrentTime(initialTime);
      setSentIndex(0);
    }
  }, [initialTime]);

  useEffect(() => {
    console.log("⏱ initialTime changed to:", initialTime?.toISOString());
  }, [initialTime]);



  return (
    <TimeContext.Provider value={{
      initialTime, setInitialTime,
      currentTime, setCurrentTime,
      allLogEntries, setAllLogEntries,
      sentIndex, setSentIndex,
      running, start, pause, stop,
      routeDatabase, setRouteDatabase // Expose the new database and its setter
    }}>
      {children}
    </TimeContext.Provider>
  );
}
