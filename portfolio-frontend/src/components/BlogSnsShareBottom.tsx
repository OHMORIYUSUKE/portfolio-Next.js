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

export default function BlogSnsShareSide(props) {
  const classes = useStyles();

  const id = router.query.id;

  return (
    <div className={classes.root}>
      <p>\　共有　/</p>
      <TwitterShareButton
        className={classes.icon}
        title={props.title}
        url={process.env.baseUrl + location.pathname}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <FacebookShareButton
        title={props.title}
        className={classes.icon}
        url={process.env.baseUrl + location.pathname}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <LineShareButton
        title={props.title}
        className={classes.icon}
        url={process.env.baseUrl + location.pathname}>
        <LineIcon size={40} round />
      </LineShareButton>
      <HatenaShareButton
        title={props.title}
        className={classes.icon}
        url={process.env.baseUrl + location.pathname}>
        <HatenaIcon size={40} round />
      </HatenaShareButton>
      <PocketShareButton
        title={props.title}
        className={classes.icon}
        url={process.env.baseUrl + location.pathname}>
        <PocketIcon size={40} round />
      </PocketShareButton>
    </div>
  );
}
