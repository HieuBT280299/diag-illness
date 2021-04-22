import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HeaderCell from "../../tables/HeaderCell";
import { Button, Grid, Link, Typography } from "@material-ui/core";
import {
  getGenderValue,
  getRoleValue,
  getValueOf,
  toLocalDate,
  toLocalDateAndTime,
} from "./ManageAccountTable.helper";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { getUserList } from "../../../redux/actions/creators/user";
import CustomizedDialog from "../../Dialog";
import AccountDetailContent from "./AccountDetailContent";
import ConfirmDialog from "../../ConfirmDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});

const headCells = [
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "gender", numeric: false, disablePadding: false, label: "Gender" },
  {
    id: "dateOfBirth",
    numeric: false,
    disablePadding: false,
    label: "Date of birth",
  },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "createAt",
    numeric: false,
    disablePadding: false,
    label: "Created",
  },
  {
    id: "modifyAt",
    numeric: false,
    disablePadding: false,
    label: "Last modified",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

const ManageAccountTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <HeaderCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </HeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const ManageAccountTable = () => {
  const classes = useStyles();

  const account = useSelector((state: any) => state.loginAccount?.account);
  const userList: any[] = useSelector((state: any) => state.users?.users) || [];

  const [selectedRow, setSelectedRow] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };
  const toggleConfirmDialog = () => {
    setConfirmDialogOpen(!confirmDialogOpen);
  };
  const detailsButtonClicked = (row: any) => {
    console.log("view");
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const {
    totalPages,
    totalEntries,
    currentPage,
    pageSize,
    searchData,
  } = useSelector((state: any) => state.users);

  const dispatch = useDispatch();
  const dispatchUserList = (paginationData: any) =>
    dispatch(getUserList(searchData, paginationData, account.token));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // console.log(value);
    const paginationData = { page: value, size: pageSize };
    dispatchUserList(paginationData);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {totalEntries > 0 && (
          <Typography variant="h6" style={{ marginBottom: 12 }}>
            Number of entries: {totalEntries || 0}
          </Typography>
        )}

        {totalEntries === 0 && searchData !== null && (
          <Typography variant="h6" style={{ marginBottom: 12 }}>
            No data matches your search
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        {userList.length > 0 && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <ManageAccountTableHead />
              <TableBody>
                {userList.map((row: any) => {
                  return (
                    <>
                      <TableRow key={row.id}>
                        <HeaderCell width="15%">
                          {getValueOf(row.email)}
                        </HeaderCell>
                        <HeaderCell width="10%">
                          {getValueOf(row.name)}
                        </HeaderCell>
                        <HeaderCell width="5%">
                          {getGenderValue(row.gender)}
                        </HeaderCell>
                        <HeaderCell width="10%">
                          {toLocalDate(row.dateOfBirth)}
                        </HeaderCell>
                        <HeaderCell width="15%">
                          {getValueOf(row.address)}
                        </HeaderCell>
                        <HeaderCell width="5%">
                          {getRoleValue(row.roleId)}
                        </HeaderCell>
                        <HeaderCell width="10%">
                          {toLocalDateAndTime(row.createAt)}
                        </HeaderCell>
                        <HeaderCell width="10%">
                          {toLocalDateAndTime(row.modifyAt)}
                        </HeaderCell>
                        <HeaderCell width="10%">
                          <Link
                            style={{ cursor: "pointer" }}
                            onClick={() => detailsButtonClicked(row)}
                          >
                            Details
                          </Link>
                        </HeaderCell>
                      </TableRow>
                    </>
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
        title="User account details"
        content={<AccountDetailContent row={selectedRow} />}
        actions={
          <>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 8 }}
              onClick={() => setConfirmDialogOpen(true)}
            >
              Promote
            </Button>
            <Button autoFocus onClick={toggleDialog} color="secondary">
              Close
            </Button>
          </>
        }
        toggleDialog={toggleDialog}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        toggleDialog={toggleConfirmDialog}
        content={<div>Are you sure to promote this account to admin?</div>}
      />
    </Grid>
  );
};

export default ManageAccountTable;
