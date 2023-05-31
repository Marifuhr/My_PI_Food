import React from "react";
import { Link } from "react-router-dom"
import Card from '../Card/card'
import SearchBar from '../SearchBar/searchBar';
import Pagination from '../Pagination/pagination';
import style from './home.module.css'
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    getFood,
    filterByTypeDiet,
    orderByAlphabet,
    orderByScore,
} from "../redux/actions"
import img1 from '../styles/Star.png'
import img2 from '../styles/Star2.png'
// import logo from 
let prevId = 1;

function Home(props) {


    const [/* order */, setOrder] = useState('')

    // Lógica para mostrar 9 recetas por página
    const [page, setPage] = useState(1);
    const recipesPage = 9;
    const numberOfRecipes = page * recipesPage;
    const firstRecipe = numberOfRecipes - recipesPage;
    const showRecipes = props.showedRecipes.slice(firstRecipe, numberOfRecipes);

    const paged = function (pageNumber) {
        setPage(pageNumber)
    };

    useEffect(() => {
        props.getFood();
        // La siguiente línea es para quitar un warning molesto de la consola.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.getFood]);

    let handleClick = (e) => {
        e.preventDefault();
        props.getFood();
        setPage(1);
        setOrder('')
        window.location.reload();  // Si quiero recargar la página y limpiar todos los select, esta es una opción.
    }

    let handleFilterByTypeDiet = (e) => {
        e.preventDefault();
        props.filterByTypeDiet(e.target.value);
        setPage(1);
    }

    let handleOrderByAlphabet = (e) => {
        e.preventDefault();
        props.orderByAlphabet(e.target.value);
        setPage(1);
        setOrder(e.target.value);
    }

    let handleOrderByScore = (e) => {
        e.preventDefault();
        props.orderByScore(e.target.value);
        setPage(1);
        setOrder(e.target.value);
    }

    return (
        <div>
            <SearchBar />
            <hr></hr>

            <div className={style.btnYfilt}>

                <div>
                    <button className={style.btn} onClick={handleClick}>REFRESH</button>
                </div>

                <div>
                    <Link to="/recipe">
                        <button className={style.btn}>CREATE</button>
                    </Link>
                </div>


                <div className={style.box}>
                    <select
                        defaultValue={'all'}
                        name="diets"
                        onChange={e => handleFilterByTypeDiet(e)}>
                        <option value="all">Filter by type of diet</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="fodmap friendly">Fodmap Friendly</option>
                        <option value="whole 30">Whole30</option>
                        <option value="dairy free">Dairy Free</option>
                    </select>
                </div>


                <div className={style.box}>
                    <select
                        defaultValue={"DEFAULT"}
                        name="alphabetical"
                        onChange={(e) => handleOrderByAlphabet(e)}
                    >
                        <option value="DEFAULT" disabled>
                            Order alphabetically
                        </option>
                        <option value="atoz">A to Z</option>
                        <option value="ztoa">Z to A</option>
                    </select>
                </div>


                <div className={style.box}>
                    <select
                        defaultValue={'DEFAULT'}
                        name="numerical"
                        onChange={e => handleOrderByScore(e)}>
                        <option value="DEFAULT" disabled>Order by Score</option>
                        <option value="asc">Min to Max</option>
                        <option value="desc">Max to Min</option>
                    </select>
                </div>

            </div>

            <hr></hr>


            <div className={style.ref}>
                <div>
                    <p className={style.starRef}>Score</p>
                    <img className={style.star} src={img1} alt='Img NOT FOUND'></img>
                </div>
                <div>
                    <p className={style.starRef}>Health Score</p>
                    <img className={style.star} src={img2} alt='Img NOT FOUND'></img>
                </div>
            </div>

            <br></br>

            {props.showedRecipes.length === 0 ?
                <div className={style.load}>
                    <h5>Loading...</h5>
                </div> :
                <div className={style.recipes}>
                    {
                        showRecipes?.map(e => {
                            return (
                                <div className={style.recipe} key={prevId++}>
                                    <Card
                                        image={e.image}
                                        title={e.title}
                                        score={e.score}
                                        healthScore={e.healthScore}
                                        diets={e.diets}
                                        id={e.id}
                                    ></Card>

                                </div>
                            )
                        })
                    }
                </div>
            }


            <hr></hr>

            <div className={style.pag}>

                {
                    props.showedRecipes.length > 9 ?
                        <div className={style.pag}>
                            <Pagination recipesPage={recipesPage} showedRecipes={props.showedRecipes.length} paged={paged} setPage={setPage} page={page}></Pagination>
                            <span className={style.actual}> {page} of {Math.ceil(props.showedRecipes.length / recipesPage)} </span>
                        </div> :
                        <div><span className={style.actual}> {page} of {Math.ceil(props.showedRecipes.length / recipesPage)} </span>

                        </div>
                }
                <div>
                    <p className={style.derechos}>María Rosa Fuhr</p>
                    <p>Derechos reservados</p>
                </div>


            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        showedRecipes: state.showedRecipes,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFood: () => dispatch(getFood()),
        filterByTypeDiet: (payload) => dispatch(filterByTypeDiet(payload)),
        orderByAlphabet: (payload) => dispatch(orderByAlphabet(payload)),
        orderByScore: (payload) => dispatch(orderByScore(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)