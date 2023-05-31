import React, { useState } from "react";
import style from './pagination.module.css'
import logo from '../styles/github.png'
import linke from '../styles/linkedin.png'


export default function Pagination({ recipesPage, showedRecipes, paged, setPage, page }) {

    const [input, setInput] = useState(1);

    const back = () => {
        setInput(parseInt(input) - 1);
        setPage(parseInt(input) - 1)
    }
    const next = () => {
        setInput(parseInt(input) + 1);
        setPage(parseInt(input) + 1)
    }

    let pag = (p) => {
        setInput(parseInt(p))
        paged(p);
    }

    const pages = [];

    for (let i = 1; i <= Math.ceil(showedRecipes / recipesPage); i++) {
        pages.push(i)
    };

    return (
        <div className={style.general}>
            <a href="https://github.com/Marifuhr"
                target="blank">
                <img className={style.git} src={logo} alt="Login"></img></a>

            <button className={style.bn} onClick={back} disabled={page <= 1}> ⮜ </button>
            {
                <nav>
                    <ul className={style.ul}>
                        {pages?.map((p) => (
                            <li className={style.list} key={p}>
                                <button className={style.btn} onClick={() => pag(p)}>{p}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            }
            <button className={style.bn} onClick={next} disabled={page === pages.length}> ⮞ </button>
            <a href="https://linkedin.com/in/maria-rosa-fuhr-78b839201"
                target="blank">
                <img className={style.linke} src={linke} alt="Linkedin"></img></a>

        </div>
    )
}