import { Grid, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import HospitalListTable from "./HospitalListTable";
import HospitalSearchForm from "./HospitalSearchForm";

const Hospital = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h4>Search</h4>
        <HospitalSearchForm />
      </Grid>

      <Grid item xs={12} style={{ marginTop: 12 }}>
        <HospitalListTable />
      </Grid>
    </Grid>
  );
};

export default Hospital;
