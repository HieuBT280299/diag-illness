import { Switch, Route, Redirect } from "react-router-dom";
import { Routes } from "../../shared/constants";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const SwitchRoutes = ({ account }: any) => {
  return (
    <Switch>
      <Route path={`${Routes.HOME}`} component={Home} />
      <Route path={`${Routes.LOGIN}`} component={Login} />
      <Route path={`${Routes.SIGN_UP}`} component={SignUp} />
      <Redirect to={`${Routes.HOME}`} />
    </Switch>
  );
};

export default SwitchRoutes;
