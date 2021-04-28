import React from "react";
import { Container, Grid } from "@material-ui/core";
import HospitalListTable from "./HospitalListTable";
import HospitalSearchFormFull from "./HospitalSearchFormFull";
import HospitalSearchFormSimple from "./HospitalSearchFormSimple";

const Hospital = () => {
  const [simpleSearch, setSimpleSearch] = React.useState(true);
  const toggleSimpleSearch = () => {
    setSimpleSearch(!simpleSearch);
  };
  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          {simpleSearch ? (
            <HospitalSearchFormSimple toggleSimpleSearch={toggleSimpleSearch} />
          ) : (
            <HospitalSearchFormFull toggleSimpleSearch={toggleSimpleSearch} />
          )}
        </Grid>

        <Grid item xs={12} style={{ marginTop: 48 }}>
          <HospitalListTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(Hospital);
