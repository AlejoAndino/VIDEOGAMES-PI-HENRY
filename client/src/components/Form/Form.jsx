import React from "react";
import style from './Form.module.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postGame, getGenres } from "../../actions/actions";
import validate from "./validations";
import video from '../../assets/videoHome.mp4';

export default function Form() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allGenres = useSelector((state) => state.myGenres);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        description: "",
        platforms: [],
        image: "",
        released: "",
        rating: "",
        genres: []
    })

    useEffect(() => {
        dispatch(getGenres());
    }, [])

    function handleChange(e) {
        if (e.target.name === 'platforms') {
            setInput({
                ...input,
                platforms: [e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        } else
            if (e.target.name === 'rating') {
                setInput({
                    ...input,
                    rating: Number(e.target.value)
                })
                setErrors(validate({
                    ...input,
                    [e.target.name]: e.target.value
                }))
            }
            else {
                setInput({
                    ...input,
                    [e.target.name]: e.target.value
                })
                setErrors(validate({
                    ...input,
                    [e.target.name]: e.target.value
                }))
            }
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErrors(validate({
            ...input,
            genres: [...input.genres, e.target.value]
        }))
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postGame(input));
        alert('Game created successfully');
        setInput({
            name: "",
            description: "",
            platforms: [],
            image: "",
            released: "",
            rating: 0,
            genres: []
        })
        navigate('/home');
    }

    function handleDelete(el) {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== el)
        })
    }
    // const disableSubmit = Object.keys(errors).length > 0; // Se usa para desactivar el boton si hay errores

    return (
        <div className={style.video_container}>
            <video className={style.video} src={video} autoPlay loop muted></video>
            <div className={style.form_container}>
                <h1 className={style.title}>Create your game:</h1>
                <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={style.inputs_container}>
                        <label className={style.labels}>Name:</label>
                        <input className={style.input}
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.name && (
                                <p className={style.errors}>{errors.name}</p>
                            )
                        }
                    </div>
                    <div className={style.inputs_container}>
                        <label className={style.labels}>Description:</label>
                        <input className={style.input}
                            type="text"
                            value={input.description}
                            name="description"
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.description && (
                                <p className={style.errors}>{errors.description}</p>
                            )
                        }
                    </div>
                    <div className={style.inputs_container}>
                        <label className={style.labels}>Platform:</label>
                        <input className={style.input}
                            type="text"
                            value={input.platforms}
                            name="platforms"
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.platforms && (
                                <p className={style.errors}>{errors.platforms}</p>
                            )
                        }
                    </div>
                    <div className={style.inputs_container}>
                        <label className={style.labels}>Image:</label>
                        <input className={style.input}
                            type="text"
                            value={input.image}
                            name="image"
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.image && (
                                <p className={style.errors}>{errors.image}</p>
                            )
                        }
                    </div>
                    <div className={style.inputs_container}>
                        <label className={style.labels}>Released:</label>
                        <input className={style.input}
                            type="text"
                            value={input.released}
                            name="released"
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.released && (
                                <p className={style.errors}>{errors.released}</p>
                            )
                        }
                    </div>
                    <div className={style.inputs_container}>
                        <label className={style.labels}>Rating:</label>
                        <input className={style.input}
                            type="number"
                            value={input.rating}
                            name="rating"
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.rating && (
                                <p className={style.errors}>{errors.rating}</p>
                            )
                        }
                    </div>
                    <div className={style.select_container}>
                        <label className={style.labels}>Select Genres:</label>
                        <select className={style.select} onChange={(e) => handleSelect(e)}>
                            {allGenres.map(el => {
                                return <option className={style.option} key={el.name} value={el.name}>{el.name}</option>
                            })}
                        </select>
                        {
                            errors.genres && (
                                <p className={style.errors}>{errors.genres}</p>
                            )
                        }
                        {
                            input.genres.map(el => {
                                return <button className={style.buttonGenres} key={el} onClick={() => handleDelete(el)}>{el} X</button>
                            })
                        }
                    </div>
                    <button className={style.buttonSubmit} type="submit" disabled={!!Object.keys(errors).length > 0}>Create Game</button>
                </form>
            </div>
        </div>
    )
}