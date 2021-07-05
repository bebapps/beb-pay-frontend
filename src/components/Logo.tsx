import React from 'react';
import Cart from './icons/Cart';
import css from './Logo.module.scss';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <div
      className={css.Logo}
      style={{ '--logo-size': `${size}px` } as any}
    >
      <div className={css.Logo__icon}>
        <Cart size={size} />
      </div>
      Beb Pay
    </div >
  );
};

Logo.defaultProps = {
  size: 24,
};

export default Logo;
