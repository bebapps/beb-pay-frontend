import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAnonymousRequest } from '../../hooks/useAnonymousRequest';
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
      <div style={{ minHeight: '100vh' }}>
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
