import { Link, ListItemText } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { ListItem, ListItemIcon } from '@material-ui/core';
import React from 'react';

import FaceIcon from '@material-ui/icons/Face';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export function SideMenuAbout(): JSX.Element {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary={'About'} />
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
