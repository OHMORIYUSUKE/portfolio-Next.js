import React from 'react';
import {
  makeStyles,
  createStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  })
)(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function AboutSkill() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={20} />
      <br />
      <BorderLinearProgress variant="determinate" value={10} />
      <br />
      <BorderLinearProgress variant="determinate" value={50} />
      <br />
      <BorderLinearProgress variant="determinate" value={70} />
      <br />
      <BorderLinearProgress variant="determinate" value={40} />
    </div>
  );
}
