import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RoleIDs } from "../../../shared/constants";
import NewsList from "./NewsList";
import NewsSearchForm from "./NewsSearchForm";
import NewsAddNew from "./NewsAddNew";
import UploadSelectionMenu from "../../UploadSelectionMenu";
import CustomizedDialog from "../../Dialog";

const News = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
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
              Tìm kiếm tin tức
            </Typography>
            {isAdmin && (
              <Grid item container xs={12} md={6} justify="flex-end">
                <UploadSelectionMenu addButtonClicked={addButtonClicked} type="news" />
                <CustomizedDialog
                  open={dialogOpen}
                  title="Thêm tin tức"
                  content={<NewsAddNew closeDialog={closeDialog} />}
                  toggleDialog={closeDialog}
                />
              </Grid>
            )}
          </Grid>

          <NewsSearchForm />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 48 }}>
          <NewsList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(News);
