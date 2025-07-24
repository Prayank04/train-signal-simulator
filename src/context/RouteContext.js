import React, { createContext, useContext } from 'react';

// This context is now deprecated and its logic has been merged into TrackContext.
// This file can be deleted after you remove the <RouteProvider> from your App.js file.
// It is kept here temporarily to prevent the application from crashing on import.

export const RouteContext = createContext({
    parseRouteLine: () => {} // Provide a dummy function
});

export function RouteProvider({ children }) {
  return (
    <RouteContext.Provider value={{ parseRouteLine: () => {} }}>
      {children}
    </RouteContext.Provider>
  );
}

export const useRouteContext = () => useContext(RouteContext);