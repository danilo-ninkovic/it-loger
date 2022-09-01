// root reducer (ovde dolaze svi reduceri)
import { combineReducers } from 'redux'; // u Njega idu svi reduceri
//combineReducer se puni sa ostalim reducerima
import logReducer from './logReducer';
import techReducer from './techReducer';

export default combineReducers({
  log: logReducer, //log je dio glavnog state-a koji se šalje u komponente pomoću "connect-a" a on je u stvari je "initialState" u logReducer-u
  tech: techReducer,
});
