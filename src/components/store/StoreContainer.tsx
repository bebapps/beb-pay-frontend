import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useAnonymousRequest } from '../../hooks/useAnonymousRequest';
import { useRequest } from '../../hooks/useRequest';
import Store from '../../interfaces/Store';
import BrandingStylesWrapper from '../BrandingStylesWrapper';
import StoreFront from './StoreFront';

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
    return null;
  }

  if (!store) {
    return (
      <div>
        No store found. Please scan the code again, or contact the expected store owner
      </div>
    );
  }

  return (
    <BrandingStylesWrapper {...store.branding}>
      <StoreFront
        logoUrl={store.logo as string}
      />
    </BrandingStylesWrapper>
  );
};

export default StoreContainer;
