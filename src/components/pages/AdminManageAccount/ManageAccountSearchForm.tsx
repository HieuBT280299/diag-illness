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
import { sortByName } from "../../../shared/helper";

export type AccountSearchFields = {
  email?: string;
  name?: string;
  dateOfBirth?: Date;
  gender?: 1 | 0 | "Any";
};

const initialValues: AccountSearchFields = {
  name: "",
  email: "",
  gender: "Any",
};

const ManageAccountSearchForm = () => {
  const { pageSize } = useSelector((state: any) => state.hospitals);
  const account = useSelector((state: any) => state.loginAccount?.account);

  const paginationData = { page: 1, size: pageSize };
  const dispatch = useDispatch();
  const dispatchHospitalList = (searchData: any) =>
    dispatch(getHospitalList(searchData, paginationData, account.token));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const submitValues = {
        ...values,
        gender: values.gender === "Any" ? null : values.gender,
        dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth) : null,
      };
      console.log(submitValues);
      // dispatchHospitalList(submitValues);
    },
  });

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 12 }}>
        Search account
      </Typography>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
            <Grid item xs={12} md={5} lg={4}>
              <TextField
                select
                fullWidth
                name="gender"
                label="Gender"
                variant="outlined"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={7} lg={5}>
              <TextField
                variant="outlined"
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date of birth"
                type="date"
                fullWidth
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid item container></Grid>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                name="email"
                label="Email address"
                variant="outlined"
                value={formik.values.email}
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
                Reset Form
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ManageAccountSearchForm;
