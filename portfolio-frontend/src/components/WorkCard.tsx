import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

type Props = {
  img: string;
  title: string;
  description: string;
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

const WorkCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.title}
          image={props.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonLink}>
        <Button size="small" color="primary">
          Webサイトへ{' '}<ChevronRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default WorkCard;
