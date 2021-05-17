import React, { useEffect } from 'react';
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

import marked from 'marked';
import Highlight from 'react-highlight';

import { markedOption, markedRender } from '../../lib/marked';

import { blogData } from '../../testData/blogData';

import Layout from '../../layout/layout';
import Footer from '../../components/Footer';
import BlogSnsShareSide from '../../components/BlogSnsShareSide';
import BlogSnsShareBottom from '../../components/BlogSnsShareBottom';

//markedのoptionを設定
marked.setOptions({
  gfm: true,
  breaks: true,
  silent: false,
});

const blogDetail: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const imageHeight = isXsSm ? 180 : 250;

  const id = router.query.id;

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
  return (
    <>
      <Layout pageName="Article">
        <div style={{ marginBottom: '20px' }}>
          <Grid container alignItems="center" justify="center">
            <Grid item sm={10}>
              {blogData.map((tile, i) => {
                return Number(tile.id) == Number(id) ? (
                  <>
                    <Head>
                      <title>Blog</title>
                      <link rel="icon" href="/favicon.ico" />
                      <meta property="og:title" content="Portforio" />
                      <meta property="og:type" content="website" />
                      <meta
                        property="og:url"
                        content={process.env.baseUrl + '/blog/' + tile.id}
                      />
                      <meta property="og:image" content={tile.img} />
                      <meta property="og:site_name" content="Portforio" />
                      <meta property="og:description" content={tile.title} />
                      {/* Twitter設定 */}
                      <meta name="twitter:card" content="summary_large_image" />
                    </Head>
                    <div style={{ display: 'block' }} key={i}>
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
                    <Paper elevation={0} square>
                      <div style={{ textAlign: 'center' }}>
                        <CardMedia
                          style={{ height: imageHeight }}
                          image={tile.img}
                          title={tile.title}
                        />
                      </div>
                      <div
                        style={{
                          paddingBottom: 3,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}>
                        <Highlight innerHTML={true}>
                          {markedOption(tile.content, {
                            renderer: markedRender(),
                          })}
                        </Highlight>
                        <BlogSnsShareBottom title={tile.title} />
                      </div>
                    </Paper>
                    <BlogSnsShareSide title={tile.title} />
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
