import React from 'react';
import Head from 'next/head';
import {
  Paper,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Grid,
  CardMedia,
  Avatar,
  useTheme,
  useMediaQuery,
  Typography,
  Link,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';

import Router, { useRouter } from 'next/router';

import { blogData } from '../../testData/blogData';

import Layout from '../../layout/layout';
import Footer from '../../components/Footer';

const blogDetail: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const carouselWidth = isXsSm ? 12 : 8;
  const carouselHeight = isXsSm ? 200 : 300;
  const carouselNumber = 5;

  const id = router.query.id;

  return (
    <>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout pageName="Article">
        <div style={{ marginBottom: '20px' }}>
          <Grid container alignItems="center" justify="center">
            <Grid item sm={8}>
              {blogData.map((tile) => {
                return Number(tile.id) == Number(id) ? (
                  <>
                    <div style={{ display: 'block' }}>
                      <Typography
                        component="h4"
                        variant="h4"
                        color="textPrimary"
                        align="center">
                        {tile.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        align="center">
                        <EventIcon />
                        {tile.createdAt}
                      </Typography>
                    </div>
                    <br />
                    <div>{tile.content}</div>
                  </>
                ) : (
                  <></>
                );
              })}
            </Grid>
          </Grid>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default blogDetail;
