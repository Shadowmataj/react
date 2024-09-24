import { useContext, useEffect, useState } from "react";
import config from "../../config/config";
import { Banners } from "../Banners/Banners";
import "./CSS/RegisterContainer.css";
import { ErrorNotification } from "../ErrorNotification/ErrorNotification";
import { Navigate } from "react-router-dom";
import { PassportOptions } from "../PassportOptions/PassportOptions";
import { UserContext } from "../../Context/UserContext";

export const RegisterContainer = () => {

    const { user } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [formRegister, setFormRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: 0,
        password: ""
    });

    const handleFirstName = (e) => {
        setFormRegister({
            ...formRegister,
            firstName: e.target.value
        })
    }

    const handleLastName = (e) => {
        setFormRegister({
            ...formRegister,
            lastName: e.target.value
        })
    }

    const handleEmail = (e) => {
        setFormRegister({
            ...formRegister,
            email: e.target.value
        })
    }

    const handleAge = (e) => {
        setFormRegister({
            ...formRegister,
            age: e.target.value
        })
    }

    const handlePassword = (e) => {
        setFormRegister({
            ...formRegister,
            password: e.target.value
        })
    }

    const handleRegistration = async (e) => {
        e.preventDefault()
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formRegister)
        }
        setIsLoading(true)
        fetch(`${config.BACKEND_ROUTE}/auth/register`, options)
            .then(resp => resp.json())
            .then(data => {
                setStatus(data.status)
                if (data.status === "ERROR") throw new Error(data.type)
                setIsLoading(false)
            })
            .catch(err => {
                setStatus("ERROR")
                setErrorMessage(err.message)
                setIsLoading(false)
            }
            )

    }
    useEffect(() => {
    }, []);


    if (status === "OK") {
        return (
            <Navigate to={"/login"} />
        )
    } 
    
    if (user !== null) {
        return (
            <Navigate to={"/profile"} />
        )
    } 

    return (
        <>
            <Banners banner={"Register"} />
            <div className="register-container">
                {
                    isLoading ?
                        (<h2 style={{ textAlign: 'center', color: "white" }} > Loading... </h2>) :
                        (
                            <>
                                <div className="d-flex column-gap-3 justify-content-center align-content-center" style={{ marginTop: "15px" }}>
                                    <PassportOptions />
                                </div>
                                <form onSubmit={handleRegistration} style={{ marginTop: "32px" }}>
                                    <div className="input-group" style={{ width: "100%", marginBottom: "32px" }}>
                                        <input type="text" name="firstName" className="form-control" placeholder="Nombre" value={formRegister.firstName || ""} onChange={handleFirstName} autoFocus="autoFocus" required></input>
                                    </div>

                                    <div className="input-group" style={{ width: "100%", marginBottom: "32px" }}>
                                        <input type="text" name="lastName" className="form-control" placeholder="Apellido" value={formRegister.lastName || ""} onChange={handleLastName} required="required"></input>
                                    </div>

                                    <div className="input-group" style={{ width: "100%", marginBottom: "32px" }}>
                                        <input type="email" name="email" className="form-control" placeholder="Email" value={formRegister.email || ""} onChange={handleEmail} required="required"></input>
                                    </div>

                                    <div className="input-group" style={{ width: "100%", marginBottom: "32px" }}>
                                        <input type="number" name="age" className="form-control" placeholder="Edad" value={formRegister.age || ""} onChange={handleAge} required="required"></input>
                                    </div>

                                    <div className="input-group" style={{ width: "100%", marginBottom: "32px" }}>
                                        <input type="password" name="password" className="form-control" placeholder="Contraseña" value={formRegister.password || ""} onChange={handlePassword} required="required"></input>
                                    </div>

                                    {
                                        status === "ERROR" ?
                                            (<ErrorNotification message={errorMessage} />) :
                                            <></>
                                    }

                                    <button type="submit" className="btn btn-success">Registrarse</button>

                                    <div style={{ marginTop: "24px" }}>
                                        ¿Ya tienes cuenta?: <a className="a2" href="login">Login</a>
                                    </div>
                                </form>
                            </>
                        )
                }
            </div>
            <br /><br />
        </>
    )
}
