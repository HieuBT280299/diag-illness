import React from "react";
import { Grid } from "@material-ui/core";
import HospitalListTable from "./HospitalListTable";
import HospitalSearchForm from "./HospitalSearchForm";

const Hospital = () => {
  return (
    <Grid container>
      <Grid item xs={12} style={{ margin: 12 }}>
        <HospitalSearchForm />
      </Grid>

      <Grid item xs={12} style={{ marginTop: 48 }}>
        <HospitalListTable />
      </Grid>
    </Grid>
  );
};

export default React.memo(Hospital);
