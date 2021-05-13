import { Link, ListItemText } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { ListItem, ListItemIcon } from '@material-ui/core';
import React from 'react';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CreateIcon from '@material-ui/icons/Create';

import { blogTag } from '../testData/blogTag';

export function SideMenuBlog(): JSX.Element {
  let open = localStorage.getItem('SideMenuBlog');
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
    localStorage.setItem('SideMenuBlog', openOrClose.toString());
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
        {blogTag.map((data, idx) => (
          <Link
            href={'/blog#' + data.tag}
            underline="none"
            color="textPrimary"
            key={idx}>
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
