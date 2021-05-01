import {
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { CITIES, DISTRICTS, WARDS } from "../../../shared/constants/geodata";
import { sortByName } from "../../../shared/helper";
import { addNewHospital } from "../../../redux/actions/creators/hospital";

const initialValues = {
  name: "",
  number: "",
  phone: "",
  email: "",
  cityCode: "0",
  districtCode: "0",
  wardCode: "0",
  workingTime: "",
  introduction: "",
  service: "",
  department: "",
};

const HospitalAddNew = ({ closeDialog }: any) => {
  const account = useSelector((state: any) => state.loginAccount?.account);
  const { addNewErrMess } = useSelector((state: any) => state.hospitals);
  const dispatch = useDispatch();
  const dispatchAddNewHospital = (data: any) =>
    dispatch(addNewHospital(data, account.token, closeDialog));
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const submitValues = {
        ...values,
        cityCode: values.cityCode === "0" ? undefined : values.cityCode,
        city:
          values.cityCode === "0"
            ? undefined
            : CITIES.find((city) => city.id === values.cityCode)?.name,
        districtCode:
          values.districtCode === "0" ? undefined : values.districtCode,
        district:
          values.districtCode === "0"
            ? undefined
            : DISTRICTS.find((district) => district.id === values.districtCode)
                ?.name,
        wardCode: values.wardCode === "0" ? undefined : values.wardCode,
        ward:
          values.wardCode === "0"
            ? undefined
            : WARDS.find((ward) => ward.id === values.wardCode)?.name,
      };
      alert(JSON.stringify([submitValues]));
      dispatchAddNewHospital([submitValues]);
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
                required
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
          <Grid item container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="introduction"
                label="Giới thiệu"
                multiline
                rows={4}
                variant="outlined"
                value={formik.values.introduction}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="service"
                label="Dịch vụ"
                multiline
                rows={4}
                variant="outlined"
                value={formik.values.service}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="department"
                label="Khoa khám bệnh"
                multiline
                rows={4}
                variant="outlined"
                value={formik.values.department}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          {addNewErrMess && (
            <FormHelperText error>{addNewErrMess}</FormHelperText>
          )}
        </Grid>
        <Grid
          item
          container
          justify="flex-end"
          xs={12}
          style={{ marginTop: 12 }}
        >
          <Button type="submit" color="primary">
            Thêm
          </Button>
          <Button onClick={closeDialog} color="secondary">
            Đóng
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default HospitalAddNew;
