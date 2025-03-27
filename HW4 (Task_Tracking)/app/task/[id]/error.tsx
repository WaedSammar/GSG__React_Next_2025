'use client';

import { Box, Button, Typography } from '@mui/material';
import React from 'react'

interface IProps {
  error: Error;
  reset: () => void;
}
const Error = (props: IProps) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant='h4' color='error' gutterBottom>Something went wrong!</Typography>
      <Typography variant='body1' sx={{ mb: 2 }}>You can {' '}
        <Button variant='outlined' color='primary' sx={{ marginRight: 2 }}
          onClick={() => props.reset()}>Try Again
        </Button>
        or {' '} <Button variant='outlined' color='secondary' onClick={() => window.location.reload()}
        >refresh the page</Button>later.
      </Typography>
      <Typography variant='body2' color='textSecondary'>
        <small>Contact the system administrator and provide the following info: </small>
        <br />
        <strong>{props.error.message}</strong>
      </Typography>
    </Box>
  );
};

export default Error;
