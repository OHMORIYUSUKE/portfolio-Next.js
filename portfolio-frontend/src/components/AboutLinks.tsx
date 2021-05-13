import { createStyles, Link, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { aboutLinks } from '../testData/aboutLinks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      marginRight: 18,
      fontSize: 18,
    },
  })
);

function AboutLinks() {
  const classes = useStyles();
  return (
    <>
      {aboutLinks.map((data, idx) => (
        <>
          <Link href={data.url} className={classes.link} key={idx}>
            {data.title}
          </Link>
        </>
      ))}
    </>
  );
}

export default AboutLinks;
