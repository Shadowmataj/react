import { useContext } from "react"
import { Banners } from "../Banners/Banners"
import { UserContext } from "../../Context/UserContext"
import { Link, Navigate } from "react-router-dom"
import "./CSS/ProfileContainer.css"
import { useCookies } from "react-cookie"
import { CartContext } from "../../Context/CartContext"

export const ProfileContainer = () => {

    const [ cookies, setCookies] = useCookies(["boostCookie"])
    const { user, clearUser } = useContext(UserContext)
    const { clearCart } = useContext(CartContext)

    const removeToken = () => {
        setCookies(cookies.boostCookie, "undefined")
        clearUser()
        clearCart()
    }

    if (user === null) return (
        <Navigate to={"/login"} />
    )

    return (
        <>
            <Banners banner={"Profile"} />
            <div className="profile-container">
                <h2>Bienvenido {user.firstName} {user.lastName}</h2>
                <h2>Email: {user.email} </h2>
                <h2>Rol: {user.role} </h2>
                <button className="btn btn-success">
                    <Link to='/cart'>Carrito</Link>
                </button>

                <button className="btn btn-danger mt-2" onClick={removeToken}>
                    Cerrar sesión
                </button>

            </div>
            <br /><br />
        </>
    )
}