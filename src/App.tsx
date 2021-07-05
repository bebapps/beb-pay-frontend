import css from './App.module.scss';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ManagementPath from './enums/ManagementPath';

const App = () => {
  return (
    <BrowserRouter>
      <div className={css.App}>
        <Switch>
          <Route path={ManagementPath.login}>
            Login
          </Route>
          <Route path={ManagementPath.manage}>
            Manage
          </Route>
          <Route>
            Home
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
