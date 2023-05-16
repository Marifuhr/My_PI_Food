// const axios = require("axios");
// const { Diets, Recipe } = require("../db");
// const { API_KEY, URL_SPOONACULAR } = process.env;

// const get_ApiID = async (id) => {
//     const apiID = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
//     const detail = apiID.data;

//     let recipeDetail = {
//         id,
//         title: detail.title,
//         summary: detail.summary,
//         healthScore: detail.healthScore,
//         image: detail.image,
//         steps: detail.analyzedInstructions[0]?.steps.map(s => {
//             return {
//                 number: s.number,
//                 step: s.step,
//             }
//         }),
//         dish: detail.dishTypes,
//         diets: detail.diets,
//     }

//     return recipeDetail;

// }

// const get_DataBaseID = async (id) => {
//     return await Recipe.findByPk(id, {
//         include: {
//             model: Diets,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             }
//         }
//     })
// }

// // const get_Api = async () => {
// //     const resApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

   

// //     const infoApi = await resApi.data.results.map((r) => {
// //         return {
// //             id: r.id,
// //             title: r.title,
// //             image: r.image,
// //             summary: r.summary,
// //             healthScore: r.healthScore,
// //             steps: r.analyzedInstructions[0]?.steps.map(s => {
// //                 return {
// //                     number: s.number,
// //                     step: s.step,
// //                 }
// //             }),
// //             diets: r.diets,
// //             dish: r.dishTypes,
// //         }
// //     })
// //     return infoApi;
// // };

// const get_DataBase = async () => {
//     return await Recipe.findAll({
//         include: {
//             model: Diets,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             }

//         }
//     });
// }


// const get_AllRecipes = async () => {
//     const getApi = await get_Api();
//     const getDataBase = await get_DataBase();
//     const all = getApi.concat(getDataBase);
//     return all;
// }

// module.exports = {
//     get_AllRecipes,
//     get_DataBase,
//     get_Api,
//     get_DataBaseID,
//     get_ApiID,
// }

const axios = require("axios");
const { Diets, Recipe } = require("../db");
const { API_KEY, URL_SPOONACULAR } = process.env;

const get_Api = async () => {
    // const response = await axios.get(
    //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    // );
    const response = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
    const infoApi = response.data.results.map((r) => {
        return {
            id: r.id,
            title: r.title,
            image: r.image,
            summary: r.summary,
            healthScore: r.healthScore,
            steps: r.analyzedInstructions[0]?.steps.map((s) => {
                return {
                    number: s.number,
                    step: s.step,
                };
            }),
            diets: r.diets,
            dish: r.dishTypes,
        };
    });

    return infoApi;
};

const get_DataBase = async () => {
    return await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });
};

const get_ApiID = async (id) => {
    // const apiID = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    const apiID = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5?id=${id}`)
    const detail = apiID.data;

    let recipeDetail = {
        id: detail.id,
        title: detail.title,
        summary: detail.summary,
        healthScore: detail.healthScore,
        image: detail.image,
        steps: detail.analyzedInstructions[0]?.steps.map(s => {
            return {
                number: s.number,
                step: s.step,
            }
        }),
        diets: detail.diets,
    }

    return recipeDetail;
}

const get_DataBaseID = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diets,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });
};



const get_AllRecipes = async () => {
    const [apiRecipes, databaseRecipes] = await Promise.all([get_Api(), get_DataBase()]);
    return [...apiRecipes, ...databaseRecipes];
}

module.exports = {
    get_AllRecipes,
    get_DataBase,
    get_Api,
    get_DataBaseID,
    get_ApiID,
};