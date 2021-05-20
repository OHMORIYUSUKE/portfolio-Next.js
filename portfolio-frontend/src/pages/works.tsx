import React, { JSXElementConstructor, useEffect, useState } from 'react';
import Head from 'next/head';

import Layout from '../layout/layout';
import Footer from '../components/Footer';
import {
  createStyles,
  GridList,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { workData } from '../testData/workData';
import WorkCard from '../components/WorkCard';
import axios from 'axios';
import OGPHead from '../components/OGPHead';

import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: 20,
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    gridList: {
      width: '100%',
      height: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    anchor: {
      display: 'block',
      paddingTop: '90px',
      marginTop: '-90px',
    },
    title: {
      background: 'linear-gradient(transparent 97%, #1976D2 0%)',
      marginBottom: 20,
      padding: '0.4rem 2rem',
      borderLeft: '8px solid #1976D2',
    },
  })
);

function Web(props) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  // 無限ループを回避する
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://y-ohmori-portfolio.microcms.io/api/v1/work?filters=type[contains]${props.query}`,
          { headers: { 'X-API-KEY': process.env.MKEY } }
        );
        setPosts(res.data.contents);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));

  const widthSkelton = isXsSm ? 325:290;

  if (posts.length === 0) {
    return (
      <>
        <div className={classes.root}>
          {[...Array(3)].map((_, i) => (
            <div key={i}>
            <Skeleton
              width={widthSkelton}
              variant="rect"
              height={180}
              animation="wave"
            />
            <Skeleton animation="wave" width={widthSkelton} />
            <Skeleton animation="wave" width={widthSkelton-60} />
            <Skeleton animation="wave" width={widthSkelton-100} />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {posts.map((data, idx) => (
            <WorkCard
              key={idx}
              flag={data.release_place[0]}
              img={data.image.url}
              title={data.title}
              description={data.description}
              url={data.url}
            />
          ))}
        </GridList>
      </div>
    </>
  );
}

const works: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <OGPHead pageName={'Works'} />
      <Layout pageName="Works">
        <div style={{ marginBottom: '20px' }}>
          <a id="web" className={classes.anchor}></a>
          <Typography
            component="h4"
            variant="h4"
            color="textPrimary"
            className={classes.title}>
            Web
          </Typography>
          <Web query={'Web'} />
          <a id="blender" className={classes.anchor}></a>
          <Typography
            component="h4"
            variant="h4"
            color="textPrimary"
            className={classes.title}>
            Blender
          </Typography>
          <Web query={'Blender'} />
          <a id="unity" className={classes.anchor}></a>
          <Typography
            component="h4"
            variant="h4"
            color="textPrimary"
            className={classes.title}>
            Unity
          </Typography>
          <Web query={'Unity'} />
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default works;
