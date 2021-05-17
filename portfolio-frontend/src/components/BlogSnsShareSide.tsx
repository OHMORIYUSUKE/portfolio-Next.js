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

export default function BlogSnsShareSide(props) {
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
          title={props.title}
          url={process.env.baseUrl + location.pathname}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <br />
        <FacebookShareButton
          title={props.title}
          url={process.env.baseUrl + location.pathname}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <br />
        <LineShareButton
          title={props.title}
          url={process.env.baseUrl + location.pathname}>
          <LineIcon size={40} round />
        </LineShareButton>
        <br />
        <HatenaShareButton
          title={props.title}
          url={process.env.baseUrl + location.pathname}>
          <HatenaIcon size={40} round />
        </HatenaShareButton>
        <br />
        <PocketShareButton
          title={props.title}
          url={process.env.baseUrl + location.pathname}>
          <PocketIcon size={40} round />
        </PocketShareButton>
      </Paper>
    </div>
  );
}
