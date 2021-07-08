import classNames from 'classnames';
import css from './InputWrapper.module.scss';

interface InputWrapperProps {
  label: string;
  isTextField?: boolean;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ children, label, isTextField }) => {
  return (
    <label className={classNames(css.InputWrapper, {
      [css['InputWrapper--text']]: isTextField,
    })}>
      <div className={css.InputWrapper__label}>
        {label}
      </div>
      {children}
    </label>
  );
};

export default InputWrapper;
