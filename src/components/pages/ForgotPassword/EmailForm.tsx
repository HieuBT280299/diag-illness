import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Grid, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { sendForgotPasswordToken } from "../../../redux/actions/creators/auth";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = { email: "" };

const EmailForm = ({ switchToTokenForm }: any) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const dispatchSendForgotPasswordToken = (email: string) =>
    dispatch(sendForgotPasswordToken(email, switchToTokenForm));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatchSendForgotPasswordToken(values.email);
    },
  });
  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoFocus
        onChange={formik.handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Reset password
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          {"Don't have an account? "}
          <Link to="/signup">{"Sign Up"}</Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmailForm;
