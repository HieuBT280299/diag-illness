import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import { Button, TextField } from "@material-ui/core";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postChangePassword } from "../../../redux/actions/creators/auth";

export type ChangePasswordDetails = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

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

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  confirmPassword: Yup.string().when("newPassword", {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref("newPassword")], "Không khớp"),
  }),
});

const ForgotPassword = () => {
  const classes = useStyles();
  const account = useSelector((state: any) => state.loginAccount?.account);
  const managePassword = useSelector((state: any) => state.managePassword);

  const dispatch = useDispatch();
  const dispatchPostChangePassword = (
    changePasswordDetails: ChangePasswordDetails
  ) => dispatch(postChangePassword(changePasswordDetails, account.token));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const submitValues = {
        email: account.email,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      // alert(JSON.stringify(values, null, 2));
      dispatchPostChangePassword(submitValues);
    },
    validationSchema: validationSchema,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đổi mật khẩu
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="oldPassword"
            label="Mật khẩu hiện tại"
            name="oldPassword"
            type="password"
            autoFocus
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="Mật khẩu mới"
            name="newPassword"
            type="password"
            autoFocus
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            type="password"
            autoFocus
            onChange={formik.handleChange}
          />
          <span style={{ color: "red" }}>{formik.errors.confirmPassword}</span>
          <span style={{ color: "red" }}>{managePassword.errMess}</span>
          <span style={{ color: "green" }}>{managePassword.message}</span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đổi mật khẩu
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default React.memo(ForgotPassword);
