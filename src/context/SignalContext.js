import React, { createContext, useContext, useState, useCallback } from 'react';

const SignalContext = createContext();

export function SignalProvider({ children }) {
  const [signalStates, setSignalStates] = useState({});

  const processLogLine = useCallback((line) => {
    // 1) Normalize the line by removing extra spaces and line breaks.
    const cleanLine = line.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();

    // 2) Create a robust regex to capture the signal name and its aspect.
    // This looks for "Equ.:" followed by the signal name, then one of the ECR statuses,
    // and ensures the change is from 0 to 1. It handles extra spaces gracefully.
    const match = cleanLine.match(
      /Equ\.:\s*([\w\d_]+?)\s*(RECR|HECR|HHECR|DECR)\s*Change:\s*0\s*[-]*>*\s*1/i
    );

    if (!match) {
      return; // Not a signal change we are interested in.
    }

    const [, signalName, aspect] = match;
    const normalizedAspect = aspect.toUpperCase().replace(/\s+/g, ''); // Remove spaces from aspect
    let color;

    console.log(`[SignalContext] Matched Signal: ${signalName}, Aspect: ${normalizedAspect}`);

    switch (normalizedAspect) {
      case 'RECR':
        color = 'R';
        console.log(`🔴 [Signal] ${signalName} → R`);
        break;
      case 'HECR':
        color = 'Y';
        console.log(`🟡 [Signal] ${signalName} → Y`);
        break;
      case 'HHECR':
        color = 'YY';
        console.log(`🟡🟡 [Signal] ${signalName} → YY`);
        break;
      case 'DECR':
        color = 'G';
        console.log(`🟢 [Signal] ${signalName} → G`);
        break;
      default:
        return; // Unknown aspect
    }

    setSignalStates(prev => ({ ...prev, [signalName]: color }));
  }, []);


  const resetSignals = useCallback(() => {
    console.log("♻️ [Signal] Resetting all signals to default");
    setSignalStates({});
  }, []);

  return (
    <SignalContext.Provider value={{
      signalStates,
      processLogLine,
      resetSignals
    }}>
      {children}
    </SignalContext.Provider>
  );
}

export const useSignalContext = () => {
  const ctx = useContext(SignalContext);
  if (!ctx) {
    throw new Error("useSignalContext must be used within a SignalProvider");
  }
  return ctx;
};
