import Barcode from './icons/Barcode';
import css from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={css.Loader}>
      <Barcode size={128} strokeWidth="1.5" />
      <div className={css.Loader__bar} />
    </div>
  );
};

export default Loader;
