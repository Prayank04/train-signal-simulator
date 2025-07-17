import React from 'react';

export default function DigitalClock({ time }) {
  if (!time) return <span className="text-sm font-mono">--:--:--</span>;

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <span className="text-sm font-mono">
      {formatDate(time)} {formatTime(time)}
    </span>
  );
}