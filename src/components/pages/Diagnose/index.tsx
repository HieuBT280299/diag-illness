import { Grid } from "@material-ui/core";
import DiagnoseForm from "./DiagnoseForm";

const Diagnose = () => {
  return (
    <Grid container>
      <Grid item xs={12} style={{ margin: 12 }}>
        <DiagnoseForm />
      </Grid>

      <Grid item xs={12} style={{ marginTop: 48 }}>
        HospitalListTable
      </Grid>
    </Grid>
  );
};

export default Diagnose;
