import css from './IPhone.module.scss';

const IPhone: React.FC = ({ children }) => (
  <div className={css.IPhone}>
    <div className={css.IPhone__header}>
      bebapps.com
    </div>
    {children}
  </div>
);

export default IPhone;
