import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  img: string;
  title: string;
  description: string;
  url: string;
  flag: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '32%',
      margin: 6,
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
      },
    },
    buttonLink: {
      justifyContent: 'flex-end',
    },
  })
);

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const WorkCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root} onClick={handleClickOpen}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.title}
            image={props.img}
            title={props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description.length > 35
                ? props.description.slice(0, 35) + '...'
                : props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.buttonLink}>
          <Button
            style={{ textTransform: 'none' }}
            size="small"
            color="primary"
            href={props.url}>
            {props.flag === 'web' ? 'Webサイト' : 'YouTube'}{' '}
            <ChevronRightIcon />
          </Button>
        </CardActions>
      </Card>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
          <CardMedia
            component="img"
            alt={props.title + 'の画像'}
            image={props.img}
            title={props.title}
          />
          <Typography gutterBottom style={{ marginTop: '17px' }}>
            {props.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ textTransform: 'none' }}
            autoFocus
            href={props.url}
            color="primary">
            {props.flag === 'web' ? 'Webサイト' : 'YouTube'}{' '}
            <ChevronRightIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorkCard;
