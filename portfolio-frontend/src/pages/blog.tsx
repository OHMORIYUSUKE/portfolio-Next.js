import React from 'react';
import Head from 'next/head';

import Layout from '../layout/layout';

import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { blogData } from '../testData/blogData';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Footer from '../components/Footer';
import { ListSubheader } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '20px',
    },
    gridList: {
      width: '95%',
      height: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
);

const blog: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const cardsPerRow = isXsSm ? 1 : 3;

  return (
    <>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pageName="Blog">
        <div className={classes.root}>
          <GridList
            cols={cardsPerRow}
            cellHeight={180}
            className={classes.gridList}>
            {blogData.map((tile, i) => (
              <GridListTile key={i}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>{tile.createdAt}</span>}
                  actionIcon={
                    <IconButton
                      href={'/blog/' + tile.id}
                      aria-label={`info about ${tile.title}`}
                      className={classes.icon}>
                      <ChevronRightIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default blog;
