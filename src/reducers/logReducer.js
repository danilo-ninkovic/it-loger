//ovde se primaju types i payload-s iz "logActions.js" i manipuliše state-om

import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS,
} from '../actions/types';

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload, // data u getLogs()
        loading: false, //završava započet loading u getLogs()
      };
    case ADD_LOG:
      return {
        ...state,
        loading: false,
        logs: [...state.logs, action.payload], //state je mutable pa ne može push() metoda
        //zato se šalje array gdje je rest od arraya (...state.logs) i onda novi log (action.payload)
      };
    case DELETE_LOG:
      return {
        ...state,
        loading: false,
        logs: state.logs.filter((log) => log.id !== action.payload),
        //vratit će one log u logs[] gdje id nije isti kao payload(id)
      };
    case UPDATE_LOG:
      return {
        ...state,
        loading: false,
        logs: state.logs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        ), //ako je log.id isti kao i kod onog u payload-u- vratiti taj u payloadu ili : log
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SEARCH_LOGS:
      return {
        ...state,
        loading: false,
        logs: action.payload, //data iz fetchinga u logActions
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGS_ERROR:
      console.error(action.payload); //logovat će error da znamo šta je
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
