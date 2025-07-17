import React, { createContext, useContext, useState, useCallback } from 'react';

const SignalContext = createContext();

export function SignalProvider({ children }) {
  const [signalStates, setSignalStates] = useState({});

  const processLogLine = useCallback((line) => {
  // 1) normalize
    const cleanLine = line
      .replace(/\r?\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    console.log('📥 [Signal] raw:  ', line);
    console.log('    [Signal] clean:', cleanLine);

    // 2) match ECR changes
    const m = cleanLine.match(
      /Equ\s*\.?\s*:\s*([A-Za-z0-9_]+?)\s*(RECR|HECR|HHECR|DECR)\s*Change\s*:\s*0-+>1/i
    );
    if (!m) return;

    const [, tag, suffix] = m;
    let color;

    switch (suffix.toUpperCase()) {
      case 'RECR':
        color = 'R';
        console.log(`🔴 [Signal] ${tag} → R`);
        break;
      case 'HECR':
        color = 'Y';
        console.log(`🟡 [Signal] ${tag} → Y`);
        break;
      case 'HHECR':
        color = 'YY';
        console.log(`🟡🟡 [Signal] ${tag} → YY`);
        break;
      case 'DECR':
        color = 'G';
        console.log(`🟢 [Signal] ${tag} → G`);
        break;
    }

    setSignalStates(prev => ({ ...prev, [tag]: color }));
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
