import { makeStyles, Card, 
  CardContent, CardActions, 
  IconButton, NoSsr, Box, TextField, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CreateIcon from '@material-ui/icons/Create';
import GoogleFontLoader from 'react-google-font-loader';
import cx from 'clsx';
import React, { useState, useEffect } from 'react';
import { updateMessage, sendLike } from '../redux/actions'; 
import { useDispatch } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  card: {
    border: '1px solid',
    borderColor: '#cfd8dc',
    borderRadius: 12,
    backgroundColor: '#fff',
    minHeight: '16rem',
    position: 'relative'
  },
  bgGround: {
    backgroundColor: '#ffea00',
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
    position: 'absolute',
    bottom: 0,
    width: '95%',
  },
  messageStyle: {
    fontSize: '0.9rem',
    paddingBottom: '9%'
  },
  posAb: {
    color: '#37474f',
    position: 'absolute',
    right: 3,
    "&:hover": {
      color: '#007bff'
    },
    bottom: 9,
  },
  likeStyle: {
    marginRight: 10
  },
}));


export default function Message({ messagesArray, id }) {
  const styles = useStyles();
  const [message, setMessage] = useState(messagesArray.message);
  const [show, setShow] = useState(false);
  const [del, setDel] = useState(true);
  const dispatch = useDispatch();


  const updateClick = e => {
    e.preventDefault();
    if (!del) {
      const payload = {
        id: id,
        message: message,
        idDb: messagesArray.idmessages,
      };
      dispatch(updateMessage(payload));
    }
    setShow(false);
  }

  const handleLike = e => {
    e.preventDefault();
    const data = {
      idDb: messagesArray.idmessages,
      id: id
    };
    dispatch(sendLike(data));
  }

  useEffect(() => {
    if (message === messagesArray.message) {
      setDel(true);
    } else {
      setDel(false);
    }
  }, [message, del, messagesArray])


  const errMes = message.length > 100 ? { error: true, helperText: "Max length 100" } : null; 
  const sendErr = (message.length > 100 && !del) || (message === messagesArray.message && !del) ? { disabled: true } : null; 

  return (
    <>
     <NoSsr>
        <GoogleFontLoader
          fonts={[{ font: 'Montserrat', weights: [400, 700] }]}
        />
      </NoSsr>
    <Card key={messagesArray.idmessages} className={cx(styles.card, styles.zoom)}>
        <Box px={1} mt={2} mb={2}>
          <h2 className={cx(styles.titleFont, styles.header)}>{ messagesArray.name }</h2>
        </Box>
        <Box py={1} className={cx(styles.titleFont, styles.ribbon, styles.bgGround)}>
          { messagesArray.date }
        </Box>
        <CardContent>
          <Box px={1} mt={1} mb={4} className={cx(styles.titleFont, styles.messageStyle)}>
           {
             !show ? 
             messagesArray.message 
             : 
             <TextField 
              autoFocus={true}
              InputProps={{
                disableUnderline: true,
              }}
              value={message}
              onChange={e => setMessage(e.target.value)}
              multiline
              {...errMes}
             />
           }
          </Box>
        </CardContent>
        <CardActions className={styles.buttonStyle}>
          <div style={{ position: 'absolute', bottom: 19, left: 12 }}>
            <Typography variant="h4" style={{ fontSize: 24 }}>{messagesArray.like}<Typography style={{ fontSize: 15 }} variant="p" as="span">like</Typography></Typography>
          </div>
          <IconButton aria-label="like" className={styles.likeStyle} onClick={handleLike}>
            <FavoriteIcon color="secondary" style={{ fontSize: 30}} />
          </IconButton>
            {
              !show ? 
              <IconButton onClick={() => setShow(true)} aria-label="actions" className={styles.posAb}>
                <CreateIcon />
              </IconButton>
              : 
              <IconButton onClick={updateClick} className={styles.posAb} {...sendErr}>
                {
                  !del ? 
                    <SendIcon />
                  : 
                   <CloseIcon />
                }
              </IconButton>
            }
            
        </CardActions>
    </Card>
    </>
  );
}