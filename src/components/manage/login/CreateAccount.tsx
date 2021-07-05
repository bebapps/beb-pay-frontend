import { Link } from 'react-router-dom';
import ManagementPath from '../../../enums/ManagementPath';
import css from './CreateAccount.module.scss';

const CreateAccount = () => {
  return (
    <div className={css.CreateAccount}>
      <p>
        Beb pay is currently in Alpha
      </p>
      <p>
        To register your interest in taking your customer experience to the next level, please contact us at <a href="mailto:team@bebapps.com">team@bebapps.com</a>.
      </p>
      <div className={css.CreateAccount__links}>
        <Link to={ManagementPath.login}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
