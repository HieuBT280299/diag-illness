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
                label="Name"
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
                label="City/Province"
                variant="outlined"
                value={formik.values.cityCode}
                onChange={cityChange}
              >
                <MenuItem value="0">--Select--</MenuItem>
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
                label="District"
                variant="outlined"
                value={formik.values.districtCode}
                onChange={districtChange}
              >
                <MenuItem value="0">--Select--</MenuItem>
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
                label="Ward/Commune"
                variant="outlined"
                value={formik.values.wardCode}
                onChange={formik.handleChange}
              >
                <MenuItem value="0">--Select--</MenuItem>
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
                label="Detailed address"
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
                label="Phone number"
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
                label="Working time"
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
            Submit
          </Button>
          <Button onClick={closeDialog} color="secondary">
            Close
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default HospitalDetailEdit;
