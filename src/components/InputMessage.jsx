import { Container, TextField, makeStyles, Typography, IconButton, Paper, Button, InputAdornment, withStyles } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage as upload } from '../redux/actions/index';
import cx from 'clsx';


const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#007bff',
      },
    },
    '& .MuiOutlinedInput-inputAdornedStart': {
      paddingLeft: '1rem'
    },
  },
})(TextField);

const useStyle = makeStyles(theme => ({
  flexDiv: {
    margin: 30,
  },
  pStyle: {
    margin: 'auto'
  },
  writeButt: {
    marginLeft: 5,
    marginBottom: 5,
  },
  paperStyle: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'right',
  },
  paperPad: {
   padding: '0 1% 1.2% 1%'
  },
  resize: {
    fontSize: 14,
  },
  textfieldStyle: {
    padding: '2px 10px 2px 10px',
    fontSize: 11,
    width: '-webkit-fill-available',
  },
  buttonStyle: {
    color: '#007bff',
  },
  pad10: {
    padding: '0 10px 10px 10px'
  },
  nameInput: {
    padding: 20,
    textAlign: 'center'
  },
  icon: {
    "&:hover": {
      color: "green",
    },
  }
}))

export default function InputMessage() {
  const classes = useStyle();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const handleWrite = e => {
    e.preventDefault();
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };


  const handleClick = e => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    const payload = {
      name: name.replaceAll("'", "''"),
      message: message.replaceAll("'", "''"),
      date: date
    };
    dispatch(upload(payload));
    setName('');
    setMessage('');
    setShow(false);
  };    

  const err = name === "" && message !== ""  ? { error: true, helperText: 'Name is required' } : null;  

  return (
    <Container>
      <div className={classes.flexDiv}>
        <Typography as="p" className={classes.pStyle}>Write your message byte 
          <IconButton className={cx(classes.writeButt, classes.icon)} onClick={handleWrite}>
            <CreateIcon />
          </IconButton>
        </Typography>
      </div>
      {
        show ? 
           <div className={classes.paperPad}>
            <Paper className={classes.paperStyle} elevation={3}>
              <div  className={classes.nameInput }>
                <CssTextField  
                  size="small"
                  label="Name"  
                  autoFocus={true} 
                  variant="outlined"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  color="primary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span>😎</span>
                      </InputAdornment>
                    ),
                  }}
                  {...err}
                />
              </div>
              <div className={classes.pad10}>
                    <TextField 
                      InputProps = {{
                        disableUnderline: true,
                        classes: {
                          input: classes.resize,
                        }
                      }}
                      className={classes.textfieldStyle}
                      multiline
                      fullWidth
                      margin="dense"
                      maxRows={5}
                      value={message}
                      onChange={e =>  setMessage(e.target.value)}
                      placeholder="The pen is on the table sir...."
                    />
                    <Button onClick={handleClick} type="submit" className={classes.buttonStyle} size="small" variant="contained" endIcon={<SendIcon />}>
                      Send
                    </Button>   
              </div>
            </Paper>
          </div>
        : null
      }
    </Container>
  )
}