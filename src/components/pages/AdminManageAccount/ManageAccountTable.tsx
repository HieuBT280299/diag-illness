import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HeaderCell from "../../tables/HeaderCell";
import { Grid, Typography } from "@material-ui/core";
import {
  getGenderValue,
  getRoleValue,
  getValueOf,
  toLocalDate,
  toLocalDateAndTime,
} from "./ManageAccountTable.helper";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { getHospitalList } from "../../../redux/actions/creators/hospital";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});

const mockData = [
  {
    id: 8,
    createAt: "2021-04-05T13:58:12.000+0000",
    modifyAt: "2021-04-05T14:43:55.000+0000",
    email: "ngattaro@gmail.com",
    password: "$2a$10$UkHDQbzof/2YN1E2BJKmEOaZ7ayGxMfxp1CRXhvepYdz6s0RPZwHC",
    name: "Do Thi Hong Ngat",
    dateOfBirth: "1999-03-03T23:45:58.000+0000",
    gender: 1,
    address: null,
    roleId: 2,
    enabled: 1,
    lastAccess: "2021-04-10T01:37:30.000+0000",
  },
  {
    id: 9,
    createAt: "2021-04-05T14:45:39.000+0000",
    modifyAt: null,
    email: "ngattar1q@gmail.com",
    password: "$2a$10$QZA2oGTQ6JHoLaGJDr/ka.fuGW2qNzYgC.YYfGka08p0ix3ZB7JWS",
    name: "Do Thi Hong Ngat",
    dateOfBirth: "1999-03-03T23:45:58.000+0000",
    gender: 1,
    address: null,
    roleId: 1,
    enabled: 0,
    lastAccess: null,
  },
];

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
  // const hospitalList: any[] =
  //   useSelector((state: any) => state.hospitals?.hospitals) || [];

  const accountList = mockData;

  const {
    totalPages,
    totalEntries,
    currentPage,
    pageSize,
    searchData,
  } = useSelector((state: any) => state.hospitals);

  const dispatch = useDispatch();
  const dispatchHospitalList = (paginationData: any) =>
    dispatch(getHospitalList(searchData, paginationData, account.token));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);
    const paginationData = { page: value, size: pageSize };
    dispatchHospitalList(paginationData);
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
        {accountList.length > 0 && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <ManageAccountTableHead />
              <TableBody>
                {accountList.map((row: any) => {
                  return (
                    <TableRow key={row.id}>
                      <HeaderCell width="20%">
                        {getValueOf(row.email)}
                      </HeaderCell>
                      <HeaderCell width="15%">
                        {getValueOf(row.name)}
                      </HeaderCell>
                      <HeaderCell width="10%">
                        {getGenderValue(row.gender)}
                      </HeaderCell>
                      <HeaderCell width="15%">
                        {toLocalDate(row.dateOfBirth)}
                      </HeaderCell>
                      <HeaderCell width="20%">
                        {getValueOf(row.address)}
                      </HeaderCell>
                      <HeaderCell width="10%">
                        {getRoleValue(row.roleId)}
                      </HeaderCell>
                      <HeaderCell width="15%">
                        {toLocalDateAndTime(row.createAt)}
                      </HeaderCell>
                      <HeaderCell width="15%">
                        {toLocalDateAndTime(row.modifyAt)}
                      </HeaderCell>
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
    </Grid>
  );
};

export default ManageAccountTable;
