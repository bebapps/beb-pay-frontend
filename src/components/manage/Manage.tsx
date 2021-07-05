import { Redirect, Route, Switch } from 'react-router';
import { useAuthentication } from '../../hooks/useAuthentication';
import ManagementPath from '../../enums/ManagementPath';
import css from './Manage.module.scss';
import Sidebar from './Sidebar';

const Manage = () => {
  const { isLoggedIn } = useAuthentication();

  if (!isLoggedIn) {
    return <Redirect to={ManagementPath.login} />;
  }

  return (
    <div className={css.Manage}>
      <Sidebar />
      <div className={css.Manage__content}>
        <Switch>
          <Route path={ManagementPath.branding}>
            Branding
          </Route>
          <Route path={ManagementPath.products}>
            Products
          </Route>
          <Route path={ManagementPath.experience}>
            Experience
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
            Launch
          </Route>
          <Route>
            <Redirect to={ManagementPath.branding} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Manage;
