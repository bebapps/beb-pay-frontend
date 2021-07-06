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

  const updateLocalStore = <T extends keyof Store>(key: T, value: Store[T]) => {
    setStore({ ...store!, [key]: value });
  };

  const loadStore = async () => {
    const { stores } = await request('GET', '/api/stores');
    setStore(stores[0]);
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
            Products
          </Route>
          <Route path={ManagementPath.experience}>
            <Experience
              branding={store.branding}
              setBranding={(value) => updateLocalStore('branding', value)}
              onComplete={(value) => updateStore('branding', value)}
            />
          </Route>
          <Route path={ManagementPath.details}>
            Your details
          </Route>
          <Route path={ManagementPath.webhooks}>
            Webhooks
          </Route>
          <Route path={ManagementPath.monitors}>
            Monitors
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
