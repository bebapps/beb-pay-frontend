import Barcode from './Barcode';

interface Product {
  id: string;
  barcode: Barcode;
  description: string;
  name: string;
  price: number;
  images: string[]
}

export default Product;
