import React, { useContext, useEffect, useRef } from 'react';
import { TimeContext } from '../../context/TimeContext';
import { useSignalContext } from '../../context/SignalContext';
import { useTrackContext } from '../../context/TrackContext'; // Changed from useRouteContext

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

  // Get all necessary functions from useTrackContext now
  const { processTrackLine, parseRouteLine, resetTracks } = useTrackContext();
  const { processLogLine, resetSignals } = useSignalContext();
  
  const didReset = useRef(false);

  // Reset logic once
  useEffect(() => {
    if (initialTime && !didReset.current) {
      console.log("🔄 Initial Time detected. Resetting once.");
      stop();
      resetSignals();
      resetTracks();
      didReset.current = true;
    }
  }, [initialTime, stop, resetSignals, resetTracks]);

  // Clear reset flag when new file uploaded
  useEffect(() => {
    didReset.current = false;
  }, [initialTime]);

  // Log processor
  useEffect(() => {
    if (!running || !currentTime) return;

     console.log(
    `🔍 [ClockControl] checking logs: currentTime=${currentTime.toLocaleTimeString('en-GB')}, sentIndex=${sentIndex}, totalEntries=${allLogEntries.length}`
    );

    let idx = sentIndex;
    while (idx < allLogEntries.length && allLogEntries[idx].time <= currentTime) {
      console.log(`✅ [ClockControl] Processing entry ${idx}:`, allLogEntries[idx].raw);
      parseRouteLine(allLogEntries[idx].raw); // This now comes from TrackContext
      processLogLine(allLogEntries[idx].raw);
      processTrackLine(allLogEntries[idx].raw);
      idx++;
    }

    if (idx !== sentIndex) {
      console.log(`➡️ [ClockControl] advancing sentIndex to ${idx}`);
      setSentIndex(idx);
    }
  }, [currentTime, running, allLogEntries, sentIndex, processLogLine, processTrackLine, parseRouteLine, setSentIndex]);

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => {
          if (!initialTime) {
            alert('Upload a file first');
            return;
          }
          console.log('▶️ [ClockControl] START clicked');
          start();
        }}
        disabled={!initialTime || running}
        className="px-4 py-2 bg-green-500 rounded"
      >
        START
      </button>
      <button
        onClick={pause}
        disabled={!running}
        className="px-4 py-2 bg-yellow-500 rounded"
      >
        PAUSE
      </button>
      <button
        onClick={() => {
          stop();                  // Stops the ticking
          resetSignals();          // Clears signal colors
          resetTracks();           // Clears track colors
          console.log("🛑 STOP clicked – resetting to initial state like file just uploaded");
        }}
        disabled={!initialTime}
        className="px-4 py-2 bg-red-500 rounded"
        >
        STOP
      </button>

    </div>
  );
}
