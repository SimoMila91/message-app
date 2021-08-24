import * as actionType from '../constants/requestMessage';

export const getMessagesReducer = (state = { messages: [] }, action) => {
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
    case actionType.UPDATE_MESSAGE_SUCCESS: 
      return {
        ...state, 
        messages: []
      }
    default:
      return state;
  }
};