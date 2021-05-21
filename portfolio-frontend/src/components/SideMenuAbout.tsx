import {
  createStyles,
  IconButton,
  Link,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { ListItem, ListItemIcon } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

import FaceIcon from '@material-ui/icons/Face';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(-180deg)',
    },
  })
);

export function SideMenuAbout(): JSX.Element {
  let open = localStorage.getItem('SideMenuAbout');
  let opened = true;
  if (open == 'true') {
    opened = true;
  } else {
    opened = false;
  }

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(opened);
  console.log(open);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    const openOrClose = !expanded;
    localStorage.setItem('SideMenuAbout', openOrClose.toString());
  };
  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary={'About'} />
        <Link
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          color="textSecondary">
          <ExpandMoreIcon
            style={{ display: 'inline-flex', verticalAlign: 'middle' }}
          />
        </Link>
      </ListItem>
      {/* ---プルダウン--- */}
      <Collapse in={expanded}>
        <Link href={'/about/#name'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={'名前'} />
          </ListItem>
        </Link>
        <Link href={'/about/#skill'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={'スキル'} />
          </ListItem>
        </Link>
        <Link href={'/about/#events'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={'イベント'} />
          </ListItem>
        </Link>
        <Link href={'/about/#links'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={'リンク'} />
          </ListItem>
        </Link>
      </Collapse>
      {/* ------ */}
    </>
  );
}
