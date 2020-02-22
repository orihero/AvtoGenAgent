import { user, orders } from './reducers';
import { createStore, combineReducers } from 'redux';

let configureStore = () => {
  return createStore(
    combineReducers({
      user,
      orders
    }),
  );
};

export default configureStore;
