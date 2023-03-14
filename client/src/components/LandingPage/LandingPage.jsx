import { Link } from "react-router-dom";
import style from './LandingPage.module.css'
import video from '../../assets/videoo.mp4'

const LandingPage = () => {
    return (
        <div className={style.landingpage}>
            <video className={style.video} src={video} autoPlay loop muted></video>
            <div className={style.content}>
                <h1 className={style.text}>Game Library</h1>
                <Link to="/home">
                    <button className={style.button}>Get Into</button>
                </Link>
            </div>
        </div>
    )
};

export default LandingPage;
