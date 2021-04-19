import React from "react";
import { Container, Grid } from "@material-ui/core";
import ManageAccountSearchForm from "./ManageAccountSearchForm";
import ManageAccountTable from "./ManageAccountTable";

const AdminManageAccount = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <ManageAccountSearchForm />
        </Grid>

        <Grid item xs={12} style={{ marginTop: 48 }}>
          <ManageAccountTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(AdminManageAccount);
