import * as actionType from '../constants/requestMessage';
import update from 'react-addons-update';

export const getMessagesReducer = (state = { messages: [] } , action) => {
  switch (action.type) {
    case actionType.GET_MESSAGES_REQUEST: 
      return {
        loading: true,
        messages: [],
      }
    case actionType.GET_MESSAGES_SUCCESS: 
      return {
        loading: false,
        messages: action.payload,
      }
    case actionType.GET_MESSAGES_FAIL: 
      return {
        loading: false, 
        error: action.payload
      }
    case actionType.ADD_MESSAGE_SUCCESS: 
      return {
        ...state,
        messages: [action.payload, ...state.messages],
        error: null,
      }
    case actionType.ADD_MESSAGE_FAIL: 
      return {
        error: action.payload
      }
    case actionType.UPDATE_MESSAGE_SUCCESS: 
      return update(state, {
        messages: {
          [action.payload.id]: {
            message: {$set: action.payload.message}
          }
        }
      })
    case actionType.UPDATE_MESSAGE_FAIL: 
      return {
        error: action.payload
      }
    case actionType.SEND_LIKE: 
      return update(state, {
        messages: {
          [action.payload.id]: {
            like: {$set: action.payload.like} 
          }
        }
      })
    default:
      return state;
  }
};