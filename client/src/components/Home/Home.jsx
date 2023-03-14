import React from "react";
import style from './Home.module.css';
import video from '../../assets/videoHome.mp4'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGames, filterGamesByGenre, filterGamesCreated, orderGames } from "../../actions/actions";
import Card from '../Card/Card';
import Pagination from "../Pagination/Pagination";
import Loader from '../Loader/Loader';

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
                    <select className={style.select} onChange={e => handleSort(e)}>
                        <option value="all">Sorts</option>
                        <option value="ascAlphabet">Alphabetically Ascending</option>
                        <option value="desAlphabet">Alphabetically Descending</option>
                        <option value="ascRating">Ascending Rating</option>
                        <option value="desRating">Descending Rating</option>
                    </select>
                    <select className={style.select} onChange={e => handleFilterGenre(e)}>
                        <option value="All">All Genres</option>
                        <option value="Indie">Indie</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Action">Action</option>
                        <option value="RPG">RPG</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Casual">Casual</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Simulation">Simulation</option>
                        <option value="Arcade">Arcade</option>
                        <option value="Racing">Racing</option>
                        <option value="Platformer">Platformer</option>
                        <option value="Massively Multiplayer">Massively Multiplayer</option>
                        <option value="Sports">Sports</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Family">Family</option>
                        <option value="Board Games">Board Games</option>
                        <option value="Educational">Educational</option>
                        <option value="Card">Card</option>
                    </select>
                    <select className={style.select} onChange={e => handleFilterCreated(e)}>
                        <option value="all">All Games</option>
                        <option value="created">Created</option>
                        <option value="api">Existing</option>
                    </select>
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