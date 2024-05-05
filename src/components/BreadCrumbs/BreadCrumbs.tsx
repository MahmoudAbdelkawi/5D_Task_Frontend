import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const BreadCrumbs = () => {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{
        my: 3,
    }}>
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Typography color="text.primary">Users</Typography>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;