import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { editNews } from "../../../redux/actions/creators/news";
import { getTagArray } from "./NewsList.helper";

const DisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.87)", // (default alpha is 0.38)
    },
  },
})(TextField);

const NewsDetailEdit = ({ row, closeDialog }: any) => {
  const account = useSelector((state: any) => state.loginAccount?.account);
  const { editErrMess } = useSelector((state: any) => state.news);
  const dispatch = useDispatch();
  const dispatchEditNews = (data: any) =>
    dispatch(editNews(data, account.token, closeDialog));
  const initialValues = row;
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const { id, tag } = values;
      const tags = getTagArray(tag);
      const submitValues = { id, tag: tags };
      // alert(JSON.stringify(submitValues));
      dispatchEditNews(submitValues);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs={12}>
              <Tooltip title="Bạn không thể sửa tiêu đề bài báo">
                <DisabledTextField
                  fullWidth
                  name="title"
                  label="Tiêu đề"
                  variant="outlined"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  disabled
                />
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <Tooltip title="Bạn không thể sửa đường dẫn bài báo">
                <DisabledTextField
                  fullWidth
                  name="link"
                  label="Đường dẫn"
                  variant="outlined"
                  value={formik.values.link}
                  onChange={formik.handleChange}
                  disabled
                />
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <Tooltip title="Các từ khoá được phân cách với nhau bằng dấu phẩy (,)">
                <TextField
                  fullWidth
                  name="tag"
                  label="Từ khoá liên quan"
                  variant="outlined"
                  value={formik.values.tag}
                  onChange={formik.handleChange}
                />
              </Tooltip>
            </Grid>
          </Grid>

          {editErrMess && <FormHelperText error>{editErrMess}</FormHelperText>}
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

export default NewsDetailEdit;
