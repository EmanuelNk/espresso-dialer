import React, { useRef } from 'react';

interface FlavorBarProps {
  value: number; // 1-10
  max?: number;
  color?: string;
  label?: string;
  onChange?: (value: number) => void;
}

const LABEL_WIDTH = 90;
const VALUE_WIDTH = 32;

const FlavorBar: React.FC<FlavorBarProps> = ({ value, max = 10, color = 'var(--gold)', label, onChange }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Helper to get value from mouse/touch position
  const getValueFromPosition = (clientX: number) => {
    if (!barRef.current) return value;
    const rect = barRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const segmentWidth = rect.width / max;
    let idx = Math.floor(x / segmentWidth) + 1;
    if (idx < 1) idx = 1;
    if (idx > max) idx = max;
    return idx;
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!onChange) return;
    isDragging.current = true;
    onChange(getValueFromPosition(e.clientX));
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!onChange || !isDragging.current) return;
    onChange(getValueFromPosition(e.clientX));
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!onChange) return;
    isDragging.current = true;
    onChange(getValueFromPosition(e.touches[0].clientX));
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (!onChange || !isDragging.current) return;
    onChange(getValueFromPosition(e.touches[0].clientX));
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', minHeight: 40 }}>
      {label && (
        <span style={{ display: 'inline-block', minWidth: LABEL_WIDTH, fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.1rem', textAlign: 'right' }}>{label}</span>
      )}
      <div
        ref={barRef}
        style={{ display: 'flex', gap: 6, cursor: onChange ? 'pointer' : 'default', userSelect: 'none' }}
        onMouseDown={onChange ? handleMouseDown : undefined}
        onTouchStart={onChange ? handleTouchStart : undefined}
        role={onChange ? 'slider' : undefined}
        aria-valuenow={value}
        aria-valuemin={1}
        aria-valuemax={max}
        tabIndex={onChange ? 0 : -1}
      >
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 16,
              height: 36,
              borderRadius: 12,
              background: i < value ? color : 'var(--primary)',
              opacity: i < value ? 1 : 0.25,
              transition: 'background 0.2s',
              cursor: onChange ? 'pointer' : 'default',
              border: onChange && i + 1 === value ? `2px solid var(--gold)` : 'none',
              boxSizing: 'border-box',
            }}
            onClick={() => onChange && onChange(i + 1)}
            tabIndex={-1}
            aria-label={label ? `${label} ${i + 1}` : `${i + 1}`}
            role={onChange ? 'button' : undefined}
            onKeyDown={e => {
              if (onChange && (e.key === 'Enter' || e.key === ' ')) onChange(i + 1);
            }}
          />
        ))}
      </div>
      <span style={{ display: 'inline-block', minWidth: VALUE_WIDTH, color: 'var(--text-secondary)', fontWeight: 500, fontSize: '1.1rem', textAlign: 'left', marginLeft: 8 }}>{value}</span>
    </div>
  );
};

export default FlavorBar; 