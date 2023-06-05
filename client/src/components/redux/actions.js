
import axios from "axios";
export const GET_FOOD = "GET_FOOD";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const GET_DIETS = "GET_DIETS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const FILTER_BY_TYPE_DIET = "FILTER_BY_TYPE_DIET";
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";

const URL = "http://localhost:3001";

export function getFood() {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/recipes`);
            return dispatch({
                type: GET_FOOD,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
}

export function getRecipeByName(name) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/recipes/?name=${name}`);
            return dispatch({
                type: GET_RECIPE_BY_NAME,
                payload: response.data,
            });
        } catch (err) {
            alert("Recipe not found.");
        }
    };
}

export function getRecipeDetails(id) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/recipes/${id}`);
            console.log(response)
            return dispatch({
                type: GET_RECIPE_DETAILS,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${URL}/types`);
            return dispatch({
                type: GET_DIETS,
                payload: response.data,
            });
        } catch (err) {
            console.log(err.message);
        }
    };
}

export function createRecipe(payload) {
    return async function (dispatch) {
        try {
            var response = await axios.post(`${URL}/recipes`, payload);
            return dispatch({
                type: CREATE_RECIPE,
                payload: response.data
            });
        } catch (err) {
            console.log(err);
        }
    };
}

export function filterByTypeDiet(payload) {
    return {
        type: FILTER_BY_TYPE_DIET,
        payload,
    };
}

export function orderByAlphabet(payload) {
    return {
        type: ORDER_BY_ALPHABET,
        payload,
    };
}

export function filterBySource(payload) {
    return {
        type: FILTER_BY_SOURCE,
        payload: payload,
    };
}

export function orderByScore(payload) {
    return {
        type: ORDER_BY_SCORE,
        payload,
    };
}

export function clearDetail() {
    return {
        type: CLEAR_DETAIL,
    };
}