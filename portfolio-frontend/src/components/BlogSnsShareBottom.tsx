import React from 'react';
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

export default function BlogSnsShareSide() {
  const classes = useStyles();

  const id = router.query.id;

  return (
    <div className={classes.root}>
      <p>\　共有　/</p>
      <TwitterShareButton
        className={classes.icon}
        url={'https://portfolio-puce-beta.vercel.app' + location.pathname}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <FacebookShareButton
        className={classes.icon}
        url={'https://portfolio-puce-beta.vercel.app' + location.pathname}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <LineShareButton
        className={classes.icon}
        url={'https://portfolio-puce-beta.vercel.app' + location.pathname}>
        <LineIcon size={40} round />
      </LineShareButton>
      <HatenaShareButton
        className={classes.icon}
        url={'https://portfolio-puce-beta.vercel.app' + location.pathname}>
        <HatenaIcon size={40} round />
      </HatenaShareButton>
      <PocketShareButton
        className={classes.icon}
        url={'https://portfolio-puce-beta.vercel.app' + location.pathname}>
        <PocketIcon size={40} round />
      </PocketShareButton>
    </div>
  );
}
