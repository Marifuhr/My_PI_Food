// import { GET_FOOD } from "./actions"

// const initialState = {
//     food: [],
//     allFood: []
// }

// export default function rootReducer(state = initialState, action) {
//     switch (action.type) {
//         case GET_FOOD:
//             return {
//                 ...state,
//                 food: action.payload,
//                 allFood: action.payload
//             }

//         default: return state;
//     }
// }




const initialState = {
    allRecipes: [],
    showedRecipes: [],
    diets: [],
    recipeDetails: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case "GET_FOOD":
            return {
                ...state,
                showedRecipes: action.payload,
                allRecipes: action.payload,
            };

        case "GET_RECIPE_BY_NAME":
            return {
                ...state,
                showedRecipes: action.payload,
            };

        case "GET_RECIPE_DETAILS":
            return {
                ...state,
                recipeDetails: action.payload,
            };

        case "GET_DIETS":
            return {
                ...state,
                diets: action.payload,
            };

        case "CREATE_RECIPE":
            return {
                ...state,
            };

        case "FILTER_BY_TYPE_DIET":
            const all = state.allRecipes;
            const filter = action.payload === 'all' ? all : all.filter(r => r.diets.find(d => d.name === action.payload || d === action.payload))
            return {
                ...state,
                showedRecipes: filter
            }



        case "ORDER_BY_ALPHABET":
            let sortByAlphabet = [...state.showedRecipes];
            sortByAlphabet.sort(function (a, b) {
                const nameA = a.name && a.name.toLowerCase();
                const nameB = b.name && b.name.toLowerCase();
                if (action.payload === 'atoz') {
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                } else {
                    if (nameA > nameB) return -1;
                    if (nameA < nameB) return 1;
                }
                return 0;
            });
            return {
                ...state,
                showedRecipes: sortByAlphabet}

        case "ORDER_BY_SCORE":
            let sortedByScore = [...state.showedRecipes];
            console.log(sortedByScore)
            sortedByScore = action.payload === 'asc' ?
                state.showedRecipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) return 1;
                    if (a.healthScore < b.healthScore) return -1;
                    return 0;
                }) :
                state.showedRecipes.sort(function (a, b) {
                    if (a.healthScore < b.healthScore) return 1;
                    if (a.healthScore > b.healthScore) return -1;
                    return 0;
                });
            return {
                ...state,
                showedRecipes: sortedByScore,
            };
        case "CLEAR_DETAIL":
            return {
                ...state,
                recipeDetails: []
            }
        default:
            return state;
    }
}





