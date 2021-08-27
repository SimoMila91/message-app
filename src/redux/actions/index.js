import * as actionTypes from '../constants/requestMessage.js';
import axios from 'axios';

export const getMessages = () => async (dispatch) => {
  try {
    dispatch({type: actionTypes.GET_MESSAGES_REQUEST});
    const { data } = await axios.get("http://localhost:3000/messages"); 
    dispatch({
      type: actionTypes.GET_MESSAGES_SUCCESS,
      payload: data
    }); 
  } catch (error) {
    dispatch({
      type: actionTypes.GET_MESSAGES_FAIL,
      payload: 
        error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message,
    });
  }
};

export const addMessage = (message) => async (dispatch) => {
  try {
    dispatch({type: actionTypes.ADD_MESSAGE_REQUEST}); 
    const res = await axios.post("http://localhost:3000/upload", {
      message
    });
    const data = { 
      idmessages: res.data.idmessages,
      name: message.name.replaceAll("''", "'"),
      message: message.message.replaceAll("''", "'"),
      date: message.date,
      like: 0,
    };
    dispatch({
      type: actionTypes.ADD_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_MESSAGE_FAIL,
      payload: 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

export const updateMessage = (data) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.UPDATE_MESSAGE_REQUEST
    });
    const res = await axios.put(`http://localhost:3000/upd`, data);
    const obj = {
      ...data, 
      res: res.data
    };
    console.log(obj);
    dispatch({
      type: actionTypes.UPDATE_MESSAGE_SUCCESS,
      payload: obj
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_MESSAGE_FAIL,
      payload: 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    });
  }
};

export const sendLike = (data) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:3000/like`, data);
    const obj = {
      like: res.data.like,
      id: data.id
    };
    console.log(res);
    console.log(obj);
    dispatch({
      type: actionTypes.SEND_LIKE,
      payload: obj,
    });
  } catch (error) {
    console.log(error);
  } 
}