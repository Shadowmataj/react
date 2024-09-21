import { Link } from "react-router-dom"
import { CartWidget } from "../CartWidget/CartWidget"
import "./CSS/Header.css"
import { UserContext } from "../../Context/UserContext"
import { useContext } from "react"


export const Header = () => {

    const { user } = useContext(UserContext)

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to='/'>
                        <img src="https://static.wixstatic.com/media/441fa4_85ae90c35719431db66d38cc6420347a~mv2.png/v1/fill/w_161,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2.png"
                            alt="Boost Logo"></img>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav navbar">
                            <Link to='/marcas'>Marcas</Link>
                            <b className='separador'>|</b>
                            <Link to='/artistas'>Artistas</Link>
                            <b className='separador'>|</b>
                            <Link to='/products'>Productos</Link>
                            <b className='separador'>|</b>
                            <Link to='/galeria'>Galería</Link>
                            <b className='separador'>|</b>
                            <Link to='/opiniones'>Opiniones</Link>
                            <b className='separador'>|</b>
                            <Link to='/cart'>
                                <CartWidget />
                            </Link>
                            <div div className="sessions-container">
                                {
                                    user !== null ?
                                        (<Link to="./profile">Sesión</Link>) :
                                        (<Link to="./login">Iniciar sesión</Link>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    )
}
