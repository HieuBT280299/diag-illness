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
      title: "Name",
      content: getValueOf(row.name),
    },
    {
      title: "Date of birth",
      content: toLocalDate(row.dateOfBirth),
    },
    {
      title: "Email",
      content: getValueOf(row.email),
    },
    {
      title: "Address",
      content: getValueOf(row.address),
    },
    {
      title: "Role",
      content: getRoleValue(row.roleId),
    },
    {
      title: "Enabled",
      content: getEnabledValue(row.enabled),
    },
    {
      title: "Created at",
      content: toLocalDateAndTime(row.createAt),
    },
    {
      title: "Last modified",
      content: toLocalDateAndTime(row.modifyAt),
    },
    {
      title: "Last access",
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
