import { useEffect, useState } from 'react';
import CartItem from '../interfaces/CartItem';
import Product from '../interfaces/Product';
import { useAnonymousRequest } from './useAnonymousRequest';

function fromStorage (storeId: string): CartItem[] {
  const storeCart = window.localStorage.getItem(`bebapps.beb-pay.store.${storeId}.cart`);
  if (storeCart) {
    return JSON.parse(storeCart);
  }
  return [];
}

function toStorage (storeId: string, cart: CartItem[]) {
  window.localStorage.setItem(`bebapps.beb-pay.store.${storeId}.cart`, JSON.stringify(cart));
}

export function useCart (storeId: string) {
  const request = useAnonymousRequest();
  const [cart, setCart] = useState<CartItem[]>(() => fromStorage(storeId));

  useEffect(() => {
    toStorage(storeId, cart);
  }, [storeId, cart]);

  const addProduct = (product: Product) => {
    setCart((previousCart) => {
      const productCartIndex = previousCart.findIndex(previousCartItem => previousCartItem.product.id === product.id);
      if (productCartIndex > -1) {
        if (previousCart[productCartIndex].lastUpdated > Date.now() - 1000) {
          return previousCart;
        } else {
          const updatedCart = [...previousCart];
          updatedCart[productCartIndex].quantity += 1;
          updatedCart[productCartIndex].lastUpdated = Date.now();
          return updatedCart;
        }
      } else {
        return [
          ...previousCart,
          {
            product,
            lastUpdated: Date.now(),
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeProduct = (productId: Product['id']) => {
    setCart((previousCart) => {
      const newCart = [...previousCart];
      const productCartIndex = newCart.findIndex(previousCartItem => previousCartItem.product.id === productId);
      newCart.splice(productCartIndex, 1);
      return newCart;
    });
  };

  const setProductQuantity = (productId: Product['id'], quantity: number) => {
    setCart((previousCart) => {
      const productCartIndex = previousCart.findIndex(previousCartItem => previousCartItem.product.id === productId);
      if (productCartIndex === -1) {
        return previousCart;
      }
      const newCart = [...previousCart];
      newCart[productCartIndex] = {
        ...previousCart[productCartIndex],
        quantity: Math.max(0, quantity),
      };
      return newCart;
    });
  };

  const checkout = async () => {
    const response = await request('POST', `/api/stores/${storeId}/checkout`, {
      items: cart.map(item => ({ productId: item.product.id, quantity: item.quantity })),
    });
    if (response.cart.checkoutUrl) {
      window.location.href = response.cart.checkoutUrl;
    }
  };

  const clear = () => {
    setCart([]);
  };

  return {
    cart,
    clear,
    addProduct,
    removeProduct,
    setProductQuantity,
    checkout,
  };
}
