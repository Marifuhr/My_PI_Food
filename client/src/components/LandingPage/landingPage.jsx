import React from "react";
import { Link } from "react-router-dom";
import video from '../styles/chef1.mp4'
import style from './landingPage.module.css';



export default function LandingPage() {
    return (
        <div className={style.container}>
            <video className={style.video} autoPlay loop muted>
                <source src={video} type='video/mp4'></source>

            </video>
            <div className={style.title}>
                <h1 >"Quieres una comida perfecta?" Acompáñala con una Buena Receta!!
                    
                </h1>
                <h2>Te invito a disfrutar nuestra amplia variedad</h2>
                
                <h3>Bienvenidos</h3>
                <Link to="/home" >
                    <button>Start</button>

                </Link>
            </div>
            <div className={style.overlay}></div>
        </div>

    )
}