import React from 'react';
import Container from '@material-ui/core/Container';

import Layout from '../layout/layout';
import AboutEvents from '../components/AboutEvents';
import AboutSkill from '../components/AboutSkill';
import AboutName from '../components/AboutName';
import AboutLinks from '../components/AboutLinks';
import Footer from '../components/Footer';
import {
  Button,
  createStyles,
  Dialog,
  Grid,
  makeStyles,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import Head from 'next/head';
import OGPHead from '../components/OGPHead';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from 'next/image';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: '20px',
    },
    name: {
      width: '100%',
    },
    text: {
      width: '100%',
      marginTop: 15,
      marginBottom: 15,
    },
    mail: {
      width: '100%',
      marginTop: 15,
      marginBottom: 5,
    },
    button: {
      width: '60%',
    },
    title: {},
  })
);

const about: React.FC = () => {
  const classes = useStyles();

  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const textAreaWidth = isXsSm ? '100%' : '60%';

  //////
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //setOpen(false);
    Router.push('/');
  };

  ///////

  function send(): void {
    const inputElementName = document.getElementById(
      'textareaName'
    ) as HTMLInputElement;
    const inputValueName = inputElementName.value;

    const inputElementContent = document.getElementById(
      'textareaContent'
    ) as HTMLInputElement;
    const inputValueContent = inputElementContent.value;

    const inputElementMail = document.getElementById(
      'textareaMail'
    ) as HTMLInputElement;
    const inputValueMail = inputElementMail.value;

    if (
      inputValueName == '' ||
      inputValueContent == '' ||
      inputValueMail == ''
    ) {
      window.alert('未入力の欄があります。');
      return;
    }

    var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (!reg.test(inputValueMail)) {
      window.alert('メールアドレスが不正です。');
      return;
    }

    axios
      .post(
        'https://y-ohmori-portfolio.microcms.io/api/v1/contact', 
        {
          name: inputValueName,
          content: inputValueContent,
          mail: inputValueMail,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-WRITE-API-KEY': process.env.NEXT_PUBLIC_MKEYPOST,
          },
        }
      )
      .then((res) => {
        console.log(res);
        //window.alert('投稿が完了しました。');
        handleClickOpen();
      })
      .catch((error) => {
        window.alert('送信に失敗しました。');
      });
  }
  return (
    <>
      <OGPHead pageName={'Contact'} />
      <Layout pageName="Contact">
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.root}>
          <Grid item style={{ width: textAreaWidth }}>
            <h2>お問い合わせ</h2>
            <TextField
              id="textareaName"
              className={classes.name}
              label="名前"
              variant="outlined"
            />
            <br />
            <TextField
              id="textareaMail"
              className={classes.mail}
              label="メールアドレス"
              variant="outlined"
            />
            <br />
            <TextField
              id="textareaContent"
              className={classes.text}
              label="内容"
              multiline
              rows={7}
              variant="outlined"
            />
            <Grid container alignItems="center" justify="center">
              <Button
                onClick={send}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon />}>
                送信
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* ------ */}
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {'お問い合わせありがとうございます。'}
          </DialogTitle>
          <DialogContent>
            <div style={{ textAlign: 'center' }}>
              <Image src="/images/mailsend.png" width={300} height={300} />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              TOPページに戻る
            </Button>
          </DialogActions>
        </Dialog>
        {/* ------ */}
        <Footer />
      </Layout>
    </>
  );
};

export default about;
