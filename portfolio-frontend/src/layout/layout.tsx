import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';

import FaceIcon from '@material-ui/icons/Face';
import CreateIcon from '@material-ui/icons/Create';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface Props {
  children?: React.ReactNode;
  pageName: string;
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography align="center" variant="h4" color="textSecondary">
          Portfolio
        </Typography>
        <Typography align="center" variant="subtitle2" color="textSecondary">
          v2.0.0
        </Typography>
      </div>
      <Divider />
      <List>
        <Link href={'/about'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary={'About'} />
          </ListItem>
        </Link>
        <ListItem button onClick={handleExpandClick}>
          <ListItemIcon>
            <LaptopMacIcon />
          </ListItemIcon>
          <ListItemText primary={'Works'} />
        </ListItem>
        {/* ---プルダウン--- */}
        <Collapse in={expanded}>
          <Link
            href={'/works/#programming'}
            underline="none"
            color="textPrimary">
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
        <Link href={'/blog'} underline="none" color="textPrimary">
          <ListItem button>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary={'Blog'} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
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
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ background: '#1976D2' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            {props.pageName}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>{props.children}</Typography>
      </main>
    </div>
    <footer style={{ marginBottom: '20px' }}>
    <Container maxWidth="lg">
      <Typography variant="h6" align="center" gutterBottom style={{fontSize: '18px'}}>
      PortfolioSite
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
        style={{fontSize: '13px'}}>
        Copyright © 2021 OHMORIYUSUKE All Rights Reserved.
      </Typography>
    </Container>
  </footer>
  </>
  );
}
