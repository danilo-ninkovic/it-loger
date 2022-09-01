import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  TECHS_ERROR,
  SET_LOADING,
} from "./types";

// GET TECHS  - get "techs" from server
export const getTechs = () => async (dispatch) => {
  try {
    setLoading(); //loading počinje i završit će u reducer-a
    const res = await fetch("/techs"); // dohvatanje techs[] iz baze
    const data = await res.json();
    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//ADD TECH  - post dodavanje novog tehničara u listi
export const addTech = (tech) => async (dispatch) => {
  //tech je uneseni tehničar u AddTechModal-u
  try {
    setLoading();

    const res = await fetch("/techs", {
      method: "POST", //dodavanje u bazu
      body: JSON.stringify(tech), //tech je parametar
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json(); //data je novi tech objekat

    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//DELETE TECH - brisanje tehničara iz baze pomoću id-a
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`/techs/${id}`, { method: "DELETE" });
    dispatch({
      type: DELETE_TECH,
      payload: id, //preko id-a filtriramo u reduceru
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText,
    });
  }
};

// SET LOADING to true kada počne fetch request
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
