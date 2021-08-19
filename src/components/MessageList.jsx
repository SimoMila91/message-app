import { Container, Grid } from '@material-ui/core';
import Message from './Message';
import React from 'react';


export default function MessageList() {
 

  return (
    <Container style={{ maxWidth: 1800 }} maxWidth='false'>
       <Grid container spacing={10}>
        {
          [0, 1, 2, 3, 4, 5].map((mes, i) => (
            <Grid key={i} item xs={12} md={6} lg={3} xl={2}>
              <Message />
            </Grid>
          ))
        } 
      </Grid>
    </Container>
     
  )
}