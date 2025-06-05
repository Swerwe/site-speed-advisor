import React from 'react';

type Props = {
  percentage: number; // 0–100
  size: number;
};

const getColor = (percentage: number): string => {
  if (percentage >= 80) return '#2ecc71'; // зелёный
  if (percentage >= 55) return '#f39c12'; // оранжевый
  return '#e74c3c'; // красный
};

export const PerformanceScoreChart: React.FC<Props> = ({ percentage, size }) => {
  const dashArray = `${percentage}, 100`;
  const color = getColor(percentage);

  return (
    <div style={{ width: size, fontFamily: 'sans-serif' }}>
      <svg viewBox="0 0 36 36" width={size} height={size}>
        {/* Фоновый круг */}
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#ecf0f1"
          strokeWidth="2.5"
        />
        {/* Прогресс */}
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeDasharray={dashArray}
          strokeLinecap="round"
        />
        {/* Подписи */}
        <text x="18.3" y="21" fill={color} fontSize="8" textAnchor="middle" fontWeight="bold">
          {percentage}
        </text>
      </svg>
    </div>
  );
};
