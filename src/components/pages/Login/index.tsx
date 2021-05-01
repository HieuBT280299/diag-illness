import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../../redux/actions/creators/auth";
import { useFormik } from "formik";
import { FormHelperText } from "@material-ui/core";
import { Routes } from "../../../shared/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export type LoginDetails = {
  email: string;
  password: string;
};

const initialValues: LoginDetails = { email: "", password: "" };

const Login = () => {
  const account = useSelector((state: any) => state.loginAccount?.account);
  const errMess = useSelector((state: any) => state.loginAccount?.errMess);

  const dispatch = useDispatch();
  const dispatchPostLogin = (loginDetails: LoginDetails) =>
    dispatch(postLogin(loginDetails));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      dispatchPostLogin(values);
    },
  });

  const classes = useStyles();
  return (
    <>
      <Typography
        component="h1"
        variant="h6"
        align="center"
        style={{ marginBottom: 60 }}
      >
        Chào mừng bạn đã đến với Hệ thống hỗ trợ chẩn đoán bệnh
      </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
            />
            {errMess && (
              <Grid container>
                <FormHelperText error>{errMess}</FormHelperText>
                <FormHelperText error>
                  {
                    "Nếu bạn đã đăng ký tài khoản nhưng chưa kích hoạt, vui lòng kích hoạt "
                  }
                  <Link to={`${Routes.SIGN_UP}/confirm`}>{"tại đây"}</Link>
                </FormHelperText>
              </Grid>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={Routes.FORGOT_PASSWORD}>Quên mật khẩu?</Link>
              </Grid>
              <Grid item>
                {"Không có tài khoản? "}
                <Link to={Routes.SIGN_UP}>{"Đăng ký"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default React.memo(Login);
