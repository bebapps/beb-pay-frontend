import Button from '../inputs/Button';
import css from './Header.module.scss';

interface HeaderProps {
  logoUrl: string;
}

const Header: React.FC<HeaderProps> = ({ logoUrl }) => {
  return (
    <div className={css.Header}>
      <img
        className={css.Header__logo}
        src={logoUrl}
      />
      <Button
        className={css.Header__checkout}
        onClick={() => alert('checkout')}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Header;
