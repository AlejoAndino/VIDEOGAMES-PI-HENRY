import React from "react";
import style from './Home.module.css';
import video from '../../assets/videoHome.mp4'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGames, filterGamesByGenre, filterGamesCreated, orderGames } from "../../actions/actions";
import Card from '../Card/Card';
import Pagination from "../Pagination/Pagination";
import Loader from '../Loader/Loader';
import Filters from "../Filters/Filters";

export default function Home() {

    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.myGames);
    const detail = useSelector(state => state.myDetail);
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setgamesPerPage] = useState(15);
    const [loading, setLoading] = useState(true);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        const loadGames = async () => {
            if (!allGames.length) {
                setLoading(true);
                await dispatch(getGames());
            }
            setLoading(false);
        };
        loadGames();
    }, []);

    async function handleClick(e) {
        e.preventDefault();
        setLoading(true);
        await dispatch(getGames());
        setLoading(false);
    }

    function handleFilterGenre(e) {
        dispatch(filterGamesByGenre(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterCreated(e) {
        dispatch(filterGamesCreated(e.target.value));
        setCurrentPage(1);
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderGames(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div className={style.video_container}>
            <video className={style.video} src={video} autoPlay loop muted></video>
            <div className={style.home}>
                <button className={style.button_reload} onClick={e => { handleClick(e) }}>
                    Reload Game Library
                </button>
                <div className={style.filters_container}>
                    <Filters
                        handleSort={handleSort}
                        handleFilterGenre={handleFilterGenre}
                        handleFilterCreated={handleFilterCreated}
                    />
                    <Pagination
                        gamesPerPage={gamesPerPage}
                        allGames={allGames.length}
                        pagination={pagination}
                        currentPage={currentPage}
                    />
                    {loading && <Loader/>}
                    <div className={style.cards}>
                        {
                            currentGames && currentGames.map(el => {
                                return (
                                    <Card
                                        key={el.id}
                                        id={el.id}
                                        name={el.name}
                                        image={el.image}
                                        genres={el.genres}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}