import { Switch, Route, Redirect } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from '../pages/SignUp';

const ROUTE_HOME = "/home";
const ROUTE_LOGIN = "/login";
const ROUTE_SIGN_UP = "/signup";

const SwitchRoutes = ({ account }: any) => {
  return (
    <Switch>
      <Route path={`${ROUTE_HOME}`} component={Home} />
      <Route path={`${ROUTE_LOGIN}`} component={Login} />
      <Route path={`${ROUTE_SIGN_UP}`} component={SignUp} />
      <Redirect to={`${ROUTE_HOME}`} />
    </Switch>
  );
};

export default SwitchRoutes;
