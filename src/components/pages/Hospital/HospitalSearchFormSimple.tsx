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
  const dispatchHospitalList = (searchData: string) =>
    dispatch(
      getHospitalList("simple", searchData, paginationData, account.token)
    );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      dispatchHospitalList(values.search);
    },
  });

  return (
    <>
      
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                placeholder="Hãy nhập gì đó..."
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
                Tìm kiếm
              </Button>
              <Button
                type="reset"
                color="primary"
                variant="outlined"
                style={{ marginLeft: 12 }}
              >
                Xoá
              </Button>
              <Button
                color="primary"
                variant="outlined"
                style={{ marginLeft: 12 }}
                onClick={toggleSimpleSearch}
              >
                Tìm kiếm chi tiết
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default HospitalSearchFormSimple;
