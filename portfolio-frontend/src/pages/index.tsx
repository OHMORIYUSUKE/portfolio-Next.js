import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import Layout from '../layout/layout';
import Footer from '../components/Footer';

import Carousel from 'react-material-ui-carousel';
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

import { workData } from '../testData/workData';
import { blogData } from '../testData/blogData';

import Image from 'next/image';

import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';
import LinkIcon from '@material-ui/icons/Link';

import axios from 'axios';
import OGPHead from '../components/OGPHead';
import deteformat from '../lib/deteformat';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      borderRadius: '8px',
    },
    imageLocation: {
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
    icon: {
      marginLeft: 10,
      marginRight: 10,
      fontSize: 30,
    },
    box: {
      position: 'relative',
    },
    boxtext: {
      position: 'absolute',
      bottom: 0,
      right: 17,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 13,
      paddingRight: 13,
      backgroundColor: 'rgba(219, 219, 219, 0.899)',
      color: 'rgb(0, 0, 0)',
      fontSize: 'medium',
      [theme.breakpoints.down('sm')]: {
        fontSize: 'small',
      },
    },
  })
);

function About() {
  const classes = useStyles();
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const frexOrNone = isXsSm ? 'block' : 'flex';
  return (
    <>
      <Box
        display={frexOrNone}
        flexDirection="row"
        p={1}
        m={0}
        bgcolor="background.paper"
        justifyContent="center"
        style={{ borderRadius: '13px', width: '100%' }}>
        <Box p={1}>
          <div className={classes.imageLocation}>
            <Image
              src="/images/profile.jpg"
              width={200}
              height={200}
              className={classes.image}
            />
          </div>
        </Box>
        <Box p={1}>
          <h2 style={{ textAlign: 'center' }}>大森裕介</h2>

          <div style={{ textAlign: 'center' }}>
            <Link
              href={'https://twitter.com/uutan1108'}
              underline="none"
              color="textPrimary"
              target="_blank"
              rel="noopener noreferrer">
              <TwitterIcon className={classes.icon} />
            </Link>

            <Link
              href={'https://github.com/OHMORIYUSUKE'}
              underline="none"
              color="textPrimary"
              target="_blank"
              rel="noopener noreferrer">
              <GitHubIcon className={classes.icon} />
            </Link>

            <Link
              href={'mailto:b2190350@photon.chitose.ac.jp'}
              underline="none"
              color="textPrimary"
              target="_blank"
              rel="noopener noreferrer">
              <EmailIcon className={classes.icon} />
            </Link>
          </div>
        </Box>
      </Box>
    </>
  );
}

function Works(props) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  console.log(posts);
  // 無限ループを回避する
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          'https://y-ohmori-portfolio.microcms.io/api/v1/work',
          { headers: { 'X-API-KEY': process.env.MKEY } }
        );
        setPosts(res.data.contents);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <Grid item xs={props.carouselWidth}>
      <Link href={'/works'} underline="none" color="textPrimary">
        <h2
          style={{
            textAlign: 'center',
            background: 'linear-gradient(transparent 90%, #1976D2 0%)',
          }}>
          Works
        </h2>
      </Link>
      <Carousel
        next={() => {
          /* Do stuff */
        }}
        prev={() => {
          /* Do other stuff */
        }}
        animation="slide"
        interval={3500}
        timeout={1000}
        navButtonsAlwaysVisible={false}>
        {posts.slice(0, props.carouselNumber).map((item, i) => (
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <Paper elevation={3} key={i}>
              <div className={classes.box}>
                <CardMedia
                  style={{ height: props.carouselHeight }}
                  image={item.image.url}
                  title={item.title}
                />
                <p className={classes.boxtext}>
                  {item.title}{' '}
                  <LinkIcon
                    style={{ display: 'inline-flex', verticalAlign: 'middle' }}
                  />
                </p>
              </div>
            </Paper>
          </a>
        ))}
      </Carousel>
    </Grid>
  );
}

function Blog(props) {
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const TitleSpace = isXsSm ? 17 : 50;
  const TextfontSize = isXsSm ? 'h6' : 'h5';

  const [posts, setPosts] = useState([]);

  console.log(posts);
  // 無限ループを回避する
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          'https://y-ohmori-portfolio.microcms.io/api/v1/blog',
          { headers: { 'X-API-KEY': process.env.MKEY } }
        );
        setPosts(res.data.contents);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <OGPHead pageName={'TOP'} />
      <Grid item xs={props.carouselWidth}>
        <Link href={'/blog'} underline="none" color="textPrimary">
          <h2
            style={{
              textAlign: 'center',
              background: 'linear-gradient(transparent 90%, #1976D2 0%)',
            }}>
            Blog
          </h2>
        </Link>
        <Carousel
          next={() => {
            /* Do stuff */
          }}
          prev={() => {
            /* Do other stuff */
          }}
          animation="slide"
          interval={3500}
          timeout={1000}
          navButtonsAlwaysVisible={false}>
          {posts.slice(0, props.carouselNumber).map((item, i) => (
            <a href={'/blog/' + item.id}>
              <Paper elevation={3} style={{ display: 'flex' }} key={i} square>
                <CardMedia
                  style={{ height: props.carouselHeight, minWidth: '60%' }}
                  image={item.image.url}
                  title={item.title}
                />
                <div style={{ margin: TitleSpace }}>
                  <Typography component={TextfontSize} variant={TextfontSize}>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {deteformat(item.updatedAt)}
                  </Typography>
                </div>
              </Paper>
            </a>
          ))}
        </Carousel>
      </Grid>
    </>
  );
}

const Home: React.FC = () => {
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const carouselWidth = isXsSm ? 12 : 8;
  const carouselHeight = isXsSm ? 200 : 300;
  const carouselNumber = 5;
  return (
    <>
      <OGPHead pageName={'Top'}/>
      <Layout pageName="Top">
        <div style={{ marginBottom: '20px' }}>
          <Grid container alignItems="center" justify="center">
            <About />
            <Works
              carouselWidth={carouselWidth}
              carouselHeight={carouselHeight}
              carouselNumber={carouselNumber}
            />

            <Blog
              carouselWidth={carouselWidth}
              carouselHeight={carouselHeight}
              carouselNumber={carouselNumber}
            />
          </Grid>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Home;
