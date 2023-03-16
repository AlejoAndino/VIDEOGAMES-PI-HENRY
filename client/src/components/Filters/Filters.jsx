import style from './Filters.module.css';


export default function Filters({ handleSort, handleFilterGenre, handleFilterCreated, selectedGenre }) {


    return (
        <div className={style.filters_div}>
            <div>
                <h3>Sorts by:</h3>
                <select className={style.select} onChange={e => handleSort(e)}>
                    <option value="all">Sorts Default</option>
                    <option value="ascAlphabet">Alphabetically Ascending</option>
                    <option value="desAlphabet">Alphabetically Descending</option>
                    <option value="ascRating">Ascending Rating</option>
                    <option value="desRating">Descending Rating</option>
                </select>
            </div>
            <div>
                <h3>Filter by Genre:</h3>
                <select className={style.select} onChange={e => handleFilterGenre(e)} value={selectedGenre}>
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
            </div>
            <div>
                <h3>Games Created:</h3>
                <select className={style.select} onChange={e => handleFilterCreated(e)}>
                    <option value="all">All Games</option>
                    <option value="created">Created</option>
                    <option value="api">Existing</option>
                </select>
            </div>
        </div>
    )
}