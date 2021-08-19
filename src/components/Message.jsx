import { makeStyles, Card, 
  CardContent, CardActions, 
  IconButton, NoSsr, Box } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CreateIcon from '@material-ui/icons/Create';
import GoogleFontLoader from 'react-google-font-loader';
import cx from 'clsx';
import React from 'react';

const useStyles = makeStyles(() => ({
  card: {
    border: '1px solid',
    borderColor: '#cfd8dc',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  bgGround: {
    backgroundColor: 'rgb(254, 237, 0)',
  },
  titleFont: {
    fontFamily: "'Montserrat', san-serif",
    color: '#37474f',
  },
  header: {
    margin: 0,
    textAlign: 'center',
    fontSize: '1.10rem',
    letterSpacing: '1px',
  },
  ribbon: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.87)',
    letterSpacing: 1,
    fontSize: '0.9rem'
  },
  zoom: {
    "&:hover": {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
  },
  buttonStyle: {
    display: 'block',
    position: 'relative',
  },
  messageStyle: {
    fontSize: '0.9rem',
  },
  posAb: {
    position: 'absolute',
    right: 0,
  },
}));


export default function Message(props) {
  const styles = useStyles();

  return (
    <>
     <NoSsr>
        <GoogleFontLoader
          fonts={[{ font: 'Montserrat', weights: [400, 700] }]}
        />
      </NoSsr>
    <Card className={cx(styles.card, styles.zoom)}>
        <Box px={1} mt={2} mb={2}>
          <h2 className={cx(styles.titleFont, styles.header)}>Simone Milanesio</h2>
        </Box>
        <Box py={1} className={cx(styles.titleFont, styles.ribbon, styles.bgGround)}>
           21/02/2020
        </Box>
        <CardContent>
          <Box px={1} mt={1} className={cx(styles.titleFont, styles.messageStyle)}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ratione similique laboriosam expedita 
          </Box>
        </CardContent>
        <CardActions disabledSpacing className={styles.buttonStyle}>
          <IconButton aria-label="like">
            <ThumbUpIcon />
          </IconButton>
          <IconButton aria-label="dislike">
            <ThumbDownIcon />
          </IconButton>
            <IconButton aria-label="actions" className={styles.posAb}>
              <CreateIcon />
            </IconButton>
        </CardActions>
    </Card>
    </>
  );
}