import React from 'react';

const VerticalSections = ({
  sections,
  lineY,
  color = 'white',
  strokeWidth = 2,
  lineKeyPrefix = ''
}) => (
  <>
    {sections.map((section, index) => (
      <line
        key={`${lineKeyPrefix}-section-${index}`}
        x1={section.x}
        y1={lineY - 5}
        x2={section.x}
        y2={lineY + 5}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    ))}
  </>
);

export default VerticalSections;