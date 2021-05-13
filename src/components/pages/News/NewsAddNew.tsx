import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addNewNews } from "../../../redux/actions/creators/news";
import { getTagArray } from "./NewsList.helper";

const initialValues = {
  title: "",
  link: "",
  body: "",
  tag: "",
};

const NewsAddNew = ({ closeDialog }: any) => {
  const account = useSelector((state: any) => state.loginAccount?.account);
  const { addNewErrMess } = useSelector((state: any) => state.news);
  const dispatch = useDispatch();
  const dispatchAddNewNews = (data: any) =>
    dispatch(addNewNews(data, account.token, closeDialog));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const { tag, ...rest } = values;
      const tags = getTagArray(tag);
      const submitValues = { tag: tags, ...rest };
      // alert(JSON.stringify(submitValues));
      dispatchAddNewNews(submitValues);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                label="Tiêu đề"
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="link"
                label="Đường dẫn"
                variant="outlined"
                value={formik.values.link}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={8}
                name="body"
                label="Nội dung"
                variant="outlined"
                value={formik.values.link}
                onChange={formik.handleChange}
              />
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

export default NewsAddNew;
