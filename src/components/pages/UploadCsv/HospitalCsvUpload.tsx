import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
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

const HospitalCsvUpload = () => {
  const classes = useStyles();

  const [file, setFile] = useState<string | Blob>("");

  const account = useSelector((state: any) => state.loginAccount?.account);
  const dispatch = useDispatch();
  const dispatchUploadHospitalCsv = (formData: any) =>
    dispatch(uploadHospitalCsv(formData, account.token));

  const handleChange = (event: any) => {
    setFile(event.target.files[0] !== undefined ? event.target.files[0] : "");
  };

  const handleSubmit = (e: any) => {
    if (file !== "") {
      const formData = new FormData();
      formData.append("csvfile", file);
      dispatchUploadHospitalCsv(formData);
    } else {
      console.log("null");
    }
  };

  return (
    <form className={classes.form}>
      <Grid container>
        <Grid item xs={12}>
          <input
            name="file"
            type="file"
            accept=".csv"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
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
