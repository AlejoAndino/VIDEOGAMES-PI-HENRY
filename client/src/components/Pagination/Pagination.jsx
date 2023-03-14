import React from "react";
import style from './Pagination.module.css';

export default function Pagination({ gamesPerPage, allGames, pagination, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={style.pagination_container}>
            <button
                className={style.button}
                onClick={() => pagination(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    className={`${style.button} ${number === currentPage ? style.active : ''}`}
                    onClick={() => pagination(number)}
                >
                    {number}
                </button>
            ))}
            <button
                className={style.button}
                onClick={() => pagination(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
            >
                Next
            </button>
        </div>
    )
}