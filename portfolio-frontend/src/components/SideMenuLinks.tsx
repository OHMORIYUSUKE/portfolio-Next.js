import { Link, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';

import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';

function SideMenuLinks() {
  return (
    <>
      <Link
        href={'https://twitter.com/uutan1108'}
        underline="none"
        color="textPrimary"
        target="_blank"
        rel="noopener noreferrer">
        <ListItem button>
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary={'Twitter'} />
        </ListItem>
      </Link>
      <Link
        href={'https://github.com/OHMORIYUSUKE'}
        underline="none"
        color="textPrimary"
        target="_blank"
        rel="noopener noreferrer">
        <ListItem button>
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary={'GitHub'} />
        </ListItem>
      </Link>
      <Link
        href={'mailto:b2190350@photon.chitose.ac.jp'}
        underline="none"
        color="textPrimary"
        target="_blank"
        rel="noopener noreferrer">
        <ListItem button>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary={'Email'} />
        </ListItem>
      </Link>
    </>
  );
}

export default SideMenuLinks;
