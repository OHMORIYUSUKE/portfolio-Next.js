import React, { useEffect, useState } from 'react';
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
  CircularProgress,
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';

import Router, { useRouter } from 'next/router';

import marked from 'marked';
import Highlight from 'react-highlight';

import { markedOption, markedRender } from '../../lib/marked';

import { blogData } from '../../testData/blogData';

import Layout from '../../layout/layout';
import Footer from '../../components/Footer';
import BlogSnsShareSide from '../../components/BlogSnsShareSide';
import BlogSnsShareBottom from '../../components/BlogSnsShareBottom';
import axios from 'axios';
import dynamic from 'next/dynamic';
import OGPHead from '../../components/OGPHead';

//markedのoptionを設定
marked.setOptions({
  gfm: true,
  breaks: true,
  silent: false,
});

const blogDetail: React.FC = () => {
  const BlogSnsShareBottom = dynamic(() =>
    import('../../components/BlogSnsShareBottom').then(
      (mod) => mod.BlogSnsShareBottom
    )
  );
  const BlogSnsShareSide = dynamic(() =>
    import('../../components/BlogSnsShareSide').then(
      (mod) => mod.BlogSnsShareSide
    )
  );
  const router = useRouter();
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const imageHeight = isXsSm ? 180 : 250;

  const id = router.query.id;

  console.log(id);

  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState([]);

  console.log(posts['title']);
  console.log(posts['content']);
  console.log(posts['updatedAt']);
  console.log(image['url']);

  // 無限ループを回避する
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://y-ohmori-portfolio.microcms.io/api/v1/blog/${id}`,
          { headers: { 'X-API-KEY': process.env.MKEY } }
        );
        setPosts(res.data);
        setImage(res.data.image);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    // scriptを読み込み
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    document.body.appendChild(script);
    // アンマウント時に一応scriptタグを消しておく
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!posts['content']) {
    return (
      <Layout pageName="Article">
        <div style={{ marginBottom: '20px' }}>
          <Grid container alignItems="center" justify="center">
            <Grid item sm={10}>
              <Paper elevation={0} square>
                <div style={{ textAlign: 'center', padding: 30 }}>
                  <CircularProgress />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
  return (
    <>
      <Layout pageName="Article">
        <div style={{ marginBottom: '20px' }}>
          <Grid container alignItems="center" justify="center">
            <Grid item sm={10}>
              <div style={{ display: 'block' }}>
                <Typography
                  component="h4"
                  variant="h4"
                  color="textPrimary"
                  align="center">
                  {posts['title']}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center">
                  <EventIcon />
                  {posts['updatedAt']}
                </Typography>
              </div>

              <Paper elevation={0} square>
                <div style={{ textAlign: 'center' }}>
                  <CardMedia
                    style={{ height: imageHeight }}
                    image={image['url']}
                    title={posts['title']}
                  />
                </div>
                <div
                  style={{
                    paddingBottom: 3,
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}>
                  <Highlight innerHTML={true}>
                    {markedOption(posts['content'], {
                      renderer: markedRender(),
                    })}
                  </Highlight>
                  <BlogSnsShareBottom />
                </div>
              </Paper>
              <BlogSnsShareSide />
            </Grid>
          </Grid>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default blogDetail;
