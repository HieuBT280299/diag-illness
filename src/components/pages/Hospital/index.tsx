import React from "react";
import { Container, Grid } from "@material-ui/core";
import HospitalListTable from "./HospitalListTable";
import HospitalSearchForm from "./HospitalSearchForm";

const Hospital = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <HospitalSearchForm />
        </Grid>

        <Grid item xs={12} style={{ marginTop: 48 }}>
          <HospitalListTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(Hospital);
