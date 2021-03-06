import { Redirect, Route, Switch } from 'react-router';
import { useAuthentication } from '../../hooks/useAuthentication';
import Experience from './Experience';
import StoreDetails from './StoreDetails';
import ManagementPath from '../../enums/ManagementPath';
import css from './Manage.module.scss';
import Sidebar from './Sidebar';
import { useRequest } from '../../hooks/useRequest';
import { useEffect, useState } from 'react';
import Launch from './Launch';
import Store from '../../interfaces/Store';
import Loader from '../Loader';
import Details from './Details';
import Products from './Products';

const Manage = () => {
  const request = useRequest();
  const { isLoggedIn } = useAuthentication();

  const [store, setStore] = useState<Store>();

  const updateStore = async <T extends keyof Store>(key: T, value?: Store[T]) => {
    const updateValue = value || store![key];

    let requestBody;
    if (updateValue instanceof Blob) {
      requestBody = new FormData();
      requestBody.append(key, updateValue);
    } else {
      requestBody = { [key]: updateValue };
    }

    return request('PUT', `/api/stores/${store!.id}`, requestBody);
  };

  const updateLocalStore = <T extends keyof Store>(key: T, value: Store[T]) => setStore({ ...store!, [key]: value });

  const loadStore = async () => {
    const { stores } = await request('GET', '/api/stores');
    let store = stores[0];

    if (!store) {
      ({ store } = await request('POST', '/api/stores', {
        branding: {
          primaryColor: '#562885',
          iconStrokeWidth: 2,
          borderRadius: 4,
          boxShadowAlpha: 0.05,
          animations: true,
        },
      }));
    }

    setStore(store);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    loadStore();
  }, []);

  if (!isLoggedIn) {
    return <Redirect to={ManagementPath.login} />;
  }

  if (!store) {
    return (
      <div className={css.Manage}>
        <Sidebar />
        <div className={css.Manage__loader}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={css.Manage}>
      <Sidebar />
      <div className={css.Manage__content}>
        <Switch>
          <Route path={ManagementPath.storeDetails}>
            <StoreDetails
              name={store.name}
              setName={(value: string) => updateLocalStore('name', value)}
              description={store.description}
              setDescription={(value: string) => updateLocalStore('description', value)}
              logo={store.logo}
              setLogo={async (value: Blob) => {
                updateLocalStore('logo', value);
                const { store } = await updateStore('logo', value);
                updateLocalStore('logo', store!.logo);
              }}
              onBlur={updateStore}
            />
          </Route>
          <Route path={ManagementPath.products}>
            <Products
              storeId={store.id}
              currency={store.currency || 'USD'}
            />
          </Route>
          <Route path={ManagementPath.experience}>
            <Experience
              branding={store.branding}
              logoUrl={typeof store.logo === 'string' ? store.logo : ''}
              setBranding={(value) => updateLocalStore('branding', value)}
              onComplete={(value) => updateStore('branding', value)}
            />
          </Route>
          <Route path={ManagementPath.details}>
            <Details
              country={store.country || ''}
              setCountry={async (value: string) => {
                updateLocalStore('country', value);
                await updateStore('country', value);
              }}
              currency={store.currency || ''}
              setCurrency={async (value: string) => {
                updateLocalStore('currency', value);
                await updateStore('currency', value);
              }}
            />
          </Route>
          <Route path={ManagementPath.webhooks}>
            <div className={css.Manage__comingSoon}>
              <p>
                Beb Pay will support webhooks when it reaches its beta release.
              </p>
              <p>
                Webhooks will allow you to connect Beb Pay to third party systems. This will be helpful for keeping stock levels in sync, updating customer accounts with transaction details, and much more.
              </p>
            </div>
          </Route>
          <Route path={ManagementPath.monitors}>
            <div className={css.Manage__comingSoon}>
              <p>
                Beb Pay will have transaction monitors when it reaches its beta release.
              </p>
              <p>
                Transaction monitors will allow you to set up a live feed of all the purchases in your store. This will be the perfect tool for stores that have security personnel keeping an eye on everything.
              </p>
            </div>
          </Route>
          <Route path={ManagementPath.launch}>
            <Launch
              url={store.url}
              logoUrl={typeof store.logo === 'string' ? store.logo : ''}
              color={store.branding.primaryColor || '#562885'}
              status={store.status}
              setStatus={(value: Store['status']) => {
                updateLocalStore('status', value);
                updateStore('status', value);
              }}
              hasCountryAndCurrencySet={!!store.country && !!store.currency}
            />
          </Route>
          <Route>
            <Redirect to={ManagementPath.storeDetails} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Manage;
