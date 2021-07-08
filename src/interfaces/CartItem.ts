import Product from './Product';

interface CartItem {
  product: Product;
  lastUpdated: number;
  quantity: number;
}

export default CartItem;
