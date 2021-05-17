import React from 'react';
import {
  makeStyles,
  createStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    right: '20px',
    bottom: '50%',
  },
});

export default function BlogSnsShare() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>abc</Paper>
    </div>
  );
}
