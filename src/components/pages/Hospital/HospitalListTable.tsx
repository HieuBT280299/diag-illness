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

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

const headCells = [
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone number" },
];

const HospitalListTableHead = () => {
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

const rows = [
  { id: "1", name: "Hospital 1", address: "Hanoi", phone: "040400404" },
];

const HospitalListTable = () => {
  const classes = useStyles();
  const getValueOf = (str: string) => {
    return str;
  };
  return (
    <Grid container style={{ margin: 12 }}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ marginBottom: 12 }}>
          Number of entries: 10
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <HospitalListTableHead />
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow>
                    <HeaderCell width="5%" align="right">
                      {getValueOf(row.id)}
                    </HeaderCell>
                    <HeaderCell width="15%">{getValueOf(row.name)}</HeaderCell>
                    <HeaderCell width="15%">
                      {getValueOf(row.address)}
                    </HeaderCell>
                    <HeaderCell width="15%">{getValueOf(row.phone)}</HeaderCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
      </Grid>
    </Grid>
  );
};

export default HospitalListTable;
