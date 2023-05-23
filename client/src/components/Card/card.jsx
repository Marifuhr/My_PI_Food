import React from "react";
import style from './card.module.css'
import { Link } from 'react-router-dom';
import img from '../styles/Star.png'
import img2 from '../styles/Star2.png'

let prevId = 1;

export default function Card(props) {
    const { title, image, score, healthScore, diets, id } = props;

    var stars = Math.round((score / 10) / 2)
    if (stars === 0) {
        stars = stars + 1;
    }
    var stars2 = Math.round((healthScore / 10) / 2)
    if (stars2 === 0) {
        stars2 = stars2 + 1;
    }

    return (
        <div className={style.card}>
        <div className={style.container}>
            <Link to={`/home/${id}`} className={style.link}>
                {
                    image ? <img className={style.img} src={image} alt="Img Not Found."></img>
                        :
                        <img className={style.img} src={"https://agencias.assist1.com.co/assets/images/no-image.png"} alt="Img Not Found."></img>
                    }
                    </Link>

                <div>
                    <h1 className={style.name}>{title}</h1>
                    <h3 className={style.h3}>Types of diets: </h3>
                    {
                        diets?.map(d => {
                            if (d.hasOwnProperty('title')) {
                                return (
                                    <p className={style.p1} key={prevId++}>- {d.title[0].toUpperCase() + d.title.slice(1)} </p>
                                )
                            } else {
                                return (
                                    <p className={style.p2} key={prevId++}>- {d[0].toUpperCase() + d.slice(1)} </p>
                                )
                            }
                        })
                    }
                </div>
                


            {/* LÓGICA PARA LAS ESTRELLAS */}
            {/* 0 - 19 --> 1
                20 - 49 --> 2
                50 - 69 --> 3
                70 - 89 --> 4
                90 - 100 --> 5 */}
            <div>
                {
                    stars === 1 ? <img className={style.star} src={img} alt="Img Not Found."></img>
                        : stars === 2 ? <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img></div>
                            : stars === 3 ? <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> </div>
                                : stars === 4 ? <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img></div>
                                    : <div><img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img> <img className={style.star} src={img} alt="Img Not Found."></img></div>
                }
            </div>
            <div>
                {
                    stars2 === 1 ? <img className={style.star} src={img2} alt="Img Not Found."></img>
                        : stars2 === 2 ? <div><img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img></div>
                            : stars2 === 3 ? <div><img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> </div>
                                : stars2 === 4 ? <div><img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img></div>
                                    : <div><img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img> <img className={style.star} src={img2} alt="Img Not Found."></img></div>
                }
            </div>


            </div>
            </div>
    )
};