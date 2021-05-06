import { Snackbar } from '@material-ui/core';
import React, { useCallback } from 'react';

const SimpleNotification: React.FC<{
  message: string;
  onClose: () => void;
}> = ({ message, onClose }: { message: string; onClose: () => void }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = useCallback(
    (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
      setOpen(false);
      onClose();
    },
    [onClose]
  );

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      message={message}
      autoHideDuration={6000}
      onClose={handleClose}
    ></Snackbar>
  );
};

export default SimpleNotification;
