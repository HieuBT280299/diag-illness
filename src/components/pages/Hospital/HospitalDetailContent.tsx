import { Grid, Typography } from "@material-ui/core";
import { getFullAddress, getValueOf } from "./HospitalListTable.helper";

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

const HospitalDetailContent = ({ row, isAdmin }: any) => {
  const userFields = [
    {
      title: "Họ và tên",
      content: getValueOf(row.name),
    },
    {
      title: "Địa chỉ",
      content: getFullAddress(row),
    },
    {
      title: "Giờ làm việc",
      content: getValueOf(row.workingTime),
    },
    {
      title: "Điện thoại",
      content: getValueOf(row.phone),
    },
    {
      title: "Website",
      content: getValueOf(row.website),
    },
    {
      title: "Giới thiệu",
      content: getValueOf(row.introduction),
    },
    {
      title: "Dịch vụ",
      content: getValueOf(row.service),
    },
    {
      title: "Khoa khám bệnh",
      content: getValueOf(row.department),
    },
  ];

  const adminFields = [
    {
      title: "Id",
      content: getValueOf(row.id),
    },
    ...userFields,
  ];

  const fields = isAdmin ? adminFields : userFields;
  return (
    <Grid container spacing={2}>
      {fields.map(({ title, content }): any => (
        <Field title={title} content={content} />
      ))}
    </Grid>
  );
};

export default HospitalDetailContent;
