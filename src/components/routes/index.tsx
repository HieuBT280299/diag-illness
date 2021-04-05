import { Switch, Route, Redirect } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";

const ROUTE_HOME = "/home";
const ROUTE_LOGIN = "/login";

const SwitchRoutes = ({ account }: any) => {
  return (
    <Switch>
      <Route path={`${ROUTE_HOME}`} component={Home} />
      <Route path={`${ROUTE_LOGIN}`} component={Login} />
      <Redirect to={`${ROUTE_HOME}`} />
    </Switch>
  );
};

export default SwitchRoutes;
