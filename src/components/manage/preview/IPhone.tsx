import css from './IPhone.module.scss';

const IPhone: React.FC = ({ children }) => (
  <div className={css.IPhone}>
    <div className={css.IPhone__header}>
      bebapps.com
    </div>
    <div className={css.IPhone__screen}>
      {children}
    </div>
  </div>
);

export default IPhone;
