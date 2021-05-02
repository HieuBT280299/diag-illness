import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Cell from "../../tables/Cell";
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
import {
  getUserList,
  postPromoteUser,
} from "../../../redux/actions/creators/user";
import CustomizedDialog from "../../Dialog";
import AccountDetailContent from "./AccountDetailContent";
import ConfirmDialog from "../../ConfirmDialog";
import { RoleIDs } from "../../../shared/constants";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});

const headCells = [
  { id: "entry", numeric: true, disablePadding: false, label: "STT" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "name", numeric: false, disablePadding: false, label: "Họ và tên" },
  { id: "gender", numeric: false, disablePadding: false, label: "Giới tính" },
  {
    id: "dateOfBirth",
    numeric: false,
    disablePadding: false,
    label: "Ngày sinh",
  },
  { id: "address", numeric: false, disablePadding: false, label: "Địa chỉ" },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Loại tài khoản",
  },
  {
    id: "createAt",
    numeric: false,
    disablePadding: false,
    label: "Ngày tạo",
  },
  {
    id: "lastAccess",
    numeric: false,
    disablePadding: false,
    label: "Đăng nhập lần cuối",
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

const ManageAccountTable = () => {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };
  const toggleConfirmDialog = () => {
    setConfirmDialogOpen(!confirmDialogOpen);
  };
  const detailsButtonClicked = (row: any) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const account = useSelector((state: any) => state.loginAccount?.account);
  const userList: any[] = useSelector((state: any) => state.users?.users) || [];

  const {
    totalPages,
    totalEntries,
    currentPage,
    pageSize,
    searchData,
    successMessage,
  } = useSelector((state: any) => state.users);

  const dispatch = useDispatch();
  const dispatchUserList = (paginationData: any) =>
    dispatch(getUserList(searchData, paginationData, account.token));

  const dispatchPostPromoteUser = (email: string) =>
    dispatch(postPromoteUser(email, account.token));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const paginationData = { page: value, size: pageSize };
    dispatchUserList(paginationData);
  };

  const handlePromoteUser = async () => {
    await dispatchPostPromoteUser(selectedRow.email);
    await setConfirmDialogOpen(false);
    await setDialogOpen(false);
    const paginationData = { page: currentPage, size: pageSize };
    await dispatchUserList(paginationData);
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
        {userList.length > 0 && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <ManageAccountTableHead />
              <TableBody>
                {userList.map((row: any, index: number) => {
                  return (
                    <TableRow key={row.id}>
                      <Cell width="5%">
                        {(currentPage - 1) * pageSize + index + 1}
                      </Cell>
                      <Cell width="10%">{getValueOf(row.email)}</Cell>
                      <Cell width="15%">{getValueOf(row.name)}</Cell>
                      <Cell width="10%">{getGenderValue(row.gender)}</Cell>
                      <Cell width="10%">{toLocalDate(row.dateOfBirth)}</Cell>
                      <Cell width="10%">{getValueOf(row.address)}</Cell>
                      <Cell width="10%">{getRoleValue(row.roleId)}</Cell>
                      <Cell width="10%">
                        {toLocalDateAndTime(row.createAt)}
                      </Cell>
                      <Cell width="10%">
                        {toLocalDateAndTime(row.lastAccess)}
                      </Cell>
                      <Cell width="10%">
                        <Link
                          style={{ cursor: "pointer" }}
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
        title="Chi tiết tài khoản"
        content={<AccountDetailContent row={selectedRow} />}
        actions={
          <>
            {selectedRow.roleId && selectedRow.roleId !== RoleIDs.ROLE_ADMIN && (
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 8 }}
                onClick={() => setConfirmDialogOpen(true)}
              >
                Cấp quyền quản trị
              </Button>
            )}
            <Button onClick={toggleDialog} color="secondary">
              Đóng
            </Button>
          </>
        }
        toggleDialog={toggleDialog}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        toggleDialog={toggleConfirmDialog}
        content={
          <div>Bạn có chắc muốn cấp quyền quản trị cho tài khoản này?</div>
        }
        onYesButtonClicked={handlePromoteUser}
        onNoButtonClicked={toggleConfirmDialog}
      />
    </Grid>
  );
};

export default ManageAccountTable;
