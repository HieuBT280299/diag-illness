import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import HospitalListTable from "./HospitalListTable";
import HospitalSearchFormFull from "./HospitalSearchFormFull";
import HospitalSearchFormSimple from "./HospitalSearchFormSimple";
import UploadSelectionMenu from "../../UploadSelectionMenu";
import { useSelector } from "react-redux";
import { RoleIDs } from "../../../shared/constants";
import HospitalAddNew from "./HospitalAddNew";
import CustomizedDialog from "../../Dialog";

const Hospital = () => {
  const [simpleSearch, setSimpleSearch] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const closeDialog = () => {
    setDialogOpen(false);
  };

  const toggleSimpleSearch = () => {
    setSimpleSearch(!simpleSearch);
  };
  const addButtonClicked = () => {
    setDialogOpen(true);
  };

  const account = useSelector((state: any) => state.loginAccount?.account);

  const isAdmin = React.useMemo(() => account.roleId === RoleIDs.ROLE_ADMIN, [
    account,
  ]);

  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="row" justify="space-between">
            <Typography variant="h5" style={{ marginBottom: 12 }}>
              Tìm kiếm bệnh viện
            </Typography>
            {isAdmin && (
              <Grid item container xs={12} md={6} justify="flex-end">
                <UploadSelectionMenu addButtonClicked={addButtonClicked} type="hospital" />
                <CustomizedDialog
                  open={dialogOpen}
                  title="Thêm bệnh viện"
                  content={<HospitalAddNew closeDialog={closeDialog} />}
                  toggleDialog={closeDialog}
                />
              </Grid>
            )}
          </Grid>
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
