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
    position: 'fixed',
    right: '16px',
    bottom: '25%',
  },
  paper: {
    padding: '10px',
    borderRadius: '50px',
  },
});

export default function BlogSnsShareSide() {
  const classes = useStyles();

  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));

  const id = router.query.id;

  return isXsSm ? (
    <></>
  ) : (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <TwitterShareButton
          url={'https://portfolio-puce-beta.vercel.app' + location.pathname}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <br />
        <FacebookShareButton
          url={'https://portfolio-puce-beta.vercel.app' + location.pathname}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <br />
        <LineShareButton
          url={'https://portfolio-puce-beta.vercel.app' + location.pathname}>
          <LineIcon size={40} round />
        </LineShareButton>
        <br />
        <HatenaShareButton
          url={'https://portfolio-puce-beta.vercel.app' + location.pathname}>
          <HatenaIcon size={40} round />
        </HatenaShareButton>
        <br />
        <PocketShareButton
          url={'https://portfolio-puce-beta.vercel.app' + location.pathname}>
          <PocketIcon size={40} round />
        </PocketShareButton>
      </Paper>
    </div>
  );
}
