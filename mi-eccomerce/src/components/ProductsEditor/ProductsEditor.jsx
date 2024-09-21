import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { UserContext } from "../../Context/UserContext";

import { ErrorNotification } from "../ErrorNotification/ErrorNotification";
import config from "../../config/config";

export const ProductsEditor = ({ article, articleChange }) => {

    const [cookies] = useCookies(["boostCookie"])

    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const [formRegister, setFormRegister] = useState({
        title: article.title || "",
        description: article.description || "",
        thumbnails: article.thumbnails || "",
        price: article.price || 0,
        category: article.category || "",
        stock: article.stock || 0,
        code: article.code || "",
        status: article.status || "",
        owner: user.role || "admin"
    })

    const handleTitle = (e) => {
        setFormRegister({
            ...formRegister,
            title: e.target.value
        })
    }

    const handleDescription = (e) => {
        setFormRegister({
            ...formRegister,
            description: e.target.value
        })
    }

    const handleThumbnails = (e) => {
        setFormRegister({
            ...formRegister,
            thumbnails: e.target.value
        })
    }

    const handlePrice = (e) => {
        setFormRegister({
            ...formRegister,
            price: e.target.value
        })
    }

    const handleCategory = (e) => {
        setFormRegister({
            ...formRegister,
            category: e.target.value
        })
    }

    const handleStock = (e) => {
        setFormRegister({
            ...formRegister,
            stock: e.target.value
        })
    }

    const handleCode = (e) => {
        setFormRegister({
            ...formRegister,
            code: e.target.value
        })
    }

    const handleStatus = (e) => {
        setFormRegister({
            ...formRegister,
            status: e.target.value
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
                fetch(`${config.BACKEND_ROUTE}/api/products/${article._id}`, options)
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.status === "ERROR") throw new Error(data.type)

                        articleChange(formRegister)
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
                                    <label className="align-content-center justify-content-center">Title: </label>
                                    <input type="text" name="title" className="form-control" placeholder={formRegister.title} value={formRegister.title || ""} onChange={handleTitle} autoFocus="autoFocus" required></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Description: </label>
                                    <input type="text" name="description" className="form-control" placeholder={formRegister.description} value={formRegister.description || ""} onChange={handleDescription} required="required"></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Thumbnails: </label>
                                    <input type="text" name="thumbnails" className="form-control" placeholder={formRegister.thumbnails} value={formRegister.thumbnails || ""} onChange={handleThumbnails} required="required"></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Price: </label>
                                    <input type="number" name="price" className="form-control" placeholder={formRegister.price} value={formRegister.price} onWheel={(e) => { e.target.blur() }} onChange={handlePrice} required="required"></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Category: </label>
                                    <input type="text" name="category" className="form-control" placeholder={formRegister.category} value={formRegister.category || ""} onChange={handleCategory} required="required"></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Stock: </label>
                                    <input type="number" name="stock" className="form-control" placeholder={formRegister.stock} value={formRegister.stock} onWheel={(e) => { e.target.blur() }} onChange={handleStock} required="required"></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Code: </label>
                                    <input type="text" name="code" className="form-control" placeholder={formRegister.code} value={formRegister.code || ""} onChange={handleCode} required="required"></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Status: </label>
                                    <input type="boolean" name="status" className="form-control" placeholder={formRegister.status} value={formRegister.status || ""} onChange={handleStatus} required="required"></input>
                                </div>

                                <div className="input-group d-flex gap-2" style={{ width: "100%", marginBottom: "32px" }}>
                                    <label className="align-content-center justify-content-center">Owner: </label>
                                    <input type="text" name="owner" className="form-control" placeholder={user.role} value={user.role || ""} required="required" disabled></input>
                                </div>

                                {
                                    errorMessage !== null ?
                                        (<ErrorNotification message={errorMessage} />) :
                                        <></>
                                }

                                <br></br>
                                <br></br>
                                <button type="submit" className="btn btn-success">Realizar cambios</button>

                            </form>
                        )
                }
            </div >
            <br /><br />
        </div>
    )
}
