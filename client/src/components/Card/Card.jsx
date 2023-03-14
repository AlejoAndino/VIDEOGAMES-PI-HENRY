import style from "./Card.module.css"
import { Link } from "react-router-dom";

function Card({ id, name, image, genres, onClose }) {

    return (
        <div className={style.container_card}>
            <Link className={style.link} to={`/detail/${id}`}>
                <div className={style.container_name}>
                    <h2 className={style.name}>{name}</h2>
                    <img className={style.img} src={image} alt={name} />
                </div>
                <div className={style.container_genres}>
                    {genres.map((genre, index) => (
                        <h2 key={index} className={style.genre}>{genre}</h2>
                    ))}
                </div>
            </Link>
        </div >
    );
}


export default Card;