import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  createStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Button,
  Collapse,
  IconButton,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
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
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    right: '2%',
    bottom: '4%',
  },
  paper: {
    padding: '10px',
    borderRadius: '50px',
  },
});

export function BlogSnsShareSide(props) {
  const classes = useStyles();

  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));

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

  const [expanded, setExpanded] = React.useState(false);
  console.log(open);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    const openOrClose = !expanded;
  };

  return isXsSm ? (
    <></>
  ) : (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Collapse in={expanded}>
          <TwitterShareButton
            title={posts['title']}
            url={process.env.baseUrl + location.pathname}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <br />
          <FacebookShareButton
            title={posts['title']}
            url={process.env.baseUrl + location.pathname}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <br />
          <LineShareButton
            title={posts['title']}
            url={process.env.baseUrl + location.pathname}>
            <LineIcon size={40} round />
          </LineShareButton>
          <br />
          <HatenaShareButton
            title={posts['title']}
            url={process.env.baseUrl + location.pathname}>
            <HatenaIcon size={40} round />
          </HatenaShareButton>
          <br />
          <PocketShareButton
            title={posts['title']}
            url={process.env.baseUrl + location.pathname}>
            <PocketIcon size={40} round />
          </PocketShareButton>
        </Collapse>
        <IconButton onClick={handleExpandClick} style={{ borderRadius: '50%' }}>
          <ShareIcon fontSize="small" color="primary" />
        </IconButton>
      </Paper>
    </div>
  );
}
export default BlogSnsShareSide;
