import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Cell from "../../tables/Cell";
import { Button, Grid, Link, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { getCrawlList } from "../../../redux/actions/creators/crawl";
import {
  getValueOf,
  getStatusValue,
  toLocalDateAndTime,
} from "./CrawlDataTable.helper";
import CustomizedDialog from "../../Dialog";
import CrawlDataContent from "./CrawlDataContent";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});

const headCells = [
  { id: "entry", numeric: true, disablePadding: false, label: "STT" },
  {
    id: "createAt",
    numeric: false,
    disablePadding: false,
    label: "Được tạo lúc",
  },
  {
    id: "prefixUrl",
    numeric: false,
    disablePadding: false,
    label: "Prefix URL",
  },
  { id: "startUrl", numeric: false, disablePadding: false, label: "Start URL" },
  {
    id: "patternUrl",
    numeric: false,
    disablePadding: false,
    label: "Pattern URL",
  },
  {
    id: "elasticsearchIndex",
    numeric: false,
    disablePadding: false,
    label: "Elasticsearch Index",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

const CrawlDataTableHead = () => {
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

const CrawlDataTable = () => {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = React.useState<any>({});
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };
  const detailsButtonClicked = (row: any) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const account = useSelector((state: any) => state.loginAccount?.account);
  const crawlList: any[] =
    useSelector((state: any) => state.crawl?.crawl) || [];

  const {
    totalPages,
    totalEntries,
    currentPage,
    pageSize,
    searchData,
    successMessage,
  } = useSelector((state: any) => state.crawl);

  const dispatch = useDispatch();
  const dispatchCrawlList = (paginationData: any) =>
    dispatch(getCrawlList(searchData, paginationData, account.token));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const paginationData = { page: value, size: pageSize };
    dispatchCrawlList(paginationData);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {successMessage && (
          <Typography
            variant="subtitle2"
            style={{ marginBottom: 12, color: "green" }}
          >
            {successMessage}
          </Typography>
        )}

        {totalEntries > 0 && (
          <Typography variant="subtitle2" style={{ marginBottom: 12 }}>
            Số kết quả tìm được: {totalEntries || 0}
          </Typography>
        )}

        {totalEntries === 0 && searchData && (
          <Typography variant="subtitle2" style={{ marginBottom: 12 }}>
            Không tìm được kết quả nào
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        {crawlList.length > 0 && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <CrawlDataTableHead />
              <TableBody>
                {crawlList.map((row: any, index: number) => {
                  return (
                    <TableRow key={row.id}>
                      <Cell width="5%">
                        {(currentPage - 1) * pageSize + index + 1}
                      </Cell>
                      <Cell width="15%">
                        {toLocalDateAndTime(row.createAt)}
                      </Cell>
                      <Cell width="10%">{getValueOf(row.prefixUrl)}</Cell>
                      <Cell width="10%">{getValueOf(row.startUrl)}</Cell>
                      <Cell width="15%">{getValueOf(row.patternUrl)}</Cell>
                      <Cell width="15%">
                        {getValueOf(row.elasticsearchIndex)}
                      </Cell>
                      <Cell width="20%">
                        {getStatusValue(row.finishAt)}
                        <br />
                        {row.finishAt &&
                          `Thời gian: ${toLocalDateAndTime(row.finishAt)}`}
                      </Cell>
                      <Cell width="10%">
                        <Link
                          style={{ cursor: "pointer", color: "#007bff" }}
                          onClick={() => detailsButtonClicked(row)}
                        >
                          Chi tiết
                        </Link>
                      </Cell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      <Grid item xs={12} style={{ marginTop: 12 }}>
        {totalEntries > 0 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
          />
        )}
      </Grid>
      <CustomizedDialog
        open={dialogOpen}
        title="Chi tiết"
        content={<CrawlDataContent row={selectedRow} />}
        actions={
          <Button onClick={toggleDialog} color="secondary">
            Đóng
          </Button>
        }
        toggleDialog={toggleDialog}
      />
    </Grid>
  );
};

export default CrawlDataTable;
