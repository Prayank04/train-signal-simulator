import React from 'react';

// Map color names to actual SVG fill colors
const fillMap = {
  Red: '#e53e3e',
  Yellow: '#d69e2e',
  'Double Yellow': '#d69e2e', // or a different shade
  Green: '#38a169',
  default: 'none'
};

export default function SignalLight({ x, y, aspect, colorName, radius = 4 }) {
  // aspect: 'R','Y','YY','G'; colorName: human-readable
  const fill = fillMap[colorName] || 'none';
  return (
    <circle cx={x} cy={y} r={radius} fill={fill} stroke="white" strokeWidth="1" />
  );
}