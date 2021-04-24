import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { Button, Link, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postConfirmSignUp } from "../../../redux/actions/creators/auth";
import { useState } from "react";

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
  const confirmSignUpSuccessfully = () => {
    setSuccess(true);
  };

  const { registeredAccount, errMess, successMessage } = useSelector(
    (state: any) => state.registerAccount
  );

  const dispatch = useDispatch();
  const dispatchPostConfirmSignUp = (token: string) =>
    dispatch(
      postConfirmSignUp(
        registeredAccount?.email,
        token,
        confirmSignUpSuccessfully
      )
    );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatchPostConfirmSignUp(values.token);
    },
  });
  return success ? (
    <Typography variant="h6" style={{ marginBottom: 12, color: "green" }}>
      {successMessage}
    </Typography>
  ) : (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
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
      <Typography
        variant="subtitle1"
        style={{ alignSelf: "start" }}
      >
        {"Don't see the code? "}
        <Link
          style={{ cursor: "pointer" }}
          onClick={() => console.log("resend")}
        >
          Resend
        </Link>
      </Typography>
    </form>
  );
};

export default TokenForm;
