import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  createStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import { Paper, useMediaQuery, useTheme } from '@material-ui/core';
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  HatenaShareButton,
  HatenaIcon,
  LineShareButton,
  LineIcon,
  PocketShareButton,
  PocketIcon,
} from 'react-share';
import router from 'next/router';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
    marginLeft: 5,
  },
});

export function BlogSnsShareBottom(props) {
  const classes = useStyles();

  const id = router.query.id;

  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState([]);

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

  return (
    <div className={classes.root}>
      <p>\　共有　/</p>
      <TwitterShareButton
        className={classes.icon}
        title={posts['title']}
        url={process.env.baseUrl + location.pathname}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <FacebookShareButton
        title={posts['title']}
        className={classes.icon}
        url={process.env.baseUrl + location.pathname}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <LineShareButton
        title={posts['title']}
        className={classes.icon}
        url={process.env.baseUrl + location.pathname}>
        <LineIcon size={40} round />
      </LineShareButton>
      <HatenaShareButton
        title={posts['title']}
        className={classes.icon}
        url={process.env.baseUrl + location.pathname}>
        <HatenaIcon size={40} round />
      </HatenaShareButton>
      <PocketShareButton
        title={posts['title']}
        className={classes.icon}
        url={process.env.baseUrl + location.pathname}>
        <PocketIcon size={40} round />
      </PocketShareButton>
    </div>
  );
}
export default BlogSnsShareBottom;
