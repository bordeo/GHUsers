import {createStore, combineReducers, applyMiddleware} from 'redux';
import {AppState} from './types';
import {reducers as users} from './users';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {reducer as network} from 'react-native-offline';
import {createNetworkMiddleware} from 'react-native-offline';

const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200,
});

const reducers = {
  users,
  network,
};

const rootReducer = combineReducers<AppState>({...reducers});

export default createStore(
  rootReducer,
  applyMiddleware(networkMiddleware, thunk, logger),
);
