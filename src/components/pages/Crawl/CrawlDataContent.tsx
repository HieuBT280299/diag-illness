import React from "react";
import { Grid, Typography } from "@material-ui/core";
import {
  getValueOf,
  getStatusValue,
  toLocalDateAndTime,
} from "./CrawlDataTable.helper";

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

const CrawlDataContent = ({ row }: any) => {
  const fields = [
    {
      title: "Được tạo lúc",
      content: toLocalDateAndTime(row.createAt),
    },
    {
      title: "Prefix URL",
      content: getValueOf(row.prefixUrl),
    },
    {
      title: "Start URL",
      content: getValueOf(row.startUrl),
    },
    {
      title: "Pattern URL",
      content: getValueOf(row.patternUrl),
    },
    {
      title: "Elasticsearch Index",
      content: getValueOf(row.elasticsearchIndex),
    },
    {
      title: "Dữ liệu",
      content: getValueOf(row.data),
    },
    {
      title: "Trạng thái",
      content: getStatusValue(row.finishAt),
    },
    {
      title: "Thời gian hoàn thành",
      content: toLocalDateAndTime(row.finishAt),
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

export default React.memo(CrawlDataContent);
