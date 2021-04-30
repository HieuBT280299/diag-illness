import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../redux/actions/creators/user";

export type AccountSearchFields = {
  email?: string;
  name?: string;
  dateOfBirth?: string;
  gender?: 1 | 0 | "Any";
};

const initialValues: AccountSearchFields = {
  name: "",
  email: "",
  dateOfBirth: "",
  gender: "Any",
};

const ManageAccountSearchForm = () => {
  const { pageSize } = useSelector((state: any) => state.users);
  const account = useSelector((state: any) => state.loginAccount?.account);

  const paginationData = { page: 1, size: pageSize };
  const dispatch = useDispatch();
  const dispatchUserList = (searchData: any) =>
    dispatch(getUserList(searchData, paginationData, account.token));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const submitValues = {
        ...values,
        gender: values.gender === "Any" ? null : values.gender,
        dateOfBirth: values.dateOfBirth
          ? new Date(values.dateOfBirth).toISOString()
          : null,
      };
      console.log(submitValues);
      dispatchUserList(submitValues);
    },
  });

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 12 }}>
        Tìm kiếm tài khoản
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
            <Grid item xs={12} md={5} lg={4}>
              <TextField
                select
                fullWidth
                name="gender"
                label="Giới tính"
                variant="outlined"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <MenuItem value="Any">Mọi giới tính</MenuItem>
                <MenuItem value={0}>Nam</MenuItem>
                <MenuItem value={1}>Nữ</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={7} lg={5}>
              <TextField
                variant="outlined"
                id="dateOfBirth"
                name="dateOfBirth"
                label="Ngày sinh"
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
                label="Email"
                variant="outlined"
                value={formik.values.email}
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
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ManageAccountSearchForm;
