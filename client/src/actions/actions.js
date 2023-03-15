import axios from 'axios';
import { GET_GAMES, FILTER_BY_GENRE, FILTER_CREATED, ORDER_GAMES, GET_GAMES_BY_NAME, GET_GENRES, GET_DETAIL, CLEAR_DETAIL } from './actions-types';

export function getGames() {
    return async function (dispatch) {
        try {
            const response = await axios('http://localhost:3001/videogames');
            const data = response.data;
            return dispatch({
                type: GET_GAMES,
                payload: data
            }) 
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
           const response = await axios(`http://localhost:3001/videogame/${id}`);
           const data = response.data;
           return dispatch({
            type: GET_DETAIL,
            payload: data
           }) 
        } 
        catch (error) {
           console.log(error);
        }
    }
}

export function getGamesByName(name) {
    return async function (dispatch) {
        try {
            const response = await axios(`http://localhost:3001/videogames/name?name=${name}`);
            const data = response.data;
            return dispatch({
                type: GET_GAMES_BY_NAME,
                payload: data
            })    
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export function getGenres() {
    return async function (dispatch) {
        try {
            const response = await axios('http://localhost:3001/genres');
            const data = response.data;
            return dispatch({
                type: GET_GENRES,
                payload: data
            })    
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export function postGame(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/videogames', payload);
            console.log(response);
            return response;    
        } 
        catch (error) {
            console.log(error);
        }
    }
}

export function filterGamesByGenre(payload) {
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export function filterGamesCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function orderGames(payload) {
    console.log(payload)
    return {
        type: ORDER_GAMES,
        payload
    }
}

export function clearDetail() {
    return {
        type: CLEAR_DETAIL,
        payload: {}
    }
}