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

const Link = styled(MuiLink)`
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

const HospitalListTableHead = ({ isAdmin }: any) => {
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

type HospitalDialogType = "close" | "edit" | "view";

const mockData = [
  {
    id: "El_3AXkBZLAYSuhR5ttX",
    name: "Bảo Hà Spa - CS3",
    number: "109/6 Nguyễn Bỉnh Khiêm,",
    ward: "Phường Đa Kao",
    district: "Quận 1",
    city: ", Hồ Chí Minh",
    workingTime: "T2,T3,T4,T5,T6,T7,CN: 09:00 - 18:00",
    phone: "",
    website: "http://baohaspa.vn",
    introduction:
      " Bảo Hà Spa luôn làm việc bằng cả tấm lòng yêu thương, đồng cảm với khách hàng, bởi Bảo Hà Spa thấu hiểu cơ thể và tâm trãng mẹ bầu đang ở trạng thái vô cùng nhạy cảm. Sự chu đáo trong từng thao tác của Bảo Hà Spa giúp mẹ bầu luôn cảm thấy an toàn và thoải mái nhất.  Tại Bảo Hà Spa 100% chuyên viên có kỹ thuật chuyên môn cao, được đào tạo bài bản, chuyên nghiệp, được kiểm tra trình độ định kỳ và thường xuyên được nâng cao tay nghề bằng các khóa học cập nhất những kiến thức tiên tiến nhất.  Cá gói dịch vụ của Bảo Hà Spa được thiết kế dựa trên những nghiên cứu kỹ lưỡng về các gia đoạn phát triển thai kỳ, sự thay đổi của cơ thể mẹ, cấu trúc đặc điểm của các nhóm da và cơ. Trên cơ sở đó, các bác sĩ và chuyên gia đầu nghành nhi khoa, sản khoa và da liễu đã cùng Bảo Hà Spa xây dựng nên những gói dịch vụ chăm sóc phù hợp cho từng giai đoạn.  Các quy trình liệu pháp của Bảo Hà Spa còn có tác động tích cực đến thai nhi. Không những tuyệt đối an toàn cho bé, các bước chăm sóc mẹ cũng giúp bé tận hưởng được cảm giác thư giãn thoải mái, để bé đạt được mức phát triển cao nhất.  Ngay từ đầu Bảo Hà Spa đã lựa chọn đi theo dòng sản phẩm thiên nhiên thuần khiết với thành phần 100% là các thảo dược tự nhiên, được chọn lọc kỹ lưỡng và kiểm soát chặt chẽ về chất lượng, giúp phục hồi, duy trì và nuôi dưỡng sắc đẹp, để mẹ bầu và mẹ sau sinh luôn tự tin tỏa sáng.",
    service: null,
    department: "Khoa Da Liễu, Nhi Khoa, Sản Khoa",
  },
];

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
  // const hospitalList: any[] =
  //   useSelector((state: any) => state.hospitals?.hospitals) || [];
  const hospitalList = mockData;

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
              <HospitalListTableHead isAdmin={isAdmin} />
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
