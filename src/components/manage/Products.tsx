import React, { useEffect, useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Product from '../../interfaces/Product';
import Button from '../inputs/Button';
import InputWrapper from '../inputs/InputWrapper';
import TextField from '../inputs/TextField';
import Panel from '../Panel';
import css from './Products.module.scss';

interface ProductsProps {
  storeId: string;
  currency: string;
}

type CreateProduct = Pick<Product, 'barcode' | 'description' | 'price' | 'name'> & {
  imageUrls: string[]
}

const NEW_PRODUCT: CreateProduct = {
  name: '',
  description: '',
  price: 0,
  imageUrls: [''],
  barcode: {
    code: '',
    format: '',
  },
};

const Products: React.FC<ProductsProps> = ({ storeId, currency }) => {
  const [newProduct, setNewProduct] = useState<CreateProduct>({ ...NEW_PRODUCT });
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const request = useRequest();

  const loadProducts = async () => {
    const result = await request('GET', `/api/stores/${storeId}/products`);
    setProducts(result.products);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = (id: string) => request('DELETE', `/api/stores/${storeId}/products/${id}`);

  const { name, price, imageUrls, barcode, description } = newProduct;

  const updateProductValue = <T extends keyof CreateProduct>(key: T, value: CreateProduct[T]) => setNewProduct({ ...newProduct, [key]: value });

  const formatter = Intl.NumberFormat('en-us', { currency, style: 'currency' }); // TODO: use correct locale

  return (
    <div className={css.Products}>
      <Panel className={css.Products__panel}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsCreatingProduct(true);
            const { product } = await request('POST', `/api/stores/${storeId}/products`, newProduct);
            setNewProduct({ ...NEW_PRODUCT });
            setProducts([...products, product]);
            setIsCreatingProduct(false);
          }}
        >

          <InputWrapper isTextField label="Name">
            <TextField
              type="text"
              value={name}
              required
              onChange={value => updateProductValue('name', value)}
            />
          </InputWrapper>

          <InputWrapper isTextField label="Description">
            <TextField
              type="textarea"
              value={description}
              required
              onChange={value => updateProductValue('description', value)}
            />
          </InputWrapper>

          <InputWrapper isTextField label="Price">
            <TextField
              type="number"
              value={price.toString()}
              required
              onChange={value => updateProductValue('price', Number(value))}
            />
          </InputWrapper>

          <InputWrapper isTextField label="Image URL">
            <TextField
              type="url"
              value={imageUrls[0]}
              required
              onChange={value => updateProductValue('imageUrls', [value])}
            />
          </InputWrapper>

          <InputWrapper isTextField label="Barcode code">
            <TextField
              type="text"
              value={barcode.code}
              required
              onChange={value => updateProductValue('barcode', { code: value, format: barcode.format })}
            />
          </InputWrapper>

          <InputWrapper isTextField label="Barcode format">
            <TextField
              type="text"
              value={barcode.format}
              required
              placeholder="e.g. ean_13"
              onChange={value => updateProductValue('barcode', { code: barcode.code, format: value })}
            />
          </InputWrapper>

          <Button
            type="submit"
            fullWidth
            disabled={isCreatingProduct}
          >
            Create
          </Button>
        </form>
      </Panel>

      <ul className={css.Products__list}>
        {products.map((product, index) => (
          <li
            key={product.id}
            className={css.Products__list__product}
          >
            <div className={css.Products__list__product__details}>

              <img
                className={css.Products__list__product__details__icon}
                src={product.images[0]}
              />
              <div className={css.Products__list__product__details__nameAndDescription}>
                <div className={css.Products__list__product__details__nameAndDescription__name}>
                  {product.name}
                </div>
                <div
                  title={product.description}
                  className={css.Products__list__product__details__nameAndDescription__description}
                >
                  {product.description}
                </div>
              </div>
              {formatter.format(product.price)}
            </div>
            <div className={css.Products__list__product__additionalInfo}>
              <div>
                <strong>barcode:</strong> {product.barcode?.code} ({product.barcode?.format})
              </div>
              <Button
                variant="none"
                className={css.Products__list__product__additionalInfo__delete}
                onClick={() => {
                  setProducts(previousProducts => {
                    const updatedProducts = [...previousProducts];
                    updatedProducts.splice(index, 1);
                    return updatedProducts;
                  });
                  deleteProduct(product.id);
                }}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
