import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 0.1,
  onChange,
  unit = '',
}) => {
  return (
    <div className="slider-container">
      <div className="slider-label">
        <span>{label}</span>
        <span style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          color: 'var(--primary-coffee)',
          backgroundColor: 'var(--card-bg)',
          padding: '0.25rem 0.75rem',
          borderRadius: '6px',
          border: '1px solid var(--border-color)'
        }}>
          {value.toFixed(1)}{unit}
        </span>
      </div>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="slider-label">
        <span>{min.toFixed(1)}{unit}</span>
        <span>{max.toFixed(1)}{unit}</span>
      </div>
    </div>
  );
};

export default Slider; 