import {
  Button,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import { CITIES, DISTRICTS, WARDS } from "../../../shared/constants/geodata";
import { sortByName } from "../../../shared/helper";

//TODO

const HospitalDetailEdit = ({ row, closeDialog }: any) => {
  const initialValues = row;
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const submitValues = {
        ...values,
        cityCode: values.cityCode === "0" ? null : values.cityCode,
        districtCode: values.districtCode === "0" ? null : values.districtCode,
        wardCode: values.wardCode === "0" ? null : values.wardCode,
      };
      alert(JSON.stringify(submitValues));
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
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
          <Grid item container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="workingTime"
                label="Giờ làm việc"
                variant="outlined"
                value={formik.values.workingTime}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justify="flex-end"
          xs={12}
          style={{ marginTop: 12 }}
        >
          <Button type="submit" color="primary">
            Lưu
          </Button>
          <Button onClick={closeDialog} color="secondary">
            Đóng
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default HospitalDetailEdit;
