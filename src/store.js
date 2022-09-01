//Inicijalizacija za centralni store koja se odradi na početku
//i ne mijenja se više

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; //ovde idu svi reduceri aplikacije

const initialState = {}; //početni state je prazan objekat

const middlevare = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlevare))
);

export default store;
