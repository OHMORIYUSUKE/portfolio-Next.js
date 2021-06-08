import React from 'react';
import Layout from '../layout/layout';
import Footer from '../components/Footer';
import {
  Button,
  createStyles,
  Dialog,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import OGPHead from '../components/OGPHead';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from 'next/image';
import Router from 'next/router';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

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
    sendimage: {
      textAlign: 'center',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ['入力', '確認・送信', '完了'];
}

function getStepContent(stepIndex: number) {
  const classes = useStyles();
  switch (stepIndex) {
    case 0:
      return (
        <>
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
        </>
      );
    case 1:
      const inputValueName = localStorage.getItem('inputValueName');
      const inputValueContent = localStorage.getItem('inputValueContent');
      const inputValueMail = localStorage.getItem('inputValueMail');
      return (
        <>
          <p>お名前</p>
          {inputValueName}
          <p>メールアドレス</p>
          {inputValueMail}
          <p>内容</p>
          {inputValueContent}
        </>
      );
    case 2:
      localStorage.removeItem('inputValueName');
      localStorage.removeItem('inputValueContent');
      localStorage.removeItem('inputValueMail');
      return (
        <>
          <div className={classes.sendimage}>
            <Image src="/images/mailsend.png" width={200} height={200} />
            <p>送信しました</p>
          </div>
        </>
      );
    default:
      return 'Unknown stepIndex';
  }
}

const about: React.FC = () => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleNextAndinputCheck = () => {
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

    // --データを保持 --
    localStorage.setItem('inputValueName', inputValueName);
    localStorage.setItem('inputValueContent', inputValueContent);
    localStorage.setItem('inputValueMail', inputValueMail);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const theme = useTheme();
  const isXsSm = useMediaQuery(theme.breakpoints.down('sm'));
  const textAreaWidth = isXsSm ? '100%' : '75%';

  function send(): void {
    const inputValueName = localStorage.getItem('inputValueName');
    const inputValueContent = localStorage.getItem('inputValueContent');
    const inputValueMail = localStorage.getItem('inputValueMail');
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
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
      .catch((error) => {
        window.alert('送信に失敗しました。');
      });
  }
  return (
    <>
      <OGPHead pageName={'Contact'} />
      <Layout pageName="Contact" space={3}>
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.root}>
          <Grid item style={{ width: textAreaWidth }}>
            <h2 style={{ textAlign: 'center' }}>
              <EmojiPeopleIcon
                fontSize="large"
                style={{ display: 'inline-flex', verticalAlign: 'middle' }}
              />{' '}
              お問い合わせ
            </h2>
            <Paper elevation={0} style={{ padding: 20 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                <div>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <div>
                    <Button
                      disabled={activeStep === 0 || activeStep === 2}
                      onClick={handleBack}
                      className={classes.backButton}>
                      戻る
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => Router.push('/')}>
                          TOPページへ
                        </Button>
                      </>
                    ) : activeStep === 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={send}>
                        送信
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextAndinputCheck}>
                        次へ
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </Layout>
    </>
  );
};

export default about;
