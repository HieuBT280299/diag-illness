import React from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getHospitalList } from "../../../redux/actions/creators/hospital";

const initialValues = {
  search: "",
};

const HospitalSearchFormSimple = ({ toggleSimpleSearch }: any) => {
  const { pageSize } = useSelector((state: any) => state.hospitals);
  const account = useSelector((state: any) => state.loginAccount?.account);

  const paginationData = { page: 1, size: pageSize };
  const dispatch = useDispatch();
  const dispatchHospitalList = (searchData: any) =>
    dispatch(getHospitalList(searchData, paginationData, account.token));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      // dispatchHospitalList(submitValues);
    },
  });

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 12 }}>
        Search for a hospital
      </Typography>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                placeholder="Search for anything..."
                name="search"
                variant="outlined"
                value={formik.values.search}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 12 }}>
            <Grid item>
              <Button type="submit" color="primary" variant="contained">
                Search
              </Button>
              <Button
                type="reset"
                color="primary"
                variant="outlined"
                style={{ marginLeft: 12 }}
              >
                Reset
              </Button>
              <Button
                color="primary"
                variant="outlined"
                style={{ marginLeft: 12 }}
                onClick={toggleSimpleSearch}
              >
                More Details
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default HospitalSearchFormSimple;
