import { Button, Grid, makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { uploadHospitalCsv } from "../../../redux/actions/creators/hospital";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  file: "",
};

const validationSchema = Yup.object().shape({
  file: Yup.mixed().required("A file is required"),
});

const HospitalCsvUpload = () => {
  const classes = useStyles();

  const account = useSelector((state: any) => state.loginAccount?.account);
  const dispatch = useDispatch();
  const dispatchUploadHospitalCsv = (formData: any) =>
    dispatch(uploadHospitalCsv(formData, account.token));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("csvfile", values.file);
      alert(JSON.stringify(values, null, 2));
      dispatchUploadHospitalCsv(formData);
    },
    validationSchema: validationSchema,
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <input
            name="file"
            type="file"
            accept=".csv"
            onChange={formik.handleChange}
            value={formik.values.file}
          />
        </Grid>
        <span style={{ color: "red" }}>{formik.errors.file}</span>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(HospitalCsvUpload);
