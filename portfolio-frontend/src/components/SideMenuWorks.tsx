import { Link, ListItemText } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { ListItem, ListItemIcon } from '@material-ui/core';
import React from 'react';

import LaptopMacIcon from '@material-ui/icons/LaptopMac';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export function SideMenuWorks(): JSX.Element {
  let open = localStorage.getItem('SideMenuWorks');
  let opened = true;
  if (open == 'true') {
    opened = true;
  } else {
    opened = false;
  }
  const [expanded, setExpanded] = React.useState(opened);
  console.log(open);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    const openOrClose = !expanded;
    localStorage.setItem('SideMenuWorks', openOrClose.toString());
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
        <Link href={'/works#web'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={'Web'} />
          </ListItem>
        </Link>
        <Link href={'/works#blender'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={'Blender'} />
          </ListItem>
        </Link>
        <Link href={'/works#unity'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={'Unity'} />
          </ListItem>
        </Link>
      </Collapse>
      {/* ------ */}
    </>
  );
}
