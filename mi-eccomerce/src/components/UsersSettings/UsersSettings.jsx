import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import config from "../../config/config";
import "./CSS/usersSettings.css";
import { UsersEditor } from "../UsersEditor/UsersEditor";

export const UsersSettings = ({ user }) => {

    const [cookies] = useCookies(["boostCookie"])

    const [productEditor, setProductEditor] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newUser, setNewuser] = useState({
        _id: user._id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        role: user.role || "",
    });

    const userChange = (formRegister) => {
        setNewuser({
            ...newUser,
            _id: formRegister._id,
            firstName: formRegister.firstName || "",
            lastName: formRegister.lastName || "",
            email: formRegister.email || "",
        })
        setProductEditor(!productEditor)
    }

    const handleProductEditor = () => {
        setProductEditor(!productEditor)
    }

    const handleDelete = () => {
        Swal.fire({
            icon: "question",
            title: "¿Deseas eliminar este usuario?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            showConfirmButton: true,
            confirmButtonText: "Confirmar"
        }).then(resp => {
            if (resp.isConfirmed) {
                const options = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': cookies.boostCookie
                    }
                }
                setIsLoading(true)
                console.log(user._id)
                fetch(`${config.BACKEND_ROUTE}/api/users/${user._id}`, options)
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.status === "ERROR") throw new Error(data.type)
                        setNewuser(null)
                        Swal.fire({
                            icon: "success",
                            title: "El usuario se ha eliminado."
                        })
                        setIsLoading(false)
                    })
                    .catch(err => {
                        console.log(err.message)
                    }
                    )

            }
        })
    }


    useEffect(() => {

    }, [newUser]);

    if (newUser === null) return (

        <user className="list-group-item d-flex  row align-items-center ">
            <strong className="col-12"><strong>ESTE USUARIO HA SIDO ELIMINADO</strong></strong>
        </user >
    )

    return (
        <>
            {
                isLoading ?
                    (<h2 style={{ textAlign: 'center', color: "white" }} > Loading... </h2 >) :
                    (<user className="list-group-item d-flex  row align-items-center ">
                        <strong className="col-3">{newUser.firstName} {newUser.lastName}</strong>
                        <div className="col-4">{newUser.email}</div>
                        <div className="col-2">{newUser.role}</div>
                        <div className="col-2 d-flex">
                            <button className="btn btn-secondary" onClick={handleProductEditor}>Editar</button>
                            <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                        </div>
                        {
                            productEditor ?
                                (<UsersEditor user={newUser} userChange={userChange} />) :
                                <></>
                        }
                    </user >)
            }
        </>
    )
}


