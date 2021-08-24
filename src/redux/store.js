import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getMessagesReducer} from './reducers/messageReducers';

const reducer = combineReducers({
  getMessages: getMessagesReducer,
});

const middleware = [thunk]; 

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store; 
