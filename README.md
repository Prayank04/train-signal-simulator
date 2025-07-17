# Railway Control HMI System

A comprehensive Railway Control Human-Machine Interface (HMI) system built with React, designed to replicate professional railway signaling and control interfaces.

## Features

- **Real-time Track Visualization**: Interactive SVG-based track layouts with signals, switches, and block sections
- **Control Panels**: Left and right control panels with system status indicators, emergency controls, and point management
- **Signal Management**: Multi-aspect signals with realistic colors (Red, Yellow, Green) and animations
- **Switch Control**: Interactive track switches with normal/reverse positioning
- **System Monitoring**: Real-time system status indicators and alerts
- **Time Display**: Live clock with proper railway time format
- **Responsive Design**: Optimized for full-screen railway control room displays

## Technology Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.0 with custom railway-specific styles
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Language**: JavaScript (ES6+)

## Project Structure

```
railway-control-hmi/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header/                 # Top navigation menu
│   │   ├── ControlPanels/          # Left and right control panels
│   │   ├── TrackLayout/            # Main and bottom track layouts
│   │   ├── StatusBar/              # Bottom status bar with time
│   │   └── UI/                     # Reusable UI components
│   ├── hooks/                      # Custom React hooks
│   ├── utils/                      # Constants and utilities
│   ├── styles/                     # Global styles and variables
│   ├── App.jsx                     # Main application component
│   └── index.js                    # Application entry point
├── package.json
├── tailwind.config.js
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone/Create the project:**
   ```bash
   npx create-react-app railway-control-hmi
   cd railway-control-hmi
   ```

2. **Install dependencies:**
   ```bash
   npm install lucide-react
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Create the folder structure:**
   ```bash
   mkdir -p src/components/Header
   mkdir -p src/components/ControlPanels
   mkdir -p src/components/TrackLayout
   mkdir -p src/components/StatusBar
   mkdir -p src/components/UI
   mkdir -p src/hooks
   mkdir -p src/utils
   mkdir -p src/styles
   ```

4. **Copy all the provided files** into their respective directories as shown in the project structure above.

5. **Start the development server:**
   ```bash
   npm start
   ```

6. **Open your browser** and navigate to `http://localhost:3000`

## Component Overview

### Header Component
- System navigation menu with active state indicators
- Menu items: System Monitor, Journal, Yard, Logout, Change Password, Time Setting, Version

### Track Layout Components
- **MainTrackLayout**: Primary track diagram with signals, switches, and sidings
- **BottomTrackLayout**: Secondary track section with signal groups and axle counters
- **SignalLight**: Individual signal light component with color and animation support
- **TrackSwitch**: Interactive track switch component with position control

### Control Panel Components
- **RightControlPanel**: System status, reset controls, emergency controls, and line controls
- **LeftControlPanel**: Point indicators, find controls, and siding management

### UI Components
- **ControlButton**: Reusable button component with multiple color schemes and states
- **StatusBar**: Bottom status bar with system alerts, screen print, and live time display

## Configuration

### Tailwind Configuration
The `tailwind.config.js` file includes custom colors and animations specific to railway systems:
- Railway-specific color palette
- Custom animations for signal lights and system indicators
- Monospace font configuration for authentic railway display appearance

### Constants
The `src/utils/constants.js` file contains all system constants including:
- Signal colors and aspects
- Track section definitions
- Control states
- Emergency types
- Animation durations

## Customization

### Adding New Signals
1. Update the signal state in the respective track layout component
2. Add signal light components with appropriate positioning
3. Configure signal aspects and colors as needed

### Adding New Control Buttons
1. Use the `ControlButton` component with appropriate props
2. Define button states in the parent component
3. Implement click handlers for functionality

### Modifying Track Layout
1. Edit the SVG elements in `MainTrackLayout.jsx` or `BottomTrackLayout.jsx`
2. Update track coordinates and labels as needed
3. Adjust signal and switch positioning accordingly

## Development

### Running the Application
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App (irreversible)
```

### Code Style
- Use functional components with React Hooks
- Follow naming conventions: PascalCase for components, camelCase for variables
- Maintain consistent indentation and formatting
- Use descriptive variable and function names

## Production Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your web server or hosting platform

3. **Configure web server** for proper routing if using React Router in the future

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Considerations

- SVG elements are optimized for smooth rendering
- Animations use CSS transforms for better performance
- Component state is managed efficiently to prevent unnecessary re-renders
- Real-time updates are throttled to maintain smooth operation

## Future Enhancements

- WebSocket integration for real-time data
- Historical data logging and playback
- Audio alerts and announcements
- Multi-screen support for large control rooms
- Integration with actual railway signaling systems
- User authentication and role-based access control

## Support

For technical support or questions about this railway HMI system, please refer to the component documentation within each file or create an issue in the project repository.

## License

This project is intende






## Usage
- Upload an XPS (or text) file containing a line like:
  From 26-May-2025 15:21:00 To ...
- The clock will initialize to that timestamp.
- Use START to begin ticking from that time, PAUSE to freeze, STOP to reset to initial.
- Further train signalling logic can hook into the ticking



## Usage
- In header, click "Upload File" and select an .xps/.txt file containing a line like:
  From 26-May-2025 15:21:00 To 26-May-2025 16:13:59
- The start time is parsed and set in the clock.
- Use START/PAUSE/STOP in status bar to control clock ticking from that time.
- Later logic can read currentTime from context or pass callbacks.