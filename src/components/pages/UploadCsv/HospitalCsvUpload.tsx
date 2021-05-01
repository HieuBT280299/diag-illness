import {
  Button,
  Grid,
  TextareaAutosize,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Cell from "../../tables/Cell";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFullAddress,
  getFullContact,
  getValueOf,
} from "../Hospital/HospitalListTable.helper";
import {
  HospitalDialogType,
  Link,
  HospitalListTableHead,
} from "../Hospital/HospitalListTable";
import { uploadHospitalCsv } from "../../../redux/actions/creators/hospital";
import { hospitalCsv } from "../../../shared/constants";
import CustomizedDialog from "../../Dialog";
import HospitalDetailContent from "../Hospital/HospitalDetailContent";

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

const mockData = [
  {
    city: " Hồ Chí Minh",
    department: "Khoa Da Liễu, Khoa Ngoại Chỉnh Hình",
    district: "Quận 1",
    id: "5GAeD3kBZLAYSuhRNjIY",
    introduction:
      "Calla Lily Spa & Clinic được thiết kế tinh tế, gần gũi thiên nhiên, kết hợp với hương tinh dầu tự nhiên sẽ giúp quý khách xua tan đi những căn thẳng, mệt mỏi hằng ngày. Calla Lily Spa & Clinic chọn lọc những dòng mỹ phẩm cao cấp và chuyên nghiệp nhất trên thị trường hiện nay đến từ các nước như Úc, Mỹ, Pháp, Hàn, Nhật… với mong muốn đem lại cho quý khách làn da khỏe đẹp tối ưu. Đội ngũ nhân viên giàu kinh nghiệm, vững chuyên môn, được đào tạo bởi các chuyên gia thẩm mỹ trong và ngoài nước, chắc chắn mang lại cho quý khách chất lượng phục vụ tốt nhất.",
    name: "Calla Lily Spa & Clinic - CS1",
    number: "150/25 Nguyễn Trã",
    phone: "028.3610.0167",
    service:
      "Chăm sóc da mặt, Body massage, Wax, Tắm trắng, Nối mi Hàn Quốc, Chăm sóc mắt, Liệu trình làm ốm bụng, Tắm tẩy tế bào chết & Ủ mịn da, Triệt lông vĩnh viễn không đau",
    ward: "Phường Bến Thành",
    website: "http://callalilyspa.com.vn/",
    workingTime: "",
  },
];

const HospitalCsvUpload = () => {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [dialogOpen, setDialogOpen] = useState<HospitalDialogType>("close");
  const [file, setFile] = useState<string | Blob>("");

  const closeDialog = () => {
    setDialogOpen("close");
  };
  const detailsButtonClicked = (row: any) => {
    setSelectedRow(row);
    setDialogOpen("view");
  };

  const account = useSelector((state: any) => state.loginAccount?.account);
  const uploadedHospitals: any[] =
    useSelector((state: any) => state.hospitals?.uploadedHospitals) || [];

  // const uploadedHospitals = mockData;

  const { uploadErrMess, uploadSuccessMessage } = useSelector(
    (state: any) => state.hospitals
  );

  const dispatch = useDispatch();
  const dispatchUploadHospitalCsv = (formData: any) =>
    dispatch(uploadHospitalCsv(formData, account.token));

  const handleChange = (event: any) => {
    setFile(event.target.files[0] !== undefined ? event.target.files[0] : "");
  };

  const handleSubmit = (e: any) => {
    if (file !== "") {
      const formData = new FormData();
      formData.append("csvfile", file);
      dispatchUploadHospitalCsv(formData);
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
            defaultValue={hospitalCsv}
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
        {uploadedHospitals.length > 0 && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <HospitalListTableHead />
              <TableBody>
                {uploadedHospitals.map((row: any, index: number) => {
                  return (
                    <TableRow key={row.id}>
                      <Cell width="5%">{index + 1}</Cell>
                      <Cell width="20%">{getValueOf(row.name)}</Cell>
                      <Cell width="15%">{getFullAddress(row)}</Cell>
                      <Cell width="10%">{getValueOf(row.workingTime)}</Cell>
                      <Cell width="20%">{getFullContact(row)}</Cell>
                      <Cell width="20%">{getValueOf(row.service)}</Cell>
                      <Cell width="10%">
                        <Link onClick={() => detailsButtonClicked(row)}>
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
      <CustomizedDialog
        open={dialogOpen === "view"}
        title="Chi tiết bệnh viện"
        content={<HospitalDetailContent row={selectedRow} isAdmin />}
        actions={
          <>
            <Button onClick={closeDialog} color="secondary">
              Đóng
            </Button>
          </>
        }
        toggleDialog={closeDialog}
      />
    </>
  );
};

export default React.memo(HospitalCsvUpload);
