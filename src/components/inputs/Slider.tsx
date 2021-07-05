import React from 'react';
import css from './Slider.module.scss';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, onChange, step, value }) => {
  const backgroundPercentage = (value - min) / (max - min) * 100;

  return (
    <input
      className={css.Slider}
      style={{ background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${backgroundPercentage}%, #ffffff ${backgroundPercentage}%, #ffffff 100%)` }}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
};

export default Slider;
