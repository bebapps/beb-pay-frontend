import css from './TextField.module.scss';

interface TextFieldProps {
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  required?: boolean;
  onBlur?: () => void;
}

const TextField: React.FC<TextFieldProps> = ({ placeholder, type, value, onChange, autoFocus, required, onBlur }) => {
  const Component = type === 'textarea' ? 'textarea' : 'input';
  return (
    <Component
      required={required}
      autoFocus={autoFocus}
      type={type}
      placeholder={placeholder}
      value={value || ''}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) => onChange(e.currentTarget.value)}
      className={css.TextField}
      onBlur={onBlur}
    />
  );
};

TextField.defaultProps = {
  type: 'text',
};

export default TextField;
