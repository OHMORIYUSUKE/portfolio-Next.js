import { Link, ListItemText } from '@material-ui/core';
import { ListItem, ListItemIcon } from '@material-ui/core';
import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import LabelIcon from '@material-ui/icons/Label';

export function SideMenuTotop(): JSX.Element {
  return (
    <>
      <Link href="/" underline="none" color="textPrimary">
        <ListItem button>
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText primary={'Top'} />
        </ListItem>
      </Link>
    </>
  );
}
