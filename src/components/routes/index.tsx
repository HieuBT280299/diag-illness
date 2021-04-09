import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import { Routes } from "../../shared/constants";
import Diagnose from "../pages/Diagnose";
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

const SwitchRoutes = ({ account }: any) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Switch>
        <Route path={`${Routes.HOME}`} component={Home} />
        <Route path={`${Routes.LOGIN}`} component={Login} />
        <Route path={`${Routes.SIGN_UP}`} component={SignUp} />
        <Route path={`${Routes.NEWS}`} component={News} />
        <Route path={`${Routes.HOSPITAL}`} component={Hospital} />
        <Route path={`${Routes.DIAGNOSE}`} component={Diagnose} />
        <Redirect to={`${Routes.HOME}`} />
      </Switch>
    </div>
  );
};

export default SwitchRoutes;
