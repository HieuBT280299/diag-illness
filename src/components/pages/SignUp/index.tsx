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
import { useFormik } from "formik";
import { MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { postSignUp } from "../../../redux/actions/creators/auth";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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

const SignUp = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const dispatchPostSignUp = (registerDetails: RegisterDetails) =>
    dispatch(postSignUp(registerDetails));

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      const submitValues = {
        ...values,
        dateOfBirth: new Date(values.dateOfBirth),
      };
      dispatchPostSignUp(submitValues);
      alert(JSON.stringify(submitValues, null, 2));
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
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
      </div>
    </Container>
  );
};

export default React.memo(SignUp);
