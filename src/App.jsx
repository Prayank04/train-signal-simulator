import React from 'react';
import { TimeProvider } from './context/TimeContext'; 
import { TrackProvider } from './context/TrackContext'; 
import { SignalProvider } from './context/SignalContext';
import StatusBar from './components/StatusBar/StatusBar';
import LeftControlPanel from './components/ControlPanels/LeftControlPanel';
import RightControlPanel from './components/ControlPanels/RightControlPanel';
import CommonControlPanel from './components/ControlPanels/CommonControlPanel';
import MainTrackLayout from './components/TrackLayout/MainTrackLayout/MainTrackLayout';
import BottomTrackLayout from './components/TrackLayout/BottomTrackLayout';
import RightBottomTrackLayout from './components/TrackLayout/RightBottomTrackLayout';
import './App.css';
import './styles/globals.css';
import { RouteProvider } from './context/RouteContext';
import { PointProvider } from './context/PointContext';

function App() {
  return (
    <TimeProvider>
      <SignalProvider>
        <RouteProvider>
          <TrackProvider>
            <PointProvider>
              <div className="flex flex-col h-screen railway-hmi">
                <StatusBar />
                <div className="flex flex-1 main-container">
                  <aside className="w-1/4 bg-gray-100">
                    <LeftControlPanel />
                  </aside>
                  <main className="flex-1 bg-white">
                    {/* Navigation Header */}
                    <div className="navigation-header">
                      <div className="nav-arrows">← UP/DOWN →</div>
                      <div className="nav-stations">
                        ← JNPT &nbsp;&nbsp;&nbsp; NEW CHANDAWAL &nbsp;&nbsp;&nbsp; DADRI →
                      </div>
                    </div>
                    {/* Track Layouts */}
                    <div className="track-container">
                      <MainTrackLayout />
                      <BottomTrackLayout />
                      <CommonControlPanel/>
                    </div>
                  </main>
                  <aside className="w-1/4 bg-gray-100">
                    <RightControlPanel />
                  </aside>
                </div>
              </div>
            </PointProvider>
          </TrackProvider>
        </RouteProvider>
      </SignalProvider>
    </TimeProvider>
  );
}

export default App;