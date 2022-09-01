// uz pomoć type-s se prave akcije prema reducer-u koji onda manipuliše state-om

import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  UPDATE_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS,
} from './types';
/* 
export const getLogs = () => {
  //umjesto objekta(dispatch{}),redux-thunk omogućava vraćanje async funkcije sa dispatch
  return async (dispatch) => {
    setLoading();
    const res = await fetch("/logs");
    const data = res.json();
    dispatch({
      type: GET_LOGS,
      payload: data,// array of logs
    });
  };
};
*/
// GET LOGS  - get "logs" from server
export const getLogs = () => async (dispatch) => {
  //umjesto objekta(dispatch{}),redux-thunk omogućava vraćanje async funkcije sa dispatch
  try {
    setLoading(); //loading počinje i završit će u reducer-a
    const res = await fetch('/logs'); // dohvatanje logs[] iz baze
    const data = await res.json();
    dispatch({
      type: GET_LOGS,
      payload: data, // array of logs
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//ADD LOG - dodavanje novog loga preko AddLogModal-a
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading(); //loading počinje i završit će u reducer-a

    const res = await fetch('/logs', {
      method: 'POST', //slanje forme pomoću POST
      body: JSON.stringify(log), // log je unesena forma js objekt konvertovan u json
      headers: { 'Content-Type': 'application/json' }, //vrsta unosa
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data, // novi log
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// DELETE LOG - brisanje log-a pozivamo iz logItem-a
export const deleteLog = (id) => async (dispatch) => {
  //umjesto objekta(dispatch{}),redux-thunk omogućava vraćanje async funkcije sa dispatch
  try {
    setLoading(); //loading počinje i završit će u reducer-a
    await fetch(`/logs/${id}`, { method: 'DELETE' }); // pošto ne pravimo ništa ne ide const  već samo dohvaćamo određeni log (preko id-a)za delete

    dispatch({
      type: DELETE_LOG,
      payload: id, //preko id-a brišemo
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//UPDATE LOG - update log  na serveru
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`/logs/${log.id}`, {
      method: 'PUT', //promjena postojećeg
      body: JSON.stringify(log),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json(); //updated (promjenjen) log

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//SET CURRENT  log za edit
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

//CLEAR CURRENT - vraćanje na  current : null
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

//SEARCH LOGS  - pretraga preko text-a u SearcBar komponenti
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`/logs?q=${text}`); // dohvatanje logs[] iz baze preko parametra "q" a to je uneseni text
    //u ovom slučaju mi u toku dohvatanja sa servera filtriramo po parametru q a ne filtriramo već dobijeno kao u "kontakt-keeper"
    // ono što filtriramo text-om su objekti logs i tech ubazi
    const data = await res.json();
    dispatch({
      type: SEARCH_LOGS,
      payload: data, // array of logs koji odgovaraju pretrazi
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// SET LOADING to true kada počne fetch request
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
