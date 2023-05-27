import { Link } from "react-router-dom"
import "./home.css"

const Home = () => (
    <div className="home-container">
        <img src="/img/logo_observatorio.png" alt="" />
        <Link className="home-button" to="/main">Entrar</Link>
    </div>
)

export default Home