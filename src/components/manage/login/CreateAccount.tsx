import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../../../hooks/useAuthentication';
import Button from '../../inputs/Button';
import InputWrapper from '../../inputs/InputWrapper';
import TextField from '../../inputs/TextField';
import ManagementPath from '../../../enums/ManagementPath';
import css from './Form.module.scss';

const CreateAccount = () => {
  const { register } = useAuthentication();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (password !== passwordConfirmation) {
            setErrorMessage('Passwords must match.');
            return;
          }

          setIsCreatingAccount(true);
          register(email, password);
        }}
      >
        <InputWrapper label="Email" >
          <TextField
            required
            autoFocus
            type="email"
            value={email}
            onChange={setEmail}
          />
        </InputWrapper>
        <InputWrapper label="Password" >
          <TextField
            required
            value={password}
            onChange={setPassword}
            type="password"
          />
        </InputWrapper>
        <InputWrapper label="Confirm password" >
          <TextField
            required
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            type="password"
          />
        </InputWrapper>
        {errorMessage &&
          <div className={css.Form__errorMessage}>
            {errorMessage}
          </div>
        }
        <Button
          type="submit"
          fullWidth
          disabled={isCreatingAccount}
        >
          <div
            className={classNames(css.Form__actionButton, {
              [css['LoginForm__actionButton--loading']]: isCreatingAccount,
            })}
          >
            Create account
          </div>
        </Button>
      </form>
      <div className={css.Form__links}>
        <Link to={ManagementPath.login}>Already have an account?</Link>
      </div>
    </>
  );
};

export default CreateAccount;
