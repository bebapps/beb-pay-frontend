import React from 'react';
import css from './ColorPicker.module.scss';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => (
  <label className={css.ColorPicker}>
    <input
      className={css.ColorPicker__input}
      type="color"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <div
      className={css.ColorPicker__color}
      style={{ backgroundColor: value }}
    />
  </label >
);

export default ColorPicker;
