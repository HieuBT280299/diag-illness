import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import NewsList from "./NewsList";
import NewsSearchForm from "./NewsSearchForm";

const News = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="row" justify="space-between">
            <Typography variant="h5" style={{ marginBottom: 12 }}>
              Tìm kiếm tin tức
            </Typography>
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
