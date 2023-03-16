import { CLEAR_DETAIL, FILTER_BY_GENRE, FILTER_CREATED, GET_DETAIL, GET_GAMES, GET_GAMES_BY_NAME, GET_GENRES, ORDER_GAMES, POST_GAME } from "../actions/actions-types";

const initialState = {
    myGames: [],
    myAllGames: [],
    myGenres: [],
    myDetail: [],
    filtersGenre: [],
    filtersOrder: [],
    filters: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_GAMES:
            return {
                ...state,
                myGames: payload,
                myAllGames: payload
            }
        case GET_GAMES_BY_NAME:
            return {
                ...state,
                myGames: payload
            }
        case GET_GENRES:
            return {
                ...state,
                myGenres: payload
            }
        case GET_DETAIL:
            return {
                ...state,
                myDetail: payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                myDetail: payload
            }
        case POST_GAME:
            return {
                ...state
            }
        case FILTER_BY_GENRE:
            let allGames = [...state.myAllGames];
            const gamesFiltered = payload === "All" ? allGames : allGames.filter(el => {
                let genre = [];
                el.genres.forEach(gen => {
                    if (gen === payload) {
                        genre.push(gen)
                    }
                })
                return genre.length;
            })
            return {
                ...state,
                myGames: gamesFiltered,
                filtersGenre: gamesFiltered,
                filters: gamesFiltered
            }
        case FILTER_CREATED:
            const gamesCreated = payload === 'created' ? state.myAllGames.filter(el => el.CreatedInDb) : state.myAllGames.filter(el => !el.CreatedInDb)
            return {
                ...state,
                myGames: payload === 'All' ? state.myAllGames : gamesCreated
            }
        case ORDER_GAMES:
            let allGamesCopy = [];
            if (state.filtersGenre.length) {
                allGamesCopy = [...state.filtersGenre];
            } else {
                allGamesCopy = [...state.myAllGames];

            }
            let sortedGames = payload === "ascAlphabet" ?
                allGamesCopy.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) : payload === 'desAlphabet' ?
                allGamesCopy.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                }) : payload === 'ascRating' ?
                allGamesCopy.sort((a, b) => {
                    return a.rating - b.rating;
                }) : payload === 'desRating' ?
                allGamesCopy.sort((a, b) => {
                    return b.rating - a.rating;
                }) : allGamesCopy
            return {
                ...state,
                myGames: sortedGames,
                filtersOrder: sortedGames,
                filters: sortedGames
            };
        default:
            return state
    }
}

export default reducer;