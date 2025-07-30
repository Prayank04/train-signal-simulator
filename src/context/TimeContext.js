// src/context/TimeContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const TimeContext = createContext();

export function TimeProvider({ children }) {
  const [initialTime, setInitialTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [allLogEntries, setAllLogEntries] = useState([]); 
  const [sentIndex, setSentIndex] = useState(0);
  const [running, setRunning] = useState(true);
  
  // This will now hold the structured Map (our "database") from excelParser.js
  const [routeDatabase, setRouteDatabase] = useState(null);

  // If initialTime changes (i.e. file upload), reset currentTime & sentIndex
  useEffect(() => {
    if (initialTime) {
      setCurrentTime(initialTime);
      setSentIndex(0);
    }
  }, [initialTime]);

  // ticker: This effect is now only responsible for advancing the clock.
  useEffect(() => {
    if (!running || !currentTime) return;

    const id = setInterval(() => {
      if (allLogEntries.length > 0 && sentIndex >= allLogEntries.length) {
          console.log("⏹️ [TimeContext] End of logs reached. Pausing timer.");
          setRunning(false);
          return;
      }

      setCurrentTime(prev => {
        const next = new Date(prev.getTime() + 1000);
        console.log('⏱ [TimeContext] Ticking to', next.toLocaleTimeString('en-GB'));
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running, currentTime, allLogEntries, sentIndex]);


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
