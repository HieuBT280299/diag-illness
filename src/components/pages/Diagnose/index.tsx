import React from "react";
import { Container, Grid } from "@material-ui/core";
import DiagnoseForm from "./DiagnoseForm";

const Diagnose = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <DiagnoseForm />
        </Grid>

        <Grid item xs={12} style={{ marginTop: 48 }}>
          HospitalListTable
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(Diagnose);
