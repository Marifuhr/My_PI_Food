
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRecipeDetails } from './../redux/actions';
import { useDispatch, useSelector } from 'react-redux'

export default function Detail() {
    const receta = useSelector((state) => state.recipeDetails)
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getRecipeDetails(id))
    }, [dispatch, id])

    return (
        <div>
            <Link to="/home">Back</Link>
            <h1>{receta.title}</h1>
            <p id="recipe" dangerouslySetInnerHTML={{ __html: receta.summary }}></p>
            <h2>{receta.healthScore}</h2>
            <h4>{receta.steps}</h4>
            <img src={receta.image} alt={receta.title} />
            <h3>{receta.diets}</h3>
        </div>
    )
}