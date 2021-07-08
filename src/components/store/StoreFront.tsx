import { useEffect, useRef } from 'react';
import { useAnonymousRequest } from '../../hooks/useAnonymousRequest';
import Product from '../../interfaces/Product';
import CurvedArrow from '../icons/CurvedArrow';
import { useQuagga } from '../../hooks/useQuagga';
import CartItemDisplay from './CartItemDisplay';
import Header from './Header';
import ScanButton from './ScanButton';
import Scanner from './Scanner';
import css from './StoreFront.module.scss';
import { useCart } from '../../hooks/useCart';
import Barcode from '../../interfaces/Barcode';
import { Redirect, useRouteMatch } from 'react-router';

interface StoreFrontProps {
  logoUrl: string;
  storeId: string;
  currency: string;
}

const StoreFront: React.FC<StoreFrontProps> = ({ logoUrl, storeId, currency }) => {
  const request = useAnonymousRequest();
  const { cart, addProduct, checkout, removeProduct, setProductQuantity, clear } = useCart(storeId);
  const match = useRouteMatch('/:storeId/checkout/completed');

  const checkedCodesRef = useRef<{ [codeAndFormat: string]: Product | null }>({});

  const handleBarcodeDetected = async (barcode: Barcode) => {
    const { code, format } = barcode;
    let product: Product | null;
    const codeAndFormat = `${code}-${format}`;
    if (codeAndFormat in checkedCodesRef.current) {
      product = checkedCodesRef.current[codeAndFormat];
    } else {
      checkedCodesRef.current[codeAndFormat] = null;

      const searchParams = new URLSearchParams({
        'barcode.format': format,
        'barcode.code': code,
      });
      const { products }: { products: Product[] } = await request('GET', `/api/stores/${storeId}/search?${searchParams.toString()}`);

      product = products[0] || null;
      checkedCodesRef.current[codeAndFormat] = product;
    }

    if (product) {
      addProduct(product);
      stopScanning();
    }
  };

  const { scannerTargetRef, startScanning, stopScanning, isScanning } = useQuagga(handleBarcodeDetected);

  const formatter = Intl.NumberFormat('en-us', { currency, style: 'currency' }); // TODO: use correct locale

  useEffect(() => {
    if (match?.isExact) {
      clear();
    }
  }, []);

  if (match?.isExact) {
    return (
      <Redirect to={`/${storeId}`} />
    );
  }

  return (
    <div className={css.StoreFront}>
      <Header
        logoUrl={logoUrl}
        onCheckout={checkout}
      />
      {cart.length
        ? (
          <>
            <ul className={css.StoreFront__cartItems}>
              {cart.map(cartItem => {
                const productId = cartItem.product.id;
                return (
                  <li
                    className={css.StoreFront__cartItems__cartItem}
                    key={productId}
                  >
                    <CartItemDisplay
                      onRemoveProduct={() => removeProduct(productId)}
                      onSetProductQuantity={(quantity: number) => setProductQuantity(productId, quantity)}
                      {...cartItem}
                    />
                  </li>
                );
              })}
            </ul>
            <div className={css.StoreFront__cartTotal}>
              Total: {formatter.format(cart.reduce((sum, cartItem) => sum + (cartItem.quantity * cartItem.product.price), 0))}
            </div>
          </>
          // eslint-disable-next-line indent
        )
        : (
          <div className={css.StoreFront__noItems}>
            Click the Barcode icon to scan your first item
            <div className={css.StoreFront__noItems__arrow}>
              <CurvedArrow strokeWidth="calc(var(--icon-stroke-width) / 2)"
                size={178} />
            </div>
          </div>
          // eslint-disable-next-line indent
        )
      }
      <ScanButton onClick={startScanning} />
      <Scanner
        isScanning={isScanning}
        onStopScanning={stopScanning}
        scannerTargetRef={scannerTargetRef}
      />
    </div>
  );
};

export default StoreFront;
