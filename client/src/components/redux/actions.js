
import axios from 'axios';

const URL = "http://localhost:3001";
export function getFood() {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/recipes`);
            return dispatch({
                type: 'GET_FOOD',
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
        }
    }
};

export function getRecipeByName(title) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/recipes/?name=${title}`)
            return dispatch({
                type: "GET_RECIPE_BY_NAME",
                payload: response.data
            })
        } catch (err) {
            alert("Recipe not found.")
        }
    }
}

export function getRecipeDetails(id) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}/recipes/${id}`);
            return dispatch({
                type: "GET_RECIPE_DETAILS",
                payload: response.data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${URL}/types`);
            if (response.data.length < 13) response = await axios.get(`/types`);
            return dispatch({
                type: "GET_DIETS",
                payload: response.data.map(d => d.name)
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function createRecipe(payload) {
    return async function (dispatch) {
        try {
            var response = await axios.post(`${URL}/recipe`, payload);
            return dispatch({
                type: "CREATE_RECIPE",
                payload: response,
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function filterByTypeDiet(payload) {
    return {
        type: "FILTER_BY_TYPE_DIET",
        payload
    }
};


export function orderByAlphabet(payload) {
    return {
        type: "ORDER_BY_ALPHABET",
        payload
    }
}


export function orderByScore(payload) {
    return {
        type: "ORDER_BY_SCORE",
        payload
    }
}

export function clearDetail() {
    return {
        type: "CLEAR_DETAIL"
    }
}