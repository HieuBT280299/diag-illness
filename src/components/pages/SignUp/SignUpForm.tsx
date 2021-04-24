import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { postSignUp } from "../../../redux/actions/creators/auth";

export type RegisterDetails = {
  email: string;
  password: string;
  name: string;
  dateOfBirth: Date;
  gender: 1 | 0;
};

const initialValues: RegisterDetails = {
  name: "",
  dateOfBirth: new Date(),
  email: "",
  password: "",
  gender: 0,
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm = ({ switchToTokenForm }: any) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const dispatchPostSignUp = (registerDetails: RegisterDetails) =>
    dispatch(postSignUp(registerDetails, switchToTokenForm));

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      const submitValues = {
        ...values,
        dateOfBirth: new Date(values.dateOfBirth),
      };
      dispatchPostSignUp(submitValues);
      //   alert(JSON.stringify(submitValues, null, 2));
    },
  });
  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            name="gender"
            label="Gender"
            variant="outlined"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <MenuItem value={0}>Male</MenuItem>
            <MenuItem value={1}>Female</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of birth"
            type="date"
            fullWidth
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          {"Already have an account? "}
          <Link to="/login">Sign in</Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
