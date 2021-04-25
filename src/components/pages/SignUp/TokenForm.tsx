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
  postConfirmSignUp,
  resendTokenSignUp,
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

const initialValues = { token: "" };

const TokenForm = ({ switchToEmailForm }: any) => {
  const classes = useStyles();

  const [success, setSuccess] = useState(false);
  const [showResendMessage, setShowResendMessage] = useState(false);
  const confirmSignUpSuccessfully = () => {
    setSuccess(true);
    setShowResendMessage(false);
  };
  const resendSuccessfully = () => {
    setShowResendMessage(true);
  };

  const { registeredAccount, errMess, successMessage } = useSelector(
    (state: any) => state.registerAccount
  );

  const email = registeredAccount?.email;

  const dispatch = useDispatch();

  const dispatchPostConfirmSignUp = (token: string) =>
    dispatch(postConfirmSignUp(email, token, confirmSignUpSuccessfully));

  const dispatchResendTokenSignUp = () =>
    dispatch(resendTokenSignUp(email, resendSuccessfully));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatchPostConfirmSignUp(values.token);
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
          Back to login
        </Button>
      </Link>
    </>
  ) : (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Typography variant="body2" style={{ alignSelf: "start" }}>
        {showResendMessage ? "Another confirmation" : "Confirmation"} code has
        been sent to <b>{email}</b>
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="token"
        label="Sign Up Token"
        name="token"
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
        Submit
      </Button>
      <Typography variant="subtitle1" style={{ alignSelf: "start" }}>
        {"Don't see the code? "}
        <MuiLink
          style={{ cursor: "pointer" }}
          onClick={dispatchResendTokenSignUp}
        >
          Resend
        </MuiLink>
      </Typography>
    </form>
  );
};

export default TokenForm;
