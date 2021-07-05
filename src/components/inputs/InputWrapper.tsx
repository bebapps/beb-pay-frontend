import { Children } from 'react';
import classNames from 'classnames';
import css from './InputWrapper.module.scss';

interface InputWrapperProps {
  label: string;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ children, label }) => {
  const childComponentName = (Children.only(children) as any).type.name;

  return (
    <label className={classNames(css.InputWrapper, css[`InputWrapper--${childComponentName}`])}>
      <div className={css.InputWrapper__label}>
        {label}
      </div>
      {children}
    </label>
  );
};

export default InputWrapper;
