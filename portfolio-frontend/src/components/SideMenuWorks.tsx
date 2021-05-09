import { Link, ListItemText } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { ListItem, ListItemIcon } from '@material-ui/core';
import React from 'react';

import LaptopMacIcon from '@material-ui/icons/LaptopMac';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export function SideMenuWorks(): JSX.Element {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <LaptopMacIcon />
        </ListItemIcon>
        <ListItemText primary={'Works'} />
      </ListItem>
      {/* ---プルダウン--- */}
      <Collapse in={expanded}>
        <Link href={'/works/#programming'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={'プログラミング'} />
          </ListItem>
        </Link>
        <Link href={'/works/#other'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={'その他'} />
          </ListItem>
        </Link>
      </Collapse>
      {/* ------ */}
    </>
  );
}
