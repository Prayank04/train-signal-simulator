// src/context/TimeContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const TimeContext = createContext();

export function TimeProvider({ children }) {
  const [initialTime, setInitialTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [allLogEntries, setAllLogEntries] = useState([]); 
  const [sentIndex, setSentIndex] = useState(0);

  // new: running state
  const [running, setRunning] = useState(true);

  // If initialTime changes (i.e. file upload), reset currentTime & sentIndex
  useEffect(() => {
    if (initialTime) {
      setCurrentTime(initialTime);
      setSentIndex(0);
      
    }
  }, [initialTime]);

  // ticker: advance clock & emit logs
  useEffect(() => {
  if (!running || !currentTime) return;

  const id = setInterval(() => {
    setCurrentTime(prev => {
      const next = new Date(prev.getTime() + 1000);
      console.log('⏱ [TimeContext] Ticking to', next.toLocaleTimeString('en-GB'));
      return next;
    });

    setSentIndex(idx => {
      const nextIndex = idx;

      // Check if we've reached the last log entry
      if (
        nextIndex >= allLogEntries.length - 1
      ) {
        // Stop ticking and set final time
        if (allLogEntries.length > 0) {
          setCurrentTime(new Date(allLogEntries[allLogEntries.length - 1].time));
        }
        setRunning(false);  // Pause timer automatically
        return idx;
      }

      // Otherwise, keep advancing if time matches
      if (
        nextIndex < allLogEntries.length &&
        allLogEntries[nextIndex].time <= new Date(currentTime.getTime() + 1000)
      ) {
        return nextIndex + 1;
      }

      return nextIndex;
    });
  }, 1000);

  return () => clearInterval(id);
}, [running, currentTime, allLogEntries]);


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
      running, start, pause, stop
    }}>
      {children}
    </TimeContext.Provider>
  );
}
