import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link, /* Redirect */ useHistory } from "react-router-dom"
import { createRecipe, getDiets } from "../redux/actions"
import style from './createRecipe.module.css';
import { validate } from '../validate'

function CreateRecipe(props) {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const dietas = useSelector(state => state.diets)
    const dispatch = useDispatch();
    const [tipos, setTipos] = useState([])


    const [input, setInput] = useState({
        title: "",
        summary: "",
        score: "",
        healthScore: "",
        image: "",
        steps: "",
        diets: [],
    })

    useEffect(() => {
        dispatch(getDiets())

    }, []);

    let handleChange = (e) => {
        const { name, value } = e.target
        e.preventDefault();
        setInput({
            ...input,
            [name]: value,
            diets: tipos,
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
    }
    console.log(errors);

    let handleSelect = (e) => {
        const { value } = e.target
        if (!tipos.includes(value)) {
            setTipos([...tipos, value])
        }
    }
    useEffect(() => {
        setInput({
            ...input,
            diets: tipos,
        })

    }, [tipos]);


    let handleClick = (data) => {
        let indiceSelect = tipos.indexOf(data)
        if (indiceSelect !== -1) {
            const info = tipos.filter((el, index) => index !== indiceSelect)
            setTipos(info)
        }
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0 && input.name !== "" && input.summary !== "") {


            props.createRecipe(input);
            setInput({
                title: "",
                summary: "",
                score: "",
                healthScore: "",
                image: "",
                steps: "",
                diets: [],
            })
            history.push('/home')
        } else {
            alert("Check the fields.")
        }
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
                        name={"title"}
                        value={input.title}
                        onChange={e => handleChange(e)}
                    ></input>
                    {!errors.title ? null : <p className={style.err}>{errors.title}</p>}
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
                    <div className={style.txt}>
                        <label>ADD DIET</label>
                        <select
                            type={"text"}
                            name={"diet"}
                            onChange={e => handleSelect(e)}>
                            {
                                dietas.map(el => <option key={el.id} value={el.name}>{el.name}</option>)
                            }
                        </select>
                        {/* {!errors.diets ? null : <p className={style.err}>{errors.diets}</p>} */}
                    </div>
                    <ul>
                        {
                            tipos.map(el => <li key={el}>{el}<button
                                type="button"
                                onClick={() => handleClick(el)}>X</button></li>)
                        }
                    </ul>
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