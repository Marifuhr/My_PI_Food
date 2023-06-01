
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRecipeDetails } from './../redux/actions';
import { useDispatch, useSelector } from 'react-redux'
import style from './detail.module.css'

export default function Detail() {
    const receta = useSelector((state) => state.recipeDetails)
    const dispatch = useDispatch();
    const { id } = useParams();
    const [estado, setEstado] = useState(false)

    const dieta = () => {
        if (id.includes("-")) {
            return <h3 className={style.dieta}>{receta.diets[0].name}</h3>
        } else {
            return <h3 className={style.dieta}>{receta.diets}</h3>
        }
    }

    useEffect(() => {
        dispatch(getRecipeDetails(id))
    }, [dispatch, id])

    return (
        <div className={style.div}>
            <Link to="/home" className={style.btn}>Back</Link>
            <>
                <h1 className={style.title}>{receta.title}</h1>
                <h4 className={style.id}>{receta.id}</h4>
                <p className={style.recipe} id="recipe" dangerouslySetInnerHTML={{ __html: receta.summary }}></p>
                <img className={style.img} src={receta.image} alt={receta.title} />
            </>
            <h2 className={style.health}>{receta.healthScore}</h2>
            <p className={style.recipe}>{receta.steps}</p>
            {
                dieta()
            }

        </div>
    )
}   