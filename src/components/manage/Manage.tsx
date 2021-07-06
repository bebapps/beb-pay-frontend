import { Redirect, Route, Switch } from 'react-router';
import { useAuthentication } from '../../hooks/useAuthentication';
import Experience from './Experience';
import Branding from './Branding';
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
    const formData = new FormData();
    const updateValue = value || store![key];
    if (updateValue) {
      formData.append(key, updateValue instanceof Blob ? updateValue : `${updateValue}`);
    }
    return request('PUT', `/api/stores/${store!.id}`, formData);
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
          <Route path={ManagementPath.branding}>
            <Branding
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
          <Route path={ManagementPath.experience} component={Experience} />
          <Route path={ManagementPath.details}>
            Your details
          </Route>
          <Route path={ManagementPath.webhooks}>
            Webhooks
          </Route>
          <Route path={ManagementPath.monitors}>
            Monitors
          </Route>
          <Route path={ManagementPath.launch} component={Launch} />
          <Route>
            <Redirect to={ManagementPath.branding} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Manage;
