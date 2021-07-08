import React from 'react';
import NameValuePair from '../../interfaces/NameValuePair';
import css from './Dropdown.module.scss';

interface DropdownProps {
  value: string;
  options: NameValuePair[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ value, options, onSelect }) => {
  return (
    <select
      className={css.Dropdown}
      value={value}
      defaultValue=""
      onChange={(e) => onSelect(e.target.value)}
    >
      <option
        value=""
        disabled
        hidden
      >
        Please select...
         </option>
      {options.map(({ name, value }) => (
        <option
          key={value}
          value={value}
        >
          {name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
