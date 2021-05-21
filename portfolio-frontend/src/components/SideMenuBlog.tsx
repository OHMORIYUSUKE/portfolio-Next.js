import { Link, ListItemText } from '@material-ui/core';
import { ListItem, ListItemIcon } from '@material-ui/core';
import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import ContactMailIcon from '@material-ui/icons/ContactMail';

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
      <Link href="/contact" underline="none" color="textPrimary">
        <ListItem button>
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary={'Contact'} />
        </ListItem>
      </Link>
    </>
  );
}
