import React, { useState, useContext } from 'react';
import { TimeContext } from '../../context/TimeContext';

export default function DigitalClock({ time }) {
  const { setCurrentTime, pause, running } = useContext(TimeContext);

  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');

  if (!time) return <span className="text-sm font-mono">--:--:--.---</span>;

  const formatFullDisplay = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleDateString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  const timeStr = date.toLocaleTimeString('en-GB', {
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
    hour: '2-digit',
    fractionalSecondDigits: 3, // ✅ includes .mmm
  });
  return `${day}/${month}/${year} ${timeStr}`;
};

  const handleClick = () => {
    if (running) pause();
    setTempValue(formatFullDisplay(time));
    setIsEditing(true);
  };

  const handleCommit = () => {
    try {
      // Expecting format: 11/Aug/2025 11:17:19.659
      const [datePart, timePart] = tempValue.split(' ');
      const [day, monStr, year] = datePart.split('/');
      const month = new Date(`${monStr} 1, 2000`).getMonth() + 1; // parse short month
      const [hh, min, secMs] = timePart.split(':');
      const [sec, ms] = secMs.split('.').map(Number);
      const newDate = new Date(year, month - 1, day, +hh, +min, sec, ms || 0);
      if (!isNaN(newDate.getTime())) {
        setCurrentTime(newDate);
      }
    } catch (err) {
      console.warn('Invalid date/time input');
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      autoFocus
      type="text"
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleCommit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleCommit();
        if (e.key === 'Escape') setIsEditing(false);
      }}
      className="text-sm font-mono text-cyan-400 px-2 py-1 rounded border border-cyan-400 bg-[#333333] text-center"
      style={{ width: 'fit-content' }}
    />
  ) : (
    <span
      className="text-sm font-mono text-cyan-400 px-2 py-1 rounded border border-cyan-400"
      style={{ cursor: 'pointer' }}
      title="Click to edit time"
      onClick={handleClick}
    >
      {formatFullDisplay(time)}
    </span>
  );
}