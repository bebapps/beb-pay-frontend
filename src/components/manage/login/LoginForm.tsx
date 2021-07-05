import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../../../hooks/useAuthentication';
import Button from '../../inputs/Button';
import InputWrapper from '../../inputs/InputWrapper';
import TextField from '../../inputs/TextField';
import ManagementPath from '../../../enums/ManagementPath';
import css from './LoginForm.module.scss';

const LoginForm = () => {
  const { login } = useAuthentication();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  }, [email, password]);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoggingIn(true);
          try {
            const tokens = await login(email, password); // TODO: validate form
            if (tokens) {
              return;
            }
            setErrorMessage('Incorrect username or password.'); // TODO: Get correct message
          } catch (error) {
            setErrorMessage('Something went wrong.'); // TODO: Get correct message
          }
          setIsLoggingIn(false);
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
        {errorMessage &&
          <div className={css.LoginForm__errorMessage}>
            {errorMessage}
          </div>
        }
        <Button
          type="submit"
          fullWidth
          disabled={isLoggingIn}
        >
          <div
            className={classNames(css.LoginForm__loginButton, {
              [css['LoginForm__loginButton--loading']]: isLoggingIn,
            })}
          >
            Login
          </div>
        </Button>
      </form>
      <div className={css.LoginForm__links}>
        <Link to={ManagementPath.createAccount}>Create an account</Link>
        <br />
        <Link to={ManagementPath.forgotPassword}>Forgot your password?</Link>
      </div>
    </>
  );
};

export default LoginForm;
