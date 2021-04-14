import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import { Container, makeStyles, MenuItem, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { putEditAccount } from "../../../redux/actions/creators/auth";

export type ProfileDetails = {
  id: string;
  email: string;
  name: string;
  dateOfBirth: Date;
  gender: 1 | 0;
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  textField: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
  submit: {
    margin: theme.spacing(3, 2, 2, 0),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [isEditing, setEditing] = React.useState(false);
  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  const account = useSelector((state: any) => state.loginAccount?.account);
  const dispatch = useDispatch();
  const dispatchPutEditAccount = (accountDetails: any) =>
    dispatch(putEditAccount(accountDetails, account.token));

  const initialValues: ProfileDetails = {
    id: account.id,
    name: account.name,
    dateOfBirth: account.dateOfBirth,
    email: account.email,
    gender: account.gender,
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatchPutEditAccount(values);
    },
  });

  const onBackButtonClicked = (e: any) => {
    toggleEditing();
    formik.handleReset(e);
  };

  return (
    <Container component="main" maxWidth="md">
      <div style={{ display: "flex" }}>
        <Typography
          component="h1"
          variant="h5"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          My Account Profile
        </Typography>
        {!isEditing && (
          <Button variant="text" color="secondary" onClick={toggleEditing}>
            Edit
          </Button>
        )}
      </div>

      <form
        className={classes.form}
        onSubmit={formik.handleSubmit}
        onReset={onBackButtonClicked}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              autoFocus
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              select
              fullWidth
              name="gender"
              label="Gender"
              variant="outlined"
              value={formik.values.gender}
              onChange={formik.handleChange}
              disabled={!isEditing}
            >
              <MenuItem value={0}>Male</MenuItem>
              <MenuItem value={1}>Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of birth"
              type="date"
              fullWidth
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              disabled={!isEditing}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled={!isEditing}
            />
          </Grid>
        </Grid>
        {isEditing && (
          <Grid item container xs={12} sm={6} md={4} spacing={2}>
            <Grid item xs={6}>
              <Button
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                className={classes.submit}
                type="reset"
                variant="contained"
                color="default"
                fullWidth
              >
                Back
              </Button>
            </Grid>
          </Grid>
        )}
      </form>
    </Container>
  );
};

export default React.memo(Profile);
