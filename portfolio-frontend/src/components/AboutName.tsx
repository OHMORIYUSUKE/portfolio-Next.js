import React from 'react';
import Image from 'next/image';
import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      borderRadius: '8px',
    },
    imageLocation: {
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
  })
);

function AboutName() {
  const classes = useStyles();

  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const frexOrNone = isXsSm ? 'block' : 'flex';
  return (
    <>
      <Box
        display={frexOrNone}
        flexDirection="row"
        p={1}
        m={0}
        bgcolor="background.paper"
        justifyContent="center"
        style={{ borderRadius: '13px' }}>
        <Box p={1}>
          <div className={classes.imageLocation}>
            <Image
              src="/images/profile.jpg"
              width={200}
              height={200}
              className={classes.image}
            />
          </div>
        </Box>
        <Box p={1}>
          <h2 style={{ textAlign: 'center' }}>大森裕介</h2>
          <ul>
            <li>公立千歳科学技術大学</li>
            <li>情報システム工学科</li>
            <li>
              <a href="https://cist-lt-group.web.app/">cistLTサークル</a>
            </li>
            <li>アニメを見ることが好き</li>
          </ul>
        </Box>
      </Box>
    </>
  );
}

export default AboutName;
