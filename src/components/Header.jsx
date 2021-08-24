import { Container, NoSsr, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import InputMessage from './InputMessage';

const useStyles = makeStyles(() => ({
  titleFont: {
    fontFamily: 'Lato, sans serif',
    color: '#000'
  },
  padHeader: {
    padding: '5% 0',
  },
}))

export default function Header() {
  const classes = useStyles();

  return (
    <Container className={classes.padHeader}>
      <NoSsr>
        <GoogleFontLoader 
          fonts={[{ font: 'Lato', weights: [300] }]}
        />
      </NoSsr>
       <Typography className={classes.titleFont}  variant="h2" gutterBottom>Message Byte</Typography>
       <InputMessage />
    </Container>
  )
}