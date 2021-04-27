import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import HospitalCsvUpload from "./HospitalCsvUpload";

enum UploadCsvType {
  NEWS = "news",
  HOSPITAL = "hospital",
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const UploadCsvForm = ({ type }: any) => {
  switch (type) {
    case UploadCsvType.NEWS:
      return <div></div>;
    case UploadCsvType.HOSPITAL:
      return <HospitalCsvUpload />;
    default:
      return <div></div>;
  }
};

const UploadCsvPage = ({ match }: any) => {
  const classes = useStyles();
  const { type } = match.params;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <UploadCsvForm type={type} />
      </div>
    </Container>
  );
};

export default React.memo(UploadCsvPage);
