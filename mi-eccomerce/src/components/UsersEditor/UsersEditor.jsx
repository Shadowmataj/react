import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import config from "../../config/config";
import { ErrorNotification } from "../ErrorNotification/ErrorNotification";

export const UsersEditor = ({ user, userChange }) => {

    const [cookies] = useCookies(["boostCookie"])

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const [formRegister, setFormRegister] = useState({
        _id: user._id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        role: user.role || "",
    })

    const handleTFirstName = (e) => {
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


    const handleRole = (e) => {
        setFormRegister({
            ...formRegister,
            role: e.target.value
        })
    }

    const handleRegistration = async (e) => {
        e.preventDefault()

        Swal.fire({
            icon: "question",
            title: "¿Deseas modificar este producto?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            showConfirmButton: true,
            confirmButtonText: "Confirmar"
        }).then(resp => {
            if (resp.isConfirmed) {
                const options = {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': cookies.boostCookie
                    },
                    body: JSON.stringify(formRegister)
                }
                setIsLoading(true)
                fetch(`${config.BACKEND_ROUTE}/api/users/${user._id}`, options)
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.status === "ERROR") throw new Error(data.type)
                        userChange(formRegister)
                        Swal.fire({
                            icon: "success",
                            title: "El producto se ha modificado."
                        })
                        setIsLoading(false)
                    })
                    .catch(err => {
                        setStatus("ERROR")
                        setErrorMessage(err.message)
                        setIsLoading(false)
                    }
                    )

            }
        })
    }

    useEffect(() => {
    }, []);

    return (
        <div>
            <div className="register-container">
                {
                    isLoading ?
                        (<h2 style={{ textAlign: 'center', color: "white" }} > Loading... </h2>) :
                        (
                            <form onSubmit={handleRegistration} style={{ marginTop: "32px" }}>
                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Nombre: </label>
                                    <input type="text" name="firstName" className="form-control" placeholder={formRegister.firstName} value={formRegister.firstName || ""} onChange={handleTFirstName} autoFocus="autoFocus" required></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Apellido: </label>
                                    <input type="text" name="lastName" className="form-control" placeholder={formRegister.lastName} value={formRegister.lastName || ""} onChange={handleLastName} required="required"></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Email: </label>
                                    <input type="email" name="email" className="form-control" placeholder={formRegister.email} value={formRegister.email || ""} onChange={handleEmail} required="required"></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Price: </label>
                                    <input type="text" name="role" className="form-control" placeholder={formRegister.role} value={formRegister.role} onChange={handleRole} required="required"></input>
                                </div>


                                {
                                    errorMessage !== null ?
                                        (<ErrorNotification message={errorMessage} />) :
                                        <></>
                                }
                                <button type="submit" className="btn btn-success">Realizar cambios</button>

                            </form>
                        )
                }
            </div >
            <br /><br />
        </div>
    )
}
