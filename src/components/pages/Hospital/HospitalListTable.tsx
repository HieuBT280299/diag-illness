import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HeaderCell from "../../tables/HeaderCell";
import { Button, Grid, Link as MuiLink, Typography } from "@material-ui/core";
import {
  getFullAddress,
  getFullContact,
  getValueOf,
} from "./HospitalListTable.helper";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { getHospitalList } from "../../../redux/actions/creators/hospital";
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

const Link = styled(MuiLink)`
  &&& {
    cursor: pointer;
  }
`;

const headCells = [
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

type HospitalDialogType = "close" | "edit" | "view";

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
      {isAdmin && (
        <Grid item container xs={12} md={6}>
          <Button color="primary" variant="text">
            Thêm bằng file CSV
          </Button>
          <Button color="primary" variant="text" style={{ marginLeft: 12 }}>
            Thêm bằng form
          </Button>
        </Grid>
      )}

      <Grid
        item
        container
        xs={12}
        md={6}
        direction="row"
        justify={isAdmin ? "flex-end" : "flex-start"}
        alignItems="center"
      >
        {totalEntries > 0 && (
          <Typography variant="h6" style={{ marginBottom: 12 }}>
            Số kết quả tìm được: {totalEntries || 0}
          </Typography>
        )}

        {totalEntries === 0 && searchData !== null && (
          <Typography variant="h6" style={{ marginBottom: 12 }}>
            Không tìm được kết quả nào
          </Typography>
        )}
      </Grid>

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
                      <HeaderCell width="10%">
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
        onYesButtonClicked={() => console.log(`delete id=${selectedRow.id}`)}
        onNoButtonClicked={toggleConfirmDialog}
      />
    </Grid>
  );
};

export default HospitalListTable;
