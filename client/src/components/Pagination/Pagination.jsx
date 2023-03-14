import React from "react";
import style from './Pagination.module.css';

export default function Pagination({ gamesPerPage, allGames, pagination }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={style.pagination_container}>
                {
                    pageNumbers &&
                    pageNumbers.map(number => {
                        return (
                                <button className={style.button} key={Math.random()} onClick={() => pagination(number)}>{number}</button>
                        )
                    })
                }
        </div>
    )
}