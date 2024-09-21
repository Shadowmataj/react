import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useSearchParams } from "react-router-dom";
import config from "../../config/config";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import { Banners } from "../Banners/Banners";
import { ErrorNotification } from "../ErrorNotification/ErrorNotification";
import { MessageNotification } from "../MessageNotification/MessageNotification";
import "./CSS/LoginContainer.css";

export const LoginContainer = () => {

    const [searchParams] = useSearchParams()
    const message = searchParams.get("message")

    const { user, saveUser } = useContext(UserContext)
    const { updateUserCart } = useContext(CartContext)

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [formLogin, setFormLogin] = useState({
        email: "",
        password: ""
    });
    const [setCookie ] = useCookies(["boostCookie"])

    const handleEmail = (e) => {
        setFormLogin({
            ...formLogin,
            email: e.target.value
        })
    }

    const handlePassword = (e) => {
        setFormLogin({
            ...formLogin,
            password: e.target.value
        })
    }

    const getToken = async (e) => {
        e.preventDefault()
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formLogin)
        }
        setIsLoading(true)
        fetch(`${config.BACKEND_ROUTE}/auth/jwtlogin`, options)
            .then(resp => resp.json())
            .then(data => {
                const options = {
                    maxAge: data.maxAge
                }
                setCookie(data.cookieName, data.token, options)
                setStatus(data.status)
                saveUser(data.payload)
                updateUserCart()
                setIsLoading(false)
            })
            .catch(err => {
                setStatus("ERROR")
                setErrorMessage("Usuario o contraseña no válidos")
                setIsLoading(false)
            }
            )
    }

    useEffect(() => {
    }, []);

    useEffect(() => {
        
    }, []);

    if (status === "OK" || user !== null) {
        return (
            <Navigate to={"/profile"} />
        )
    }

    return (

        <>
            <Banners banner={"Login"} />
            <div className="login-container">
                <div>
                    {
                        isLoading ?
                            (<h2 style={{ textAlign: 'center', color: "white" }} > Loading... </h2>) :
                            (<form onSubmit={getToken} style={{ marginTop: "32px" }}>
                                <div className="input-group" style={{ marginBottom: "32px" }}>
                                    <input type="email" name="email" className="form-control" placeholder="Nombre" value={formLogin.email || ""} onChange={handleEmail} autoFocus="autoFocus" required></input>
                                </div>

                                <div className="input-group" style={{ marginBottom: "32px" }}>
                                    <input type="password" name="password" className="form-control" placeholder="Contraseña" value={formLogin.password || ""} onChange={handlePassword} required="required"></input>
                                </div>

                                {
                                    status === "ERROR" ?
                                        (<ErrorNotification message={errorMessage} />) :
                                        <></>
                                }

                                {
                                    message ?
                                        (<MessageNotification message={message} />) :
                                        <></>
                                }

                                <div className="passport-options" style={{ marginTop: "24px" }}>
                                    <button className="btn btn-info submit_btn">Github</button>
                                    <button className="btn btn-info submit_btn">Google</button>
                                </div>
                                <br></br>
                                <br></br>
                                <button type="submit" className="btn btn-success">Ingresar</button>

                                <div style={{ marginTop: "24px" }}>
                                    ¿No tienes cuenta?: <a className="a2" href="register">Registrate</a>
                                </div>
                            </form>)
                    }
                </div>
            </div>
            <br /><br />
        </>
    )
}
