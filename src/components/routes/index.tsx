import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { RoleIDs, Routes } from "../../shared/constants";
import AdminManageAccount from "../pages/AdminManageAccount";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword";
import Hospital from "../pages/Hospital";
import Login from "../pages/Login";
import News from "../pages/News";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import UploadCsvPage from "../pages/UploadCsv";

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
    account.roleId === RoleIDs.ROLE_ADMIN ? (
      <Switch>
        <Route
          exact
          path={`${Routes.MANAGE_ACCOUNT}`}
          component={AdminManageAccount}
        />
        <Route exact path={`${Routes.NEWS}`} component={News} />
        <Route exact path={`${Routes.HOSPITAL}`} component={Hospital} />
        <Route path={`${Routes.UPLOAD}/:type`} component={UploadCsvPage} />
        <Redirect to={`${Routes.HOSPITAL}`} />
      </Switch>
    ) : (
      <Switch>
        <Route exact path={`${Routes.NEWS}`} component={News} />
        <Route exact path={`${Routes.HOSPITAL}`} component={Hospital} />
        <Route exact path={`${Routes.PROFILE}`} component={Profile} />
        <Route
          exact
          path={`${Routes.CHANGE_PASSWORD}`}
          component={ChangePassword}
        />
        <Redirect to={`${Routes.HOSPITAL}`} />
      </Switch>
    )
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
