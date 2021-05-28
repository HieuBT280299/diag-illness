import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import {
  Button,
  Link as MuiLink,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  postResetPassword,
  sendForgotPasswordToken,
} from "../../../redux/actions/creators/auth";
import { useState } from "react";
import { Routes } from "../../../shared/constants";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export type ResetPasswordDetails = {
  token: string;
  email: string;
  newPassword: string;
};

const initialValues = { token: "", newPassword: "", confirmPassword: "" };

const TokenForm = ({ switchToEmailForm }: any) => {
  const classes = useStyles();

  const [success, setSuccess] = useState(false);
  const [showResendMessage, setShowResendMessage] = useState(false);
  const confirmResetPassowrdSuccessfully = () => {
    setSuccess(true);
    setShowResendMessage(false);
  };
  const resendSuccessfully = () => {
    setShowResendMessage(true);
  };

  const { email, errMess, successMessage } = useSelector(
    (state: any) => state.managePassword
  );

  const dispatch = useDispatch();
  const dispatchPostResetPassword = (
    resetPasswordDetails: ResetPasswordDetails
  ) =>
    dispatch(
      postResetPassword(resetPasswordDetails, confirmResetPassowrdSuccessfully)
    );
  const dispatchSendForgotPasswordToken = () =>
    dispatch(sendForgotPasswordToken(email, resendSuccessfully));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const submitValues: ResetPasswordDetails = {
        email,
        token: values.token,
        newPassword: values.newPassword,
      };
      // alert(JSON.stringify(submitValues, null, 2));
      dispatchPostResetPassword(submitValues);
    },
  });
  return success ? (
    <>
      <Typography variant="h6" style={{ marginBottom: 12, color: "green" }}>
        {successMessage}
      </Typography>
      <Link to={Routes.LOGIN}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Quay lại trang đăng nhập
        </Button>
      </Link>
    </>
  ) : (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="token"
        label="Mã xác thực"
        name="token"
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
        label="Xác nhận mật khẩu"
        name="confirmPassword"
        type="password"
        autoFocus
        onChange={formik.handleChange}
      />
      {errMess && (
        <Typography
          variant="body2"
          style={{ alignSelf: "start", marginTop: 12, color: "red" }}
        >
          {errMess}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Đổi mật khẩu
      </Button>
      <Typography variant="subtitle1" style={{ alignSelf: "start" }}>
        {"Không nhận được mã? "}
        <MuiLink
          style={{ cursor: "pointer", color: "#007bff" }}
          onClick={dispatchSendForgotPasswordToken}
        >
          Gửi lại mã
        </MuiLink>
      </Typography>
    </form>
  );
};

export default TokenForm;
