import { useContext } from "react"
import { Banners } from "../Banners/Banners"
import { UserContext } from "../../context/UserContext"
import { Link, Navigate } from "react-router-dom"
import "./CSS/ProfileContainer.css"
import { useCookies } from "react-cookie"
import { CartContext } from "../../Context/CartContext"

export const ProfileContainer = () => {


    const [setCookie, removeCookie] = useCookies(["boostCookie"])
    const { user, clearUser } = useContext(UserContext)
    const { clearCart } = useContext(CartContext)

    const removeToken = () => {
        removeCookie("boostCookie")
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
                <div>
                    <h2>Bienvenido {user.firstName} {user.lastName}</h2>
                    <h2>Email: {user.email} </h2>
                    <h2>Rol: {user.role} </h2>
                </div>
                <hr className="vertical-line"/>
                <div className="user-buttons">
                    <button className="btn btn-success">
                        <Link to='/cart'>Carrito</Link>
                    </button>

                    {
                        user.role === "admin" ?
                            (<button className="btn btn-success mt-2">
                                <Link to='/admin/settings'>Settings</Link>
                            </button>):
                            (<></>)
                    }

                    <button className="btn btn-danger mt-2" onClick={removeToken}>
                        Cerrar sesión
                    </button>
                </div>

            </div>
            <br /><br />
        </>
    )
}