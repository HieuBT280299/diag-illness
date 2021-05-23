import React from "react";
import {
  Button,
  Grid,
  TextareaAutosize,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { crawlJson } from "../../../shared/constants";

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

const CrawlJsonUpload = () => {
  const classes = useStyles();
  //   const [file, setFile] = useState<string | Blob>("");

  //   const account = useSelector((state: any) => state.loginAccount?.account);
  //   const uploadedNews: any[] =
  //     useSelector((state: any) => state.news?.uploadedNews) || [];

  //   const { uploadErrMess, uploadSuccessMessage } = useSelector(
  //     (state: any) => state.news
  //   );

  //   const dispatch = useDispatch();
  //   const dispatchUploadCrawlJson = (formData: any) =>
  //     dispatch(uploadCrawlJson(formData, account.token));

  const handleSubmit = (e: any) => {
    // if (file !== "") {
    //   const formData = new FormData();
    //   formData.append("csvfile", file);
    //   dispatchUploadCrawlJson(formData);
    // } else {
    //   console.log("null");
    // }
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item container xs={12} md={6}>
          <form className={classes.form}>
            <Typography variant="h6">
              Nhập đoạn JSON bạn muốn upload vào đây
            </Typography>
            <Grid item xs={12}>
              <TextareaAutosize
                rowsMin={4}
                style={{ width: "100%", resize: "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
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
      </Grid>
      {/* <Grid container style={{ marginTop: 36 }}>
        {uploadErrMess && (
          <Typography
            variant="subtitle2"
            style={{ marginBottom: 12, color: "red" }}
          >
            {uploadErrMess}
          </Typography>
        )}
        {uploadSuccessMessage && (
          <Typography
            variant="subtitle2"
            style={{ marginBottom: 12, color: "green" }}
          >
            {uploadSuccessMessage}
          </Typography>
        )}
      </Grid> */}
    </>
  );
};

export default React.memo(CrawlJsonUpload);
