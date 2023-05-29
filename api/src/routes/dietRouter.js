const { Router } = require("express");
const { Diets } = require("../db");
const { types } = require("../controllers/dietControllers")
const axios = require('axios')
const router = Router();

// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar 
// la base de datos con los tipos de datos indicados por spoonacular.
router.get('/', async (req, res) => {
    try {
        const { data } = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
        const dietas = data.results.map(n => n.diets !== undefined && n.diets);
        
        let resp = []
        dietas.map(el => {
            
           return el.map(lm => {
               
                    return resp.push(lm)
                
            })
        })
        console.log(resp)
        await resp.map(el => {
            Diets.findOrCreate({
                where: {
                    name: el
                }

            })
        })
        const diets = await Diets.findAll();

        res.status(200).json(diets)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})


module.exports = router;