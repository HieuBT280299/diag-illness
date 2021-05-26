import React from "react";
import {
  Button,
  Grid,
  TextareaAutosize,
  makeStyles,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { useFormik } from "formik";
import { crawlGuide, crawlJson } from "../../../shared/constants";
import { useSelector, useDispatch } from "react-redux";
import { uploadCrawlJson } from "../../../redux/actions/creators/crawl";
import { Alert, AlertTitle } from "@material-ui/lab";
import { toLocalDateAndTime } from "./CrawlDataTable.helper";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    minWidth: 900,
  },
}));

const initialValues = {
  json: "",
};

const CrawlJsonUpload = () => {
  const [showGuide, setShowGuide] = React.useState(false);
  const classes = useStyles();
  const account = useSelector((state: any) => state.loginAccount?.account);
  const crawl = useSelector((state: any) => state.crawl);
  const dispatch = useDispatch();
  const dispatchUploadCrawlJson = (jsonData: any) =>
    dispatch(uploadCrawlJson(account?.id, jsonData, account?.token));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const minifiedJson = values.json
        .replaceAll("\n", "")
        .replaceAll(/ /g, "");
      const submitValues = JSON.parse(minifiedJson);
      console.log(JSON.stringify(submitValues));
      dispatchUploadCrawlJson(submitValues);
    },
  });

  return (
    <>
      <Grid container spacing={6}>
        <Grid item container xs={12} md={6}>
          <form
            className={classes.form}
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
          >
            <Typography variant="h6">
              Nhập đoạn JSON bạn muốn upload vào đây
            </Typography>
            <Grid item xs={12}>
              <TextareaAutosize
                name="json"
                value={formik.values.json}
                onChange={formik.handleChange}
                rowsMin={4}
                style={{ width: "100%", resize: "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <span style={{ color: "red" }}>{crawl.uploadErrMess}</span>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Tải lên
              </Button>
            </Grid>
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Cấu trúc JSON mẫu</Typography>
          <TextareaAutosize
            readOnly
            rowsMin={4}
            defaultValue={crawlJson}
            style={{ width: "100%", resize: "none" }}
          />
        </Grid>

        <Grid container spacing={6} justify="flex-end">
          <Grid item xs={12} md={6}>
            {showGuide ? (
              <Typography variant="h6">Giải thích</Typography>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setShowGuide(true)}
              >
                Giải thích
              </Button>
            )}
            {showGuide && (
              <TextareaAutosize
                readOnly
                rowsMin={4}
                defaultValue={crawlGuide}
                style={{ width: "100%", resize: "none" }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={Boolean(crawl.uploadSuccessMessage)}
        // onClose={handleSnackbarClose}
      >
        <Alert
          variant="filled"
          // onClose={handleSnackbarClose}
          severity="success"
        >
          <AlertTitle>Thành công</AlertTitle>
          {`Upload JSON thành công lúc ${toLocalDateAndTime(crawl.uploadTime)}`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default React.memo(CrawlJsonUpload);
