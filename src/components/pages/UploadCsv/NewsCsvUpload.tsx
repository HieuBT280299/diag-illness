import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextareaAutosize,
  makeStyles,
  Typography,
  TableHead,
  Link as MuiLink,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Cell from "../../tables/Cell";
import { mockData } from "../News/NewsList";
import { uploadNewsCsv } from "../../../redux/actions/creators/news";
import { newsCsv } from "../../../shared/constants";
import CustomizedDialog from "../../Dialog";
import { displayTags } from "../News/NewsList.helper";

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

export const Link = styled(MuiLink)`
  &&& {
    cursor: pointer;
  }
`;

const headCells = [
  { id: "entry", numeric: true, disablePadding: false, label: "STT" },
  { id: "id", numeric: false, disablePadding: false, label: "id" },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Tiêu đề",
  },
  { id: "link", numeric: false, disablePadding: false, label: "Đường dẫn" },
  {
    id: "tag",
    numeric: false,
    disablePadding: false,
    label: "Từ khoá liên quan",
  },
];

export const NewsListTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <Cell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </Cell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const NewsCsvUpload = () => {
  const classes = useStyles();
  const [file, setFile] = useState<string | Blob>("");

  const account = useSelector((state: any) => state.loginAccount?.account);
  const uploadedNews: any[] =
    useSelector((state: any) => state.news?.uploadedNews) || [];

  // const uploadedNews = mockData;

  const { uploadErrMess, uploadSuccessMessage } = useSelector(
    (state: any) => state.news
  );

  const dispatch = useDispatch();
  const dispatchUploadNewsCsv = (formData: any) =>
    dispatch(uploadNewsCsv(formData, account.token));

  const handleChange = (event: any) => {
    setFile(event.target.files[0] !== undefined ? event.target.files[0] : "");
  };

  const handleSubmit = (e: any) => {
    if (file !== "") {
      const formData = new FormData();
      formData.append("csvfile", file);
      dispatchUploadNewsCsv(formData);
    } else {
      console.log("null");
    }
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item container xs={12} md={6}>
          <form className={classes.form}>
            <Grid item xs={12}>
              <input
                name="file"
                type="file"
                accept=".csv"
                onChange={handleChange}
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
          <Typography variant="h6">Cấu trúc file CSV mẫu</Typography>
          <Typography variant="body2">
            Lưu đoạn text mẫu dưới đây vào một file bất kì có đuôi .csv, sau đó
            sửa đổi thông tin và tải file lên
          </Typography>
          <TextareaAutosize
            readOnly
            rowsMin={2}
            defaultValue={newsCsv}
            style={{ width: "100%", resize: "none" }}
          />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 36 }}>
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
        {uploadedNews.length > 0 && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <NewsListTableHead />
              <TableBody>
                {uploadedNews.map((row: any, index: number) => {
                  return (
                    <TableRow key={row.id}>
                      <Cell width="5%">{index + 1}</Cell>
                      <Cell width="20%">{row.id}</Cell>
                      <Cell width="25%">{row.title}</Cell>
                      <Cell width="25%">
                        <Link href={row.link}>{row.link}</Link>
                      </Cell>
                      <Cell width="25%">{displayTags(row.tag)}</Cell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </>
  );
};

export default React.memo(NewsCsvUpload);
