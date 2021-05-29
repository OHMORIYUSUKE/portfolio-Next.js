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
import deteformat from '../../lib/deteformat';

import cheerio from 'cheerio';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    indexRoot: {
      position: 'fixed',
      right: '8px',
      top: '15%',
    },
    indexPaper: {
      borderLeft: 'thick solid #1976D2',
      paddingTop: 2,
      paddingBottom: 2,
      maxWidth: 230,
      minWidth: 230,
    },
    contentsTitles: {
      marginTop: 15,
      // backgroundColor: '#EEFFFF',
      border: 'dashed 2px #668ad8' /*破線*/,
      borderRadius: 20,
    },
    list: {
      listStyleType: 'circle',
    },
  })
);

function blogDetail({ postId, title, updatedAt, content, imageUrl }: Props) {
  const classes = useStyles();

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

  let HTMLcontent = markedOption(content, {
    renderer: markedRender(),
  });

  HTMLcontent = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
          ${HTMLcontent}
      </body>
    </html>
  `;

  // HTMLからhタグを取得
  const $ = cheerio.load(HTMLcontent);
  const headings = $('h1, h2, h3').toArray();
  const toc = headings.map((data) => ({
    text: data.children[0],
    id: data.attribs.id,
    name: data.name,
  }));

  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const imageHeight = isXsSm ? 220 : 250;

  const bodySpaceLeft = isXsSm ? '0%' : '3%';

  return (
    <>
      <Head>
        <title>{title} | Blog</title>
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
      <Layout pageName={title} space={0}>
        <div style={{ marginBottom: '20px', marginLeft: bodySpaceLeft }}>
          <Grid container alignItems="flex-start" justify="flex-start">
            <Grid item sm={9}>
              <div style={{ display: 'block' }}>
                <Typography
                  component="h4"
                  variant="h4"
                  color="textPrimary"
                  align="center"
                  style={{ marginTop: '20px' }}>
                  {title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center"
                  style={{ marginBottom: 7, marginTop: 7 }}>
                  <EventIcon
                    style={{ display: 'inline-flex', verticalAlign: 'middle' }}
                  />
                  {updatedAt}
                </Typography>
              </div>
              {/* コードのタグをレスポンシブにする */}
              <Paper elevation={0} square style={{ maxWidth: '100vw' }}>
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
                  <Paper className={classes.contentsTitles} elevation={0}>
                    <p
                      style={{
                        paddingLeft: 25,
                        fontSize: 20,
                        background:
                          'linear-gradient(transparent 95%, #668ad8 0%)',
                      }}>
                      もくじ
                    </p>
                    <ol className={classes.list}>
                      {toc.map((tile, i) => (
                        <li>
                          <a href={'#' + tile.id}>{tile.text['data']}</a>
                        </li>
                      ))}
                    </ol>
                  </Paper>
                  <Highlight innerHTML={true}>{HTMLcontent}</Highlight>
                  <BlogSnsShareBottom />
                </div>
              </Paper>
              {isXsSm ? (
                <></>
              ) : (
                <div className={classes.indexRoot}>
                  <Paper elevation={0} className={classes.indexPaper}>
                    <ol
                      style={{
                        listStyleType: 'circle',
                        paddingInlineStart: 23,
                      }}>
                      {toc.map((tile, i) => (
                        <li key={i}>
                          <a href={'#' + tile.id}>{tile.text['data']}</a>
                        </li>
                      ))}
                    </ol>
                  </Paper>
                </div>
              )}
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

  const updatedAt = deteformat(json.updatedAt);

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
