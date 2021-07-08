import CartItem from '../../interfaces/CartItem';
import Button from '../inputs/Button';
import css from './CartItemDisplay.module.scss';

interface CartItemDisplayProps extends CartItem {
  onSetProductQuantity: (quantity: number) => void;
  onRemoveProduct: () => void;
}

const CartItemDisplay: React.FC<CartItemDisplayProps> = ({ product, quantity, onSetProductQuantity, onRemoveProduct }) => {
  const { name, images, price } = product;

  const formatter = Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }); // TODO: use correct locale

  return (
    <div className={css.CartItemDisplay}>
      <div className={css.CartItemDisplay__product}>
        <img
          className={css.CartItemDisplay__product__icon}
          src={images[0]}
        />
        <div>
          <div className={css.CartItemDisplay__product__name}>
            {name}
          </div>
          {/* <div className={css.CartItemDisplay__product__description}>
            {description}
          </div> */}
          <div className={css.CartItemDisplay__product__price}>
            {formatter.format(price)}{quantity > 1 && ' each'}
          </div>
        </div>
      </div>
      <div className={css.CartItemDisplay__actions}>
        <Button
          onClick={onRemoveProduct}
          className={css.CartItemDisplay__actions__remove}
          variant="none"
        >
          Remove
        </Button>
        <div className={css.CartItemDisplay__actions__quantity}>
          <Button
            onClick={() => {
              if (quantity >= 1) {
                onSetProductQuantity(quantity - 1);
              }
            }}
            className={css.CartItemDisplay__actions__quantity__button}
          >
            -
          </Button>
          <div className={css.CartItemDisplay__actions__quantity__number}>
            {quantity}
          </div>
          <Button
            onClick={() => onSetProductQuantity(quantity + 1)}
            className={css.CartItemDisplay__actions__quantity__button}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemDisplay;
