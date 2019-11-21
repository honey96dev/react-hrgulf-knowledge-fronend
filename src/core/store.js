import {createStore} from "redux";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "reducers";
import {isDev} from "./globals";

const persistConfig = {
  key: "knowledge",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, isDev && composeWithDevTools());
  let persistor = persistStore(store);
  return {store, persistor};
}
