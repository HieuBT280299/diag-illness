import React from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RoleIDs, Routes } from "../../../shared/constants";
import CrawlSearchForm from "./CrawlSearchForm";
import CustomizedDialog from "../../Dialog";
import UploadSelectionMenu from "../../UploadSelectionMenu";
import { useHistory } from "react-router";
import CrawlDataTable from "./CrawlDataTable";

const Crawl = () => {
  const history = useHistory();
  const uploadButtonClicked = () => {
    history.push(`${Routes.CRAWL}/upload`);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="row" justify="space-between">
            <Typography variant="h5" style={{ marginBottom: 12 }}>
              Tìm kiếm dữ liệu thu thập
            </Typography>
            <Grid item container xs={12} md={6} justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={uploadButtonClicked}
              >
                Thêm dữ liệu
              </Button>
            </Grid>
          </Grid>

          <CrawlSearchForm />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 48 }}>
          <CrawlDataTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(Crawl);
