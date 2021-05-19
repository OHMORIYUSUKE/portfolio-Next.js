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
import fetch from 'node-fetch';
import zeroPadding from '../../lib/zeroPadding';

//markedのoptionを設定
marked.setOptions({
  gfm: true,
  breaks: true,
  silent: false,
});

type Props = {
  postId: string;
  title: string;
  updatedAt: string;
  content: string;
  imageUrl: string;
};

function blogDetail({ postId, title, updatedAt, content, imageUrl }: Props) {
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
  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const imageHeight = isXsSm ? 180 : 250;

  return (
    <>
      <Head>
        <title>{title} | Article</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={`Blog | ${title}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.baseUrl + '/blog/' + postId}
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Portforio" />
        <meta property="og:description" content={content} />
        {/* Twitter設定 */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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
                  {title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center">
                  <EventIcon />
                  {updatedAt}
                </Typography>
              </div>

              <Paper elevation={0} square>
                <div style={{ textAlign: 'center' }}>
                  <CardMedia
                    style={{ height: imageHeight }}
                    image={imageUrl}
                    title={title}
                  />
                </div>
                <div
                  style={{
                    paddingBottom: 3,
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}>
                  <Highlight innerHTML={true}>
                    {markedOption(content, {
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
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  const res = await fetch(
    `https://y-ohmori-portfolio.microcms.io/api/v1/blog/${id}`,
    {
      headers: {
        'X-API-KEY': process.env.MKEY,
      },
    }
  );

  const json = await res.json();

  const D = new Date(json.updatedAt);
  const y = D.getFullYear();
  const month = D.getMonth() + 1;
  const d = D.getDate();
  const h = D.getHours();
  const min = D.getMinutes();

  const updatedAt = `${zeroPadding(y, 4)}年 ${zeroPadding(
    month,
    2
  )}月${zeroPadding(d, 2)}日 ${zeroPadding(h, 2)}:${zeroPadding(min, 2)}`;
  return {
    props: {
      postId: json.id,
      title: json.title,
      updatedAt: updatedAt,
      content: json.content,
      imageUrl: json.image.url,
    },
  };
}

export default blogDetail;
