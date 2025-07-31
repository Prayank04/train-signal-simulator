import React, { createContext, useContext, useState, useCallback } from 'react';

export const PointContext = createContext();
export const usePointContext = () => useContext(PointContext);

export function PointProvider({ children }) {
  const [pointStates, setPointStates] = useState({});

  const processPointLine = useCallback((logLine) => {
    // There are multiple ways a point's state is logged. We need to check for both.

    // Regex 1: For direct "Point Control" commands.
    // Example: "Point Control SW1[203A/B] Reverse(R)..."
    const pointControlRegex = /Point Control SW1\[(\d+)[A-Z/]*\]\s*(Normal|Reverse)\((N|R)\)/i;
    let match = logLine.match(pointControlRegex);

    if (match) {
      const [, pointName, statusFullName] = match;
      // Capitalize the first letter of the status (e.g., "Reverse")
      const status = statusFullName.charAt(0).toUpperCase() + statusFullName.slice(1);
      
      console.log(`✅ [PointContext] Match on "Point Control"! Point ${pointName} status set to ${status}`);

      setPointStates(prev => ({ ...prev, [pointName]: status }));
      return; // Exit after successful match
    }

    // Regex 2: For point lock status indications.
    // Example: "Equ.:203RWKR_IN Change:0-->1"
    const pointLockRegex = /Equ\.:\s*(\d+)(N|R)WKR_IN.*Change:0-->1/i;
    match = logLine.match(pointLockRegex);
    
    if (match) {
      const [, pointName, pointType] = match;
      const status = pointType.toUpperCase() === 'N' ? 'Normal' : 'Reverse';

      console.log(`✅ [PointContext] Match on "Lock Status"! Point ${pointName} status set to ${status}`);

      setPointStates(prev => ({ ...prev, [pointName]: status }));
      return; // Exit after successful match
    }
  }, []);

  const resetPoints = useCallback(() => {
    console.log("♻️ [PointContext] Resetting all point states to default");
    setPointStates({});
  }, []);

  return (
    <PointContext.Provider value={{
      pointStates,
      processPointLine,
      resetPoints
    }}>
      {children}
    </PointContext.Provider>
  );
}
