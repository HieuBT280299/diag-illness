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
  getFullAddress,
  getFullContact,
  getValueOf,
} from "./HospitalListTable.helper";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});

const rows = [
  {
    id: 1,
    name: "Phòng Khám Chuyên Khoa Răng Hàm Mặt - BS. Lê Thu Hương",
    number: "71B Nguyễn Khắc Nh",
    ward: "Phường Cô Giang",
    district: "Quận 1",
    city: "Thành phố Hồ Chí Minh",
    workingTime: "T2,T3,T4,T5,T6,T7,CN: 17:00 - 20:00",
    phone: "-",
    website: "",
    introduction:
      "Loại hình: Phòng khám chuyên khoa  Giấy phép: 00639/SYT-GPHĐ. Ngày cấp: 12/11/2013  Người phụ trách chuyên môn: Lê Thu Hương  Phạm vị chuyên môn: Khám bệnh, chữa bệnh thông thường, cấp cứu ban đầu các vết thương hàm mặt - Chích, rạch áp xe, lấy cao răng, nhổ răng - Làm răng, hàm giả - Chữa răng và điều trị nội nha",
    service: "",
    department: null,
  },
  {
    id: 2,
    name: "Phòng Chẩn Trị Y Học Cổ Truyền - Lương Y Nguyễn Thị Bay",
    number: "36/26 Lê Thị Riên",
    ward: "Phường Bến Thành",
    district: "Quận 1",
    city: "Thành phố Hồ Chí Minh",
    workingTime: "T2,T3,T4,T5,T6,T7,CN: 17:00 - 20:00",
    phone: "0902.716.398",
    website: "",
    introduction:
      "Bác sĩ Nguyễn Thị Bay là một trong những bác sĩ Đông Y giỏi nhất tại TPHCM nói riêng và cả nước nói chung. Bác sĩ có hơn 30 năm kinh nghiệm nghiên cứu, khám chữa bệnh khi làm việc tại bệnh viện Đại Học Y Dược TPHCM. Bác sĩ còn thường xuyên tham gia các chương trình truyền hình, trả lời phỏng vấn, chia sẻ về các vấn đề chuyên môn cho người dân cả nước cùng biết. Bác sĩ Nguyễn Thị Bay chính là một trong những bác sĩ tâm huyết và có chuyên môn cao trong nghề hiện nay.",
    service: "",
    department: null,
  },
  {
    id: 4,
    name: "Phòng Chẩn Trị Y Học Cổ Truyền - Lương Y Nguyễn Ngọc Đức - CS1",
    number: "24 Nguyễn Thị Nghĩ",
    ward: "Phường Bến Thành",
    district: "Quận 1",
    city: "Thành phố Hồ Chí Minh",
    workingTime: "T2,T3,T4,T5,T6: 08:00 - 17:00",
    phone: "028.3832.3058",
    website: "",
    introduction: "",
    service: "",
    department: null,
  },
  {
    id: 3,
    name: "Phòng Chẩn Trị Y Học Cổ Truyền - Lương Y Nguyễn Hữu Tân",
    number: "148/5/19 Bùi Việ",
    ward: "Phường Phạm Ngũ Lão",
    district: "Quận 1",
    city: "Thành phố Hồ Chí Minh",
    workingTime: "T2,T3,T4,T5,T6,T7,CN: 07:30 - 18:00",
    phone: "-",
    website: "",
    introduction: "",
    service: "",
    department: null,
  },
  {
    id: 5,
    name: "Pan Clinic - Medical Beauty Center Vietnam",
    number: "222-224 Trần Hưng Đạ",
    ward: "Phường Nguyễn Cư Trinh",
    district: "Quận 1",
    city: "Thành phố Hồ Chí Minh",
    workingTime: "T2,T3,T4,T5,T6,T7,CN: 08:30 - 20:30",
    phone: "028.3837.7999 - 0918.992.288",
    website: "http://panclinic.vn",
    introduction:
      "Khai trương chi nhánh đầu tiên tại TP. Hồ Chí Minh vào năm 2013, Pan Clinic – Medical Beauty Center Vietnam trực thuộc Công ty liên doanh Pan Việt Nam, là sự hợp tác giữa công ty Pan Rajdhevee Group Public Ltd. – tập đoàn hàng đầu trong lĩnh vực phòng khám điều trị chăm sóc da thẩm mỹ và lĩnh vực nhập khẩu và phân phối sản phẩm mỹ phẩm, thực phẩm bổ sung tại Thái Lan và công ty TNHH Thương mại Vĩnh Phát – công ty dẫn đầu trong lĩnh vực nhập khẩu trang thiết bị y tế hiện đại tại Việt Nam. Pan Việt Nam là phòng khám cung cấp dịch vụ khám, điều trị và chăm sóc da thẩm mỹ với đội ngũ bác sĩ và chuyên viên chăm sóc da tu nghiệp tại Thái Lan, ngoài ra phòng khám còn phân phối sản phẩm mỹ phẩm, thực phẩm chức năng.",
    service:
      "Nám, Da khô, Da chảy xệ, Thâm và bọng mắt, Sẹo lõm, Triệt lông, Tàn nhang, Mụn, Thực phẩm chức năng",
    department: null,
  },
];

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

const HospitalListTable = () => {
  const classes = useStyles();

  return (
    <Grid container>
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
                    <HeaderCell width="25%">{getValueOf(row.name)}</HeaderCell>
                    <HeaderCell width="20%">{getFullAddress(row)}</HeaderCell>
                    <HeaderCell width="10%">
                      {getValueOf(row.workingTime)}
                    </HeaderCell>
                    <HeaderCell width="20%">{getFullContact(row)}</HeaderCell>
                    <HeaderCell width="25%">
                      {getValueOf(row.service)}
                    </HeaderCell>
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
