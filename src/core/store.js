import {createStore, combineReducers} from "redux";
import auth from "reducers/auth.reducer";

const rootReducer = combineReducers({
  auth,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
