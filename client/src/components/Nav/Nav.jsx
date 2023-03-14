import style from "./Nav.module.css"
import SearchBar from "../SearchBar/SearchBar";
import { useLocation, Link } from "react-router-dom";
import controller from '../../assets/controller.jpg'

export default function Nav({onSearch}) {
    const { pathname } = useLocation();
    return (
        pathname !== '/' ? (
        <div className={style.container}>
            <SearchBar/>
            <div className={style.about}>
                <img className={style.image} src={controller} alt="" />
                <Link to="/" className={style.link}>To Landing Page</Link>
                <Link to='/home' className={style.link}>Home</Link>
                <Link to='/creategame' className={style.link}>Create your own game</Link>
            </div>
        </div>
        ) : null
    )
}