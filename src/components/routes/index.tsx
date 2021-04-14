import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Routes } from "../../shared/constants";
import Diagnose from "../pages/Diagnose";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Hospital from "../pages/Hospital";
import Login from "../pages/Login";
import News from "../pages/News";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 64,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const SwitchRoutes = () => {
  const account = useSelector((state: any) => state.loginAccount?.account);
  const classes = useStyles();

  const SwitchRoutes = account ? (
    <Switch>
      <Route path={`${Routes.HOME}`} component={Home} />
      <Route exact path={`${Routes.NEWS}`} component={News} />
      <Route exact path={`${Routes.HOSPITAL}`} component={Hospital} />
      <Route exact path={`${Routes.DIAGNOSE}`} component={Diagnose} />
      <Route exact path={`${Routes.PROFILE}`} component={Profile} />
      <Redirect to={`${Routes.HOME}`} />
    </Switch>
  ) : (
    <Switch>
      <Route path={`${Routes.LOGIN}`} component={Login} />
      <Route exact path={`${Routes.SIGN_UP}`} component={SignUp} />
      <Route
        exact
        path={`${Routes.FORGOT_PASSWORD}`}
        component={ForgotPassword}
      />
      <Redirect to={`${Routes.LOGIN}`} />
    </Switch>
  );

  return <div className={classes.content}>{SwitchRoutes}</div>;
};

export default SwitchRoutes;
