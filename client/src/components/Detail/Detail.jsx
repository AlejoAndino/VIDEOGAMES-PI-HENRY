import React from "react";
import style from './Detail.module.css'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearDetail, getDetail } from "../../actions/actions";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        dispatch(getDetail(id)).then(() => {
            setLoading(false);
        });

        return () => {
            dispatch(clearDetail());
        }
    }, [dispatch, id])

    const detailGame = useSelector((state) => state.myDetail);


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={style.detailImage} style={{ backgroundImage: `url(${detailGame.image})`}}>
                    <div className={style.detail_container}>
                        <h1 className={style.title}>{detailGame.name}</h1>
                        <h2 className={style.id}>ID: {detailGame.id}</h2>
                        <h2 className={style.genres}>{detailGame.genres?.join(' ')}</h2>
                        <h3 className={style.description} dangerouslySetInnerHTML={{ __html: detailGame.description }}></h3>
                        <h4 className={style.desc}>Platforms:</h4>
                        <h5 className={style.paragraph}>{detailGame.platforms?.join(' ')}</h5>
                        <h4 className={style.desc}>Released:</h4>
                        <h5 className={style.paragraph}>{detailGame.released}</h5>
                        <h4 className={style.desc}>Rating:</h4>
                        <h5 className={style.paragraph}>{detailGame.rating}</h5>
                    </div>
                </div>
            )}
        </>
    )
}