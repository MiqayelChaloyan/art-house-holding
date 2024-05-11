import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Snackbars({open, handleChange, info}: any) {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    handleChange();
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={info.status}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {info.content}
        </Alert>
      </Snackbar>
    </div>
  );
};