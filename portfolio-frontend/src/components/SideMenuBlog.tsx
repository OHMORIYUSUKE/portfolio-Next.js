import { Link, ListItemText } from '@material-ui/core';
import { ListItem, ListItemIcon } from '@material-ui/core';
import React from 'react';
import CreateIcon from '@material-ui/icons/Create';

export function SideMenuBlog(): JSX.Element {
  return (
    <>
      <Link href="/blog" underline="none" color="textPrimary">
        <ListItem button>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary={'Blog'} />
        </ListItem>
      </Link>
    </>
  );
}
