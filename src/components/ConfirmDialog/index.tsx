import { Button } from "@material-ui/core";
import React from "react";
import CustomizedDialog, { DialogProps } from "../Dialog";

export default function ConfirmDialog({ ...props }: DialogProps) {
  const actionButtons = (
    <>
      <Button onClick={props.toggleDialog} color="primary">
        Yes
      </Button>
      <Button onClick={props.toggleDialog} color="default">
        No
      </Button>
    </>
  );

  return (
    <CustomizedDialog {...props} title="Confirmation" actions={actionButtons} />
  );
}
