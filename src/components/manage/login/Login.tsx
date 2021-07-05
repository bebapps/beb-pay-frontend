import { Redirect, Route, Switch } from 'react-router-dom';
import css from './Login.module.scss';
import Logo from '../../Logo';
import LoginForm from './LoginForm';
import ManagementPath from '../../../enums/ManagementPath';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';
import { useAuthentication } from '../../../hooks/useAuthentication';
import Panel from '../../Panel';

const Login = () => {
  const { isLoggedIn } = useAuthentication();

  if (isLoggedIn) {
    return <Redirect to={ManagementPath.manage} />;
  }

  return (
    <div className={css.Login}>
      <div className={css.Login__background} />
      <Panel className={css.Login__panel}>
        <div className={css.Login__panel__logo}>
          <Logo size={48} />
        </div>
        <Switch>
          <Route path={ManagementPath.createAccount}>
            <CreateAccount />
          </Route>
          <Route path={ManagementPath.forgotPassword}>
            <ForgotPassword />
          </Route>
          <Route>
            <LoginForm />
          </Route>
        </Switch>
      </Panel>
    </div>
  );
};

export default Login;
