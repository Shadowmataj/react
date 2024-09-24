import { useContext } from "react"
import { useCookies } from "react-cookie"
import { Link, Navigate } from "react-router-dom"
import { CartContext } from "../../Context/CartContext"
import { UserContext } from "../../Context/UserContext"
import { Banners } from "../Banners/Banners"
import "./CSS/ProfileContainer.css"

export const ProfileContainer = () => {


    const [ cookies, setCookie] = useCookies(["boostCookie"])
    const { user, clearUser } = useContext(UserContext)
    const { clearFrontCart } = useContext(CartContext)

    const removeToken = () => {
        setCookie("boostCookie", "undefined", {maxAge: 0})
        clearUser()
        clearFrontCart()
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
                        user.role !== "user" ?
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