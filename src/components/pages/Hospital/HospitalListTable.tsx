import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HeaderCell from "../../tables/HeaderCell";
import { Button, Grid, Typography } from "@material-ui/core";
import {
  getFullAddress,
  getFullContact,
  getValueOf,
} from "./HospitalListTable.helper";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { getHospitalList } from "../../../redux/actions/creators/hospital";
import { RoleIDs } from "../../../shared/constants";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});

const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
  {
    id: "workingTime",
    numeric: false,
    disablePadding: false,
    label: "Working time",
  },
  { id: "contact", numeric: false, disablePadding: false, label: "Contact" },
  {
    id: "service",
    numeric: false,
    disablePadding: false,
    label: "Service",
  },
  {
    id: "details",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

const HospitalListTableHead = ({ isAdmin }: any) => {
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

const HospitalListTable = () => {
  const classes = useStyles();

  const account = useSelector((state: any) => state.loginAccount?.account);
  const hospitalList: any[] =
    useSelector((state: any) => state.hospitals?.hospitals) || [];

  const isAdmin = useMemo(() => account.roleId === RoleIDs.ROLE_ADMIN, [
    account,
  ]);

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
      <Grid item xs={12} md={6}>
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
      {isAdmin && (
        <Grid
          item
          container
          xs={12}
          md={6}
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Button color="primary" variant="text">
            Add with CSV
          </Button>
          <Button color="primary" variant="text" style={{ marginLeft: 12 }}>
            Add with Form
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        {hospitalList.length > 0 && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <HospitalListTableHead isAdmin={isAdmin} />
              <TableBody>
                {hospitalList.map((row: any) => {
                  return (
                    <TableRow key={row.id}>
                      <HeaderCell width="20%">
                        {getValueOf(row.name)}
                      </HeaderCell>
                      <HeaderCell width="20%">{getFullAddress(row)}</HeaderCell>
                      <HeaderCell width="10%">
                        {getValueOf(row.workingTime)}
                      </HeaderCell>
                      <HeaderCell width="20%">{getFullContact(row)}</HeaderCell>
                      <HeaderCell width="20%">
                        {getValueOf(row.service)}
                      </HeaderCell>
                      <HeaderCell width="10%">Details</HeaderCell>
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

export default HospitalListTable;
