import React from 'react';

const VerticalSections = ({
  sections = [],       // original format: [{ x }]
  lineY = 0,           // original y-position
  xCoords = [],        // optional shortcut: just [x1, x2, ...]
  positions = [],      // new format: [{ x, y }]
  color = 'white',
  strokeWidth = 2,
  lineHeight = 10,
  lineKeyPrefix = ''
}) => (
  <>
    {/* New flexible (x, y) lines */}
    {positions.map(({ x, y }, index) => (
      <line
        key={`${lineKeyPrefix}-pos-${index}`}
        x1={x}
        y1={y - lineHeight / 2}
        x2={x}
        y2={y + lineHeight / 2}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    ))}

    {/* Optional xCoords shortcut (reuses lineY) */}
    {xCoords.map((x, index) => (
      <line
        key={`${lineKeyPrefix}-x-${index}`}
        x1={x}
        y1={lineY - lineHeight / 2}
        x2={x}
        y2={lineY + lineHeight / 2}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    ))}

    {/* Original usage: sections = [{ x }] + lineY */}
    {sections.map((section, index) => (
      <line
        key={`${lineKeyPrefix}-section-${index}`}
        x1={section.x}
        y1={lineY - lineHeight / 2}
        x2={section.x}
        y2={lineY + lineHeight / 2}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    ))}
  </>
);

export default VerticalSections;