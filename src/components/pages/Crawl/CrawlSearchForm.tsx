import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getCrawlList } from "../../../redux/actions/creators/crawl";

export type CrawlSearchFields = {
  userId?: string;
  prefixUrl?: string;
  startUrl?: string;
  patternUrl?: string;
  data?: string;
};

const initialValues: CrawlSearchFields = {
  userId: "",
  prefixUrl: "",
  startUrl: "",
  patternUrl: "",
  data: "",
};
const CrawlSearchForm = () => {
  const { pageSize } = useSelector((state: any) => state.crawl);
  const account = useSelector((state: any) => state.loginAccount?.account);

  const paginationData = { page: 1, size: pageSize };
  const dispatch = useDispatch();
  const dispatchCrawlList = (searchData: any) =>
    dispatch(getCrawlList(searchData, paginationData, account.token));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      dispatchCrawlList(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Grid container spacing={2}>
        <Grid item container>
          <Grid item xs={12} lg={9}>
            <TextField
              fullWidth
              name="userId"
              label="ID người dùng"
              variant="outlined"
              value={formik.values.userId}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={12} lg={9}>
            <TextField
              fullWidth
              name="prefixUrl"
              label="Prefix URL"
              variant="outlined"
              value={formik.values.prefixUrl}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={12} lg={9}>
            <TextField
              fullWidth
              name="startUrl"
              label="Start URL"
              variant="outlined"
              value={formik.values.startUrl}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={12} lg={9}>
            <TextField
              fullWidth
              name="patternUrl"
              label="Pattern URL"
              variant="outlined"
              value={formik.values.patternUrl}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={12} lg={9}>
            <TextField
              fullWidth
              name="data"
              label="Dữ liệu"
              variant="outlined"
              value={formik.values.data}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
        <Grid item container style={{ marginTop: 12 }}>
          <Grid item>
            <Button type="submit" color="primary" variant="contained">
              Tìm kiếm
            </Button>
            <Button
              type="reset"
              color="primary"
              variant="outlined"
              style={{ marginLeft: 12 }}
            >
              Xoá bộ lọc
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(CrawlSearchForm);
