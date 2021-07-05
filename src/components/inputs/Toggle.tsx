import React from 'react';
import css from './Toggle.module.scss';

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange }) => (
  <label className={css.Toggle}>
    <input
      className={css.Toggle__input}
      type="checkbox"
      checked={value}
      onChange={() => onChange(!value)}
    />
    <span className={css.Toggle__slider} />
  </label>
);

export default Toggle;
