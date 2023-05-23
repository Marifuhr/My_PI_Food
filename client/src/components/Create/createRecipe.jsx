import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, /* Redirect */ useHistory } from "react-router-dom"
import { createRecipe, getDiets } from "../redux/actions"
import style from './createRecipe.module.css';
import {validate} from '../validate'

function CreateRecipe(props) {
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        summary: "",
        score: "",
        healthScore: "",
        image: "",
        steps: "",
        diets: [],
        diet: "",
    })

    useEffect(() => {
        props.getDiets()
     
    }, []);

    let handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        }) 
            
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
            }));
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0 && input.name !== "" && input.summary !== "") {
            if (input.diet) {
                input.diets.push(input.diet.toLowerCase());
            }
           
            props.createRecipe(input);
            setInput({
                name: "",
                summary: "",
                score: "",
                healthScore: "",
                image: "",
                steps: "",
                diets: [],
                diet: "",
            })
            history.push('/home')
        } else {
            alert("Check the fields.")
        }
    }

    let handleCheck = (e) => {
        let newArray = input.diets;
        let find = newArray.indexOf(e.target.value);

        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }

        setInput({
            ...input,
            diets: newArray
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <div>
            <div className={style.enc}>

                <div>
                    <h1 className={style.title}>
                        Create Recipe
                    </h1>
                </div>

                <div>
                    <hr className={style.hr}></hr>
                </div>

            </div>

            <form className={style.form} onSubmit={handleSubmit}>

                <div className={style.div1}>
                    <div><label>Name: </label></div>
                    <input
                        type={"text"}
                        name={"name"}
                        value={input.title}
                        onChange={e => handleChange(e)}
                    ></input>
                    {!errors.name ? null : <p className={style.err}>{errors.name}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>Summary: </label></div>
                    <textarea
                        className={style.inputext}
                        type={"text"}
                        name={"summary"}
                        value={input.summary}
                        onChange={e => handleChange(e)}
                    ></textarea>
                    {!errors.summary ? null : <p className={style.err}>{errors.summary}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>Score: </label></div>
                    <input
                        className={style.inputScore}
                        type={"number"}
                        name={"score"}
                        value={input.score}
                        onChange={e => handleChange(e)}
                    ></input>
                    {!errors.score ? null : <p className={style.err}>{errors.score}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>Health Score: </label></div>
                    <input
                        className={style.inputScore}
                        type={"number"}
                        name={"healthScore"}
                        value={input.healthScore}
                        onChange={e => handleChange(e)}
                    ></input>
                    {!errors.healthScore ? null : <p className={style.err}>{errors.healthScore}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>URL Image: </label></div>
                    <input
                        className={style.input}
                        type={"url"}
                        name={"image"}
                        value={input.image}
                        onChange={e => handleChange(e)}
                    ></input>
                    {!errors.image ? null : <p className={style.err}>{errors.image}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>Steps: </label></div>
                    <textarea
                        className={style.inputext}
                        type={"text"}
                        name={"steps"}
                        value={input.steps}
                        onChange={e => handleChange(e)}
                    ></textarea>
                    {!errors.steps ? null : <p className={style.err}>{errors.steps}</p>}
                </div>

                <div>
                    <div className={style.txt}><label>Types of diet: </label></div>
                    <br></br>
                    {props.diets.slice(0, 13).map(d => {
                        return (
                            <div key={d} className={style.list}>
                                <label> {d[0].toUpperCase() + d.slice(1)}</label>
                                <input type="checkbox" name={d} value={d} onChange={e => handleCheck(e)} />
                            </div>
                        )
                    })}
                    {!errors.diets ? null : <p className={style.err}>{errors.diets}</p>}
                </div>

                <div>
                    <div className={style.txt}>
                        <label>ADD Diet: </label>
                    </div>
                    <div>
                        <input type="text" name={"diet"} value={input.diets} onChange={e => handleChange(e)}></input>
                    </div>
                    {!errors.diets ? null : <p className={style.err}>{errors.diets}</p>}
                </div>

                <br></br>
                <div>
                    <button className={style.btn1} type="submit" >CREATE</button>
                </div>
                <br></br>
                <div>
                    <Link to="/home"><button className={style.btn2}>GO BACK</button></Link>
                </div>
                <br></br>

            </form>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        diets: state.diets,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createRecipe: (payload) => dispatch(createRecipe(payload)),
        getDiets: () => dispatch(getDiets()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);