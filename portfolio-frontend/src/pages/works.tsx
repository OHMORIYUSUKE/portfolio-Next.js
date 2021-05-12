import React from 'react';
import Head from 'next/head';

import Layout from '../layout/layout';
import Footer from '../components/Footer';
import {
  createStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { workData } from '../testData/workData';
import WorkCard from '../components/WorkCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '20px',
    },
    gridList: {
      width: '100%',
      height: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
);

const works: React.FC = () => {
  const classes = useStyles();
  return (
    <Layout pageName="Works">
      <Head>
        <title>works</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {workData.map((data) => (
            <WorkCard
              img={data.img}
              title={data.title}
              description={data.description}
            />
          ))}
        </GridList>
      </div>
      <Footer />
    </Layout>
  );
};

export default works;
