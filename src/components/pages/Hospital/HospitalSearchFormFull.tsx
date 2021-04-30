import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getHospitalList } from "../../../redux/actions/creators/hospital";
import { CITIES, DISTRICTS, WARDS } from "../../../shared/constants/geodata";
import { sortByName } from "../../../shared/helper";

const initialValues = {
  name: "",
  number: "",
  phone: "",
  cityCode: "0",
  districtCode: "0",
  wardCode: "0",
};

const HospitalSearchForm = ({ toggleSimpleSearch }: any) => {
  const { pageSize } = useSelector((state: any) => state.hospitals);
  const account = useSelector((state: any) => state.loginAccount?.account);

  const paginationData = { page: 1, size: pageSize };
  const dispatch = useDispatch();
  const dispatchHospitalList = (searchData: any) =>
    dispatch(
      getHospitalList("full", searchData, paginationData, account.token)
    );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const submitValues = {
        ...values,
        cityCode: values.cityCode === "0" ? null : values.cityCode,
        districtCode: values.districtCode === "0" ? null : values.districtCode,
        wardCode: values.wardCode === "0" ? null : values.wardCode,
      };
      dispatchHospitalList(submitValues);
    },
  });

  const cityChange = (e: React.ChangeEvent<any>) => {
    formik.values.districtCode = "0";
    formik.values.wardCode = "0";
    formik.handleChange(e);
  };

  const districtChange = (e: React.ChangeEvent<any>) => {
    formik.values.wardCode = "0";
    formik.handleChange(e);
  };

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 12 }}>
        Tìm kiếm bệnh viện
      </Typography>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                name="name"
                label="Tên"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                select
                fullWidth
                name="cityCode"
                label="Tỉnh/Thành phố"
                variant="outlined"
                value={formik.values.cityCode}
                onChange={cityChange}
              >
                <MenuItem value="0">--Lựa chọn--</MenuItem>
                {CITIES.sort(sortByName).map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                select
                fullWidth
                name="districtCode"
                label="Quận/Huyện"
                variant="outlined"
                value={formik.values.districtCode}
                onChange={districtChange}
              >
                <MenuItem value="0">--Lựa chọn--</MenuItem>
                {DISTRICTS.filter(
                  (district) => district.upperId === formik.values.cityCode
                )
                  .sort(sortByName)
                  .map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                select
                fullWidth
                name="wardCode"
                label="Phường/Xã"
                variant="outlined"
                value={formik.values.wardCode}
                onChange={formik.handleChange}
              >
                <MenuItem value="0">--Lựa chọn--</MenuItem>
                {WARDS.filter(
                  (ward) => ward.upperId === formik.values.districtCode
                )
                  .sort(sortByName)
                  .map((ward) => (
                    <MenuItem key={ward.id} value={ward.id}>
                      {ward.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                name="number"
                label="Địa chỉ chi tiết"
                variant="outlined"
                value={formik.values.number}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                name="phone"
                label="Điện thoại"
                variant="outlined"
                value={formik.values.phone}
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
                Tìm kiếm đơn giản
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default HospitalSearchForm;
