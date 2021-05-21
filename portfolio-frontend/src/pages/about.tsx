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
    anchor: {
      display: 'block',
      paddingTop: '90px',
      marginTop: '-90px',
    },
    title: {},
  })
);

const about: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <OGPHead pageName={'About'} />
      <Layout pageName="About">
        <Container className={classes.root}>
          <a id="name" className={classes.anchor}></a>
          <h2 className={classes.title}>プロフィール</h2>
          <AboutName />
          <a id="skill" className={classes.anchor}></a>
          <h2 className={classes.title}>スキル</h2>
          <AboutSkill />
          <a id="events" className={classes.anchor}></a>
          <h2 className={classes.title}>イベント</h2>
          <AboutEvents />
          <a id="links" className={classes.anchor}></a>
          <h2 className={classes.title}>リンク</h2>
          <AboutLinks />
        </Container>
        <Footer />
      </Layout>
    </>
  );
};

export default about;
