import { Redirect, Route, Switch } from 'react-router-dom';
import css from './Login.module.scss';
import Logo from '../../Logo';
import LoginForm from './LoginForm';
import ManagementPath from '../../../enums/ManagementPath';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';
import { useAuthentication } from '../../../hooks/useAuthentication';
import Panel from '../../Panel';
import classNames from 'classnames';
import isSafari from '../../../helpers/isSafari';

const Login = () => {
  const { isLoggedIn } = useAuthentication();

  if (isLoggedIn) {
    return <Redirect to={ManagementPath.manage} />;
  }

  return (
    <div className={css.Login}>
      <div className={css.Login__background} />
      <Panel
        className={classNames(css.Login__panel, {
          [css['Login__panel--safari']]: isSafari,
        })}
      >
        <div className={css.Login__panel__logo}>
          <Logo size={48} />
        </div>
        <Switch>
          <Route path={ManagementPath.createAccount} component={CreateAccount} />
          <Route path={ManagementPath.forgotPassword} component={ForgotPassword} />
          <Route component={LoginForm} />
        </Switch>
      </Panel>
    </div>
  );
};

export default Login;
