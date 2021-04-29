import { Grid, Typography } from "@material-ui/core";
import {
  getValueOf,
  toLocalDate,
  getRoleValue,
  getEnabledValue,
  toLocalDateAndTime,
} from "./ManageAccountTable.helper";

const Field = ({ title, content }: any) => {
  return (
    <Grid item container>
      <Grid item xs={5}>
        <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={7}>
        {content}
      </Grid>
    </Grid>
  );
};

const AccountDetailContent = ({ row }: any) => {
  const fields = [
    {
      title: "Id",
      content: getValueOf(row.id),
    },
    {
      title: "Họ và tên",
      content: getValueOf(row.name),
    },
    {
      title: "Ngày sinh",
      content: toLocalDate(row.dateOfBirth),
    },
    {
      title: "Email",
      content: getValueOf(row.email),
    },
    {
      title: "Địa chỉ",
      content: getValueOf(row.address),
    },
    {
      title: "Loại tài khoản",
      content: getRoleValue(row.roleId),
    },
    {
      title: "Còn hoạt động",
      content: getEnabledValue(row.enabled),
    },
    {
      title: "Được tạo lúc",
      content: toLocalDateAndTime(row.createAt),
    },
    {
      title: "Sửa lần cuối",
      content: toLocalDateAndTime(row.modifyAt),
    },
    {
      title: "Truy cập lần cuối",
      content: toLocalDateAndTime(row.lastAccess),
    },
  ];
  return (
    <Grid container spacing={2}>
      {fields.map(({ title, content }): any => (
        <Field title={title} content={content} />
      ))}
    </Grid>
  );
};

export default AccountDetailContent;
