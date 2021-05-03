import { Button } from "@material-ui/core";
import React from "react";
import CustomizedDialog, { DialogProps } from "../Dialog";

export type ConfirmDialogProps = DialogProps & {
  onYesButtonClicked?: () => void;
  onNoButtonClicked?: () => void;
};

export default function ConfirmDialog({
  onYesButtonClicked,
  onNoButtonClicked,
  ...rest
}: ConfirmDialogProps) {
  const actionButtons = (
    <>
      <Button onClick={onYesButtonClicked} color="primary">
        Có
      </Button>
      <Button onClick={onNoButtonClicked} color="default">
        Không
      </Button>
    </>
  );

  return (
    <CustomizedDialog {...rest} title="Xác nhận" actions={actionButtons} />
  );
}
