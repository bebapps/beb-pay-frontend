import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAnonymousRequest } from '../../hooks/useAnonymousRequest';
import Store from '../../interfaces/Store';
import BrandingStylesWrapper from '../BrandingStylesWrapper';
import Loader from '../Loader';
import StoreFront from './StoreFront';
import css from './StoreContainer.module.scss';
import classNames from 'classnames';
import Logo from '../Logo';

const StoreContainer: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const [store, setStore] = useState<Store>();
  const [isLoading, setIsLoading] = useState(true);
  const request = useAnonymousRequest();

  const loadStore = async () => {
    if (storeId) {
      try {
        const { store } = await request('GET', `/api/stores/${storeId}`);
        setStore(store);
      } catch (error) {
        console.log(`No store found with id ${storeId}`);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadStore();
  }, []);

  if (isLoading) {
    return (
      <div className={classNames(css.StoreContainer, css['StoreContainer--loader'])}>
        <Loader />
      </div>
    );
  }

  if (!store) {
    return (
      <div className={classNames(css.StoreContainer, css['StoreContainer--message'])}>
        <Logo />
        No store found. Please scan the code again, or contact the expected store owner
      </div>
    );
  }

  return (
    <BrandingStylesWrapper {...store.branding}>
      <div className={css.StoreContainer}>
        <StoreFront
          storeId={storeId}
          logoUrl={store.logo as string}
          currency={store.currency!}
        />
      </div>
    </BrandingStylesWrapper>
  );
};

export default StoreContainer;
