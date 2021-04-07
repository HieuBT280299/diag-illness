import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { CITIES, DISTRICTS, WARDS } from "../../../shared/constants/geodata";
import { sortByName } from "../../../shared/helper";

const initialValues = {
  name: "",
  number: "",
  phone: "",
  city: "0",
  district: "0",
  ward: "0",
};

const HospitalSearchForm = () => {
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const cityChange = (e: React.ChangeEvent<any>) => {
    formik.values.district = "0";
    formik.values.ward = "0";
    formik.handleChange(e);
  };

  const districtChange = (e: React.ChangeEvent<any>) => {
    formik.values.ward = "0";
    formik.handleChange(e);
  };

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 12 }}>
        Search for a hospital
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs={12} lg={9}>
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
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                select
                fullWidth
                name="city"
                label="City/Province"
                variant="outlined"
                value={formik.values.city}
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
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                select
                fullWidth
                name="district"
                label="District"
                variant="outlined"
                value={formik.values.district}
                onChange={districtChange}
              >
                <MenuItem value="0">--Select--</MenuItem>
                {DISTRICTS.filter(
                  (district) => district.upperId === formik.values.city
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
                name="ward"
                label="Ward/Commune"
                variant="outlined"
                value={formik.values.ward}
                onChange={formik.handleChange}
              >
                <MenuItem value="0">--Select--</MenuItem>
                {WARDS.filter((ward) => ward.upperId === formik.values.district)
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
                label="Detailed address"
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
                label="Phone number"
                variant="outlined"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 12 }}>
            <Grid item>
              <Button type="submit" color="primary" variant="contained">
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default HospitalSearchForm;
