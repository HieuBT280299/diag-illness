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
      title: "Name",
      content: getValueOf(row.name),
    },
    {
      title: "Address",
      content: getFullAddress(row),
    },
    {
      title: "Working time",
      content: getValueOf(row.workingTime),
    },
    {
      title: "Phone",
      content: getValueOf(row.phone),
    },
    {
      title: "Website",
      content: getValueOf(row.website),
    },
    {
      title: "Introduction",
      content: getValueOf(row.introduction),
    },
    {
      title: "Service",
      content: getValueOf(row.service),
    },
    {
      title: "Department",
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
