import { Divider } from '@material-ui/core';
import { Typography, Container } from '@material-ui/core';
import React from 'react';

function Footer() {
  return (
    <footer>
      <Divider />
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          style={{ fontSize: '18px', marginTop: '16px' }}>
          PortfolioSite
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
          style={{ fontSize: '13px' }}>
          Copyright © 2021 OHMORIYUSUKE All Rights Reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
