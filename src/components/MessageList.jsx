import { Container, Grid } from '@material-ui/core';
import Message from './Message';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages as listMessages } from '../redux/actions/index';


export default function MessageList() {
  const dispatch = useDispatch();

  const getMessages = useSelector(state => state.getMessages);
  const { messages, loading, error }  = getMessages; 

  useEffect(() => {
    dispatch(listMessages());
  }, [dispatch]) 

  return (
    <Container style={{ maxWidth: 1800 }} maxWidth={false}>
       <Grid container spacing={10}>
        {
          loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> : 
          messages.map((message, i) => (
            <Grid key={i} item xs={12} md={6} lg={3} xl={2}>
              <Message messagesArray={message} />
            </Grid>
          ))
        }
      </Grid>
    </Container>
     
  )
}