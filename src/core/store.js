import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createStateSyncMiddleware} from 'redux-state-sync'
import rootReducer from "reducers";
import {isDev} from "core/globals";

const config = {};
const middlewares = [
  createStateSyncMiddleware(config),
];
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

export default createStore(rootReducer, {}, isDev ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares));

// export default store;
