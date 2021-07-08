import Button from '../inputs/Button';
import css from './Header.module.scss';

interface HeaderProps {
  logoUrl: string;
  onCheckout: () => void;
}

const Header: React.FC<HeaderProps> = ({ logoUrl, onCheckout }) => {
  return (
    <div className={css.Header}>
      <img
        className={css.Header__logo}
        src={logoUrl}
      />
      <Button
        className={css.Header__checkout}
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Header;
