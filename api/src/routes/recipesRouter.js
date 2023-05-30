const { Router } = require('express');
const {
    get_AllRecipes,
    get_DataBaseID,
    get_ApiID,
} = require('../controllers/recipeControllers');
const { Recipe, Diets } = require("../db")
const { Op } = require("sequelize")
const { typesDiets } = require("../controllers/dietControllers")
const router = Router();

// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        let AllRecipes = await get_AllRecipes();

        if (name) {
            let recipeByName = await AllRecipes.filter(r => r.title.toLowerCase().includes(name.toLowerCase())); // Utilizo LowerCase para evitar problemas con la comparación.
            if (recipeByName.length) {
                let recipes = recipeByName.map(r => {
                    return {
                        id: r.id,
                        title: r.title,
                        image: r.image,
                        summary: r.summary,
                        score: r.score,
                        healthScore: r.healthScore,
                        steps: r.steps,
                        diets: r.diets ? r.diets : r.diets.map(r => r.name)
                    }
                })
                return res.status(200).send(recipes);
            }
            return res.status(400).send('Recipe not found.');
        } else {
            // Si no tengo nombre, devuelvo todas las recetas.
            let recipes = AllRecipes.map(r => {
                return {
                    id: r.id,
                    title: r.title,
                    image: r.image,
                    summary: r.summary,
                    score: r.score,
                    healthScore: r.healthScore,
                    steps: r.steps,
                    diets: r.diets ? r.diets : r.diets.map(r => r.name),
                }
            })
            return res.status(200).send(recipes)
        }

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let validate = id.includes("-"); // Si tiene el guion es pq se encuentra en base de datos.
    try {
        if (validate) {
            let recipeDB = await get_DataBaseID(id);
            return res.status(200).send(recipeDB);
        } else { // Se encuentra en la API
            let recipeAPI = await get_ApiID(id);
            return res.status(200).send(recipeAPI);
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});



router.post('/', async (req, res) => {
    const { title, summary, score, healthScore, image, steps, diets } = req.body;
    try {
       
        const newRecipe = await Recipe.create({
            title,
            image,
            summary,
            score,
            healthScore,
            steps,
        });
        console.log(newRecipe);
      
        const dietDB = await Diets.findAll({
            where: {
                name: {
                    [Op.in]: diets,
                },
            },
        });
        
        const ids = dietDB.map(el => el.id)
        console.log(ids);
        await newRecipe.addDiets(ids)
        res.status(200).send(newRecipe);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

module.exports = router;