import { Link } from 'react-router-dom';
import ManagementPath from '../../../enums/ManagementPath';
import css from './ForgotPassword.module.scss';

const ForgotPassword = () => {
  return (
    <div className={css.ForgotPassword}>
      <p>
        Beb Pay is currently in Alpha
      </p>
      <p>
        If you’ve forgotten your password, please contact us at <a href="mailto:team@bebapps.com">team@bebapps.com</a> to restore access to your account.
      </p>
      <div className={css.ForgotPassword__links}>
        <Link to={ManagementPath.login}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
