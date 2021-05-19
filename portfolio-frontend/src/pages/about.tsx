import React from 'react';
import Container from '@material-ui/core/Container';

import Layout from '../layout/layout';
import AboutEvents from '../components/AboutEvents';
import AboutSkill from '../components/AboutSkill';
import AboutName from '../components/AboutName';
import AboutLinks from '../components/AboutLinks';
import Footer from '../components/Footer';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Head from 'next/head';
import OGPHead from '../components/OGPHead';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '90%',
      marginBottom: '20px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  })
);

const about: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <OGPHead pageName={'About'} />
      <Layout pageName="About">
        <Container className={classes.root}>
          <a id="name"></a>
          <h2>プロフィール</h2>
          <AboutName />
          <a id="skill"></a>
          <h2>スキル</h2>
          <AboutSkill />
          <a id="events"></a>
          <h2>イベント</h2>
          <AboutEvents />
          <a id="links"></a>
          <h2>リンク</h2>
          <AboutLinks />
        </Container>
        <Footer />
      </Layout>
    </>
  );
};

export default about;
