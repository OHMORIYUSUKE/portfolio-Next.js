import { Link, ListItemText } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { ListItem, ListItemIcon } from '@material-ui/core';
import React from 'react';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CreateIcon from '@material-ui/icons/Create';

import { blogTag } from '../testData/blogTag';

export function SideMenuBlog(): JSX.Element {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <ListItem button onClick={handleExpandClick}>
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText primary={'Blog'} />
      </ListItem>
      {/* ---プルダウン--- */}
      <Collapse in={expanded}>
        {blogTag.map((data) => (
          <Link
            href={'/blog#' + data.tag}
            underline="none"
            color="textPrimary">
            <ListItem button>
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary={data.tag} />
            </ListItem>
          </Link>
        ))}
      </Collapse>
      {/* ------ */}
    </>
  );
}
