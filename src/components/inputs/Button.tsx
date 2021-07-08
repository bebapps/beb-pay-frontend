import classNames from 'classnames';
import css from './Button.module.scss';

type ButtonProps = Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'disabled' | 'className'> & {
  fullWidth?: boolean;
  variant?: 'none' | 'primary' | 'dark';
}

const Button: React.FC<ButtonProps> = ({ children, fullWidth, onClick, type, disabled, variant, className }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={classNames([
        css.Button,
        css[`Button--${variant}`],
        {
          [css['Button--fullWidth']]: fullWidth,
        },
        className,
      ])}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
};

export default Button;
