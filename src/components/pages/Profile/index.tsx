import React from "react";
import { Grid } from "@material-ui/core";

const Profile = () => {
  return (
    <Grid container>
      <Grid item xs={12} style={{ margin: 12 }}>
        Profile
      </Grid>

      <Grid item xs={12} style={{ marginTop: 48 }}>
        Profile
      </Grid>
    </Grid>
  );
};

export default React.memo(Profile);
