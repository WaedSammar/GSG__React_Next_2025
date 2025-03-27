import Link from 'next/link';
import React from 'react';
import img404 from '@/public/404.svg';
import Image from 'next/image';
import { Button } from '@mui/material';

const NotFound = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h3>Task Not Found!</h3>
      <Image src={img404} alt='404' />
      <Link href='/'>
        <Button variant='contained' sx={{ mt: 3 }} color='primary'>
          Back to Tasks
        </Button>
      </Link>

    </div>
  )
}

export default NotFound
