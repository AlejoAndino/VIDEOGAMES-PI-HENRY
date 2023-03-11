import React from "react";

export default function Pagination({ gamesPerPage, allGames, pagination }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
                {
                    pageNumbers &&
                    pageNumbers.map(number => {
                        return (
                                <button key={Math.random()} onClick={() => pagination(number)}>{number}</button>
                        )
                    })
                }
        </div>
    )
}