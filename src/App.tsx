import css from './App.module.scss';
import { Route, Switch } from 'react-router';
import Manage from './components/manage/Manage';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/manage/login/Login';
import ManagementPath from './enums/ManagementPath';
import StoreContainer from './components/store/StoreContainer';

const App = () => {
  return (
    <BrowserRouter>
      <div className={css.App}>
        <Switch>
          <Route path={ManagementPath.login} component={Login} />
          <Route path={ManagementPath.createAccount} component={Login} />
          <Route path={ManagementPath.manage} component={Manage} />
          <Route path="/:storeId" component={StoreContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
