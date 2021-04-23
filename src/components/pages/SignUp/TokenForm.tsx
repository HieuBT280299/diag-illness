import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { Button, TextField } from "@material-ui/core";

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
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Submit
      </Button>
    </form>
  );
};

export default TokenForm;
