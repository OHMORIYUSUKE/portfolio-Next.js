import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import Layout from '../layout/layout';
import Footer from '../components/Footer';
import { createStyles, GridList, makeStyles, Theme } from '@material-ui/core';
import { workData } from '../testData/workData';
import WorkCard from '../components/WorkCard';
import axios from 'axios';
import OGPHead from '../components/OGPHead';

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
    <>
      <OGPHead pageName={'Works'} />
      <Layout pageName="Works">
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            {posts.map((data, idx) => (
              <WorkCard
                key={idx}
                flag={data.flag[0]}
                img={data.image.url}
                title={data.title}
                description={data.description}
                url={data.url}
              />
            ))}
          </GridList>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default works;
