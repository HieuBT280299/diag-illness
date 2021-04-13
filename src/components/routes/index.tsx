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
    <>
      <Route path={`${Routes.HOME}`} component={Home} />
      <Route path={`${Routes.NEWS}`} component={News} />
      <Route path={`${Routes.HOSPITAL}`} component={Hospital} />
      <Route path={`${Routes.DIAGNOSE}`} component={Diagnose} />
      <Redirect to={`${Routes.HOME}`} />
    </>
  ) : (
    <>
      <Route path={`${Routes.LOGIN}`} component={Login} />
      <Route path={`${Routes.SIGN_UP}`} component={SignUp} />
      <Route path={`${Routes.FORGOT_PASSWORD}`} component={ForgotPassword} />
      <Redirect to={`${Routes.LOGIN}`} />
    </>
  );

  return (
    <div className={classes.content}>
      <Switch>{SwitchRoutes}</Switch>
    </div>
  );
};

export default SwitchRoutes;
