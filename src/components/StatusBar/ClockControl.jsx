import React, { useContext, useEffect, useRef } from 'react';
import { TimeContext } from '../../context/TimeContext';
import { useSignalContext } from '../../context/SignalContext';
import { useTrackContext } from '../../context/TrackContext';
import { usePointContext } from '../../context/PointContext';

export default function ClockControl() {
  const {
    initialTime,
    currentTime,
    allLogEntries,
    sentIndex,
    setSentIndex,
    start,
    pause,
    stop,
    running
  } = useContext(TimeContext);

  // Get all necessary processing and reset functions from their respective contexts.
  const { processTrackLine, parseRouteLine, resetTracks } = useTrackContext();
  const { processLogLine, resetSignals } = useSignalContext();
  const { processPointLine, resetPoints } = usePointContext(); // Get functions from PointContext
  
  const didReset = useRef(false);

  // This effect performs a one-time reset when a new file is loaded (indicated by a change in initialTime).
  useEffect(() => {
    if (initialTime && !didReset.current) {
      console.log("🔄 Initial Time detected. Resetting all states once.");
      stop();
      resetSignals();
      resetTracks();
      resetPoints(); // Also reset points
      didReset.current = true;
    }
  }, [initialTime, stop, resetSignals, resetTracks, resetPoints]);

  // This effect clears the reset flag when a new file is uploaded, allowing the reset logic to run again.
  useEffect(() => {
    didReset.current = false;
  }, [initialTime]);

  // This effect is the core log processor for the simulation.
  useEffect(() => {
  if (!running || !currentTime) return;

  const timeStr = `${currentTime.toLocaleTimeString('en-GB', { hour12: false, fractionalSecondDigits: 3 })}`;
  console.log(`🔍 [ClockControl] checking logs: currentTime=${timeStr}, sentIndex=${sentIndex}, totalEntries=${allLogEntries.length}`);

  // ✅ Handle jumping backwards
  if (sentIndex > 0 && allLogEntries[sentIndex - 1]?.time > currentTime) {
    console.log('⏪ Jumped backwards — resetting sentIndex and reprocessing logs');
    setSentIndex(0);
  }

  let idx = sentIndex;
  while (idx < allLogEntries.length && allLogEntries[idx].time <= currentTime) {
    const logEntry = allLogEntries[idx];
    console.log(`✅ [ClockControl] Processing entry ${idx}:`, logEntry.raw);

    parseRouteLine(logEntry.raw);
    processLogLine(logEntry.raw);
    processTrackLine(logEntry.raw);
    processPointLine(logEntry.raw);

    idx++;
  }

  if (idx !== sentIndex) {
    console.log(`➡️ [ClockControl] advancing sentIndex to ${idx}`);
    setSentIndex(idx);
  }
}, [
  currentTime,
  running,
  allLogEntries,
  sentIndex,
  setSentIndex,
  processLogLine,
  processTrackLine,
  parseRouteLine,
  processPointLine
]);

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => {
          if (!initialTime) {
            alert('Please upload a log file first.');
            return;
          }
          console.log('▶️ [ClockControl] START clicked');
          start();
        }}
        disabled={!initialTime || running}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md disabled:bg-gray-500"
      >
        START
      </button>
      <button
        onClick={pause}
        disabled={!running}
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md disabled:bg-gray-500"
      >
        PAUSE
      </button>
      <button
        onClick={() => {
          console.log("🛑 STOP clicked – resetting all states.");
          stop();
          resetSignals();
          resetTracks();
          resetPoints(); // Ensure points are reset on STOP
        }}
        disabled={!initialTime}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
      >
        RESET
      </button>
    </div>
  );
}
