import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Cell from "../../tables/Cell";
import { Button, Grid, Link as MuiLink, Typography } from "@material-ui/core";
import {
  getFullAddress,
  getFullContact,
  getValueOf,
} from "./HospitalListTable.helper";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import {
  getHospitalList,
  deleteHospitals,
} from "../../../redux/actions/creators/hospital";
import { RoleIDs } from "../../../shared/constants";
import styled from "styled-components";
import HospitalDetailContent from "./HospitalDetailContent";
import HospitalDetailEdit from "./HospitalDetailEdit";
import ConfirmDialog from "../../ConfirmDialog";
import CustomizedDialog from "../../Dialog";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});

export const Link = styled(MuiLink)`
  &&& {
    cursor: pointer;
  }
`;

const headCells = [
  { id: "entry", numeric: true, disablePadding: false, label: "STT" },
  { id: "name", numeric: false, disablePadding: false, label: "Tên bệnh viện" },
  { id: "address", numeric: false, disablePadding: false, label: "Địa chỉ" },
  {
    id: "workingTime",
    numeric: false,
    disablePadding: false,
    label: "Giờ làm việc",
  },
  { id: "contact", numeric: false, disablePadding: false, label: "Liên hệ" },
  {
    id: "service",
    numeric: false,
    disablePadding: false,
    label: "Dịch vụ",
  },
  {
    id: "details",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

export const HospitalListTableHead = () => {
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

export type HospitalDialogType = "close" | "edit" | "view";

const HospitalListTable = () => {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [dialogOpen, setDialogOpen] = useState<HospitalDialogType>("close");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const closeDialog = () => {
    setDialogOpen("close");
  };
  const toggleConfirmDialog = () => {
    setConfirmDialogOpen(!confirmDialogOpen);
  };
  const detailsButtonClicked = (row: any) => {
    setSelectedRow(row);
    setDialogOpen("view");
  };
  const editButtonClicked = (row: any) => {
    setSelectedRow(row);
    setDialogOpen("edit");
  };

  const deleteButtonClicked = (row: any) => {
    setSelectedRow(row);
    setConfirmDialogOpen(true);
  };

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
    type,
  } = useSelector((state: any) => state.hospitals);

  const dispatch = useDispatch();

  const dispatchHospitalList = (paginationData: any) =>
    dispatch(getHospitalList(type, searchData, paginationData, account.token));
  const dispatchDeleteHospitals = (deletedRecords: string[]) => {
    const data = {
      ids: deletedRecords,
    };
    dispatch(deleteHospitals(data, account.token));
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);
    const paginationData = { page: value, size: pageSize };
    dispatchHospitalList(paginationData);
  };

  return (
    <Grid container>
      <Grid item container xs={12} md={6} direction="row" alignItems="center">
        {totalEntries > 0 && (
          <Typography variant="subtitle2" style={{ marginBottom: 12 }}>
            Số kết quả tìm được: {totalEntries || 0}
          </Typography>
        )}

        {totalEntries === 0 && searchData !== null && (
          <Typography variant="subtitle2" style={{ marginBottom: 12 }}>
            Không tìm được kết quả nào
          </Typography>
        )}
      </Grid>

      <Grid item xs={12}>
        {hospitalList.length > 0 && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <HospitalListTableHead />
              <TableBody>
                {hospitalList.map((row: any, index: number) => {
                  return (
                    <TableRow key={row.id}>
                      <Cell width="5%">
                        {(currentPage - 1) * pageSize + index + 1}
                      </Cell>
                      <Cell width="20%">{getValueOf(row.name)}</Cell>
                      <Cell width="15%">{getFullAddress(row)}</Cell>
                      <Cell width="10%">{getValueOf(row.workingTime)}</Cell>
                      <Cell width="20%">{getFullContact(row)}</Cell>
                      <Cell width="20%">{getValueOf(row.service)}</Cell>
                      <Cell width="10%">
                        <Link onClick={() => detailsButtonClicked(row)}>
                          Chi tiết
                        </Link>
                        {isAdmin && (
                          <span>
                            {` | `}
                            {
                              <Link onClick={() => editButtonClicked(row)}>
                                Sửa
                              </Link>
                            }
                            {` | `}
                            {
                              <Link onClick={() => deleteButtonClicked(row)}>
                                Xoá
                              </Link>
                            }
                          </span>
                        )}
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
        open={dialogOpen === "view"}
        title="Chi tiết bệnh viện"
        content={<HospitalDetailContent row={selectedRow} isAdmin={isAdmin} />}
        actions={
          <>
            <Button onClick={closeDialog} color="secondary">
              Đóng
            </Button>
          </>
        }
        toggleDialog={closeDialog}
      />
      <CustomizedDialog
        open={dialogOpen === "edit"}
        title="Sửa thông tin bệnh viện"
        content={
          <HospitalDetailEdit row={selectedRow} closeDialog={closeDialog} />
        }
        toggleDialog={closeDialog}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        toggleDialog={toggleConfirmDialog}
        content={<div>Bạn có chắc chắn muốn xoá?</div>}
        onYesButtonClicked={() =>
          dispatchDeleteHospitals([`${selectedRow.id}`])
        }
        onNoButtonClicked={toggleConfirmDialog}
      />
    </Grid>
  );
};

export default HospitalListTable;
