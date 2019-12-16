import {createStore, applyMiddleware} from "redux";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {composeWithDevTools} from "redux-devtools-extension";
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'
import rootReducer from "reducers";
import {isDev, PERSIST_KEY} from "core/globals";

// const persistConfig = {
//   key: PERSIST_KEY,
//   storage,
// };
//
// const persistedReducer = persistReducer(persistConfig, rootReducer);
//
// export default () => {
//   let store = createStore(persistedReducer, isDev && composeWithDevTools());
//   let persistor = persistStore(store);
//   return {store, persistor};
// }

const config = {};
const middlewares = [
  createStateSyncMiddleware(config),
];
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

export default createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middlewares)));

// export default store;
