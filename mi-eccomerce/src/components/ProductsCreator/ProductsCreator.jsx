import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

import { UserContext } from "../../Context/UserContext";
import config from "../../config/config";
import { ErrorNotification } from "../ErrorNotification/ErrorNotification";
import { toast, ToastContainer } from "react-toastify";

export const ProductsCreator = () => {

    const [cookies] = useCookies(["boostCookie"])

    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const [formRegister, setFormRegister] = useState({
        title: "",
        description: "",
        thumbnails: "",
        price: 0,
        category: "",
        stock: 0,
        code: "",
        status: false,
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
            status: e.target.checked
        })
        console.log(formRegister.status)
    }

    const handleRegistration = async (e) => {
        e.preventDefault()

        Swal.fire({
            icon: "question",
            title: "¿Deseas Crear este producto?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            showConfirmButton: true,
            confirmButtonText: "Confirmar"
        }).then(resp => {
            if (resp.isConfirmed) {
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': cookies.boostCookie
                    },
                    body: JSON.stringify(formRegister)
                }
                setIsLoading(true)
                fetch(`${config.BACKEND_ROUTE}/api/products/`,options)
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.status === "ERROR") throw new Error(data.type)
                        setFormRegister({
                            ...formRegister,
                            title: "",
                            description: "",
                            thumbnails: "",
                            price: 0,
                            category: "",
                            stock: 0,
                            code: "",
                            status: "",
                        })
                        Swal.fire({
                            icon: "success",
                            title: "El producto se ha creado."
                        })
                        setIsLoading(false)
                    })
                    .catch(err => {
                        setStatus("ERROR")
                        Swal.fire({
                            icon: "error",
                            title: "El producto no se ha podido crear."
                        })
                        setIsLoading(false)
                    }
                    )

            }
        })
    }


    useEffect(() => {
    }, []);

    return (
        <div style={{ width: "80%" }}>
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
                                    <input type="checkbox" checked={formRegister.status} name="status" onChange={handleStatus} value={formRegister.status} required="required"></input>
                                </div>

                                {
                                    errorMessage !== null ?
                                        (<ErrorNotification message={errorMessage} />) :
                                        <></>
                                }

                                <button type="submit" className="btn btn-success">Crear producto</button>
                            </form>
                        )
                }
            </div >
            <br /><br />
        </div>
    )
}
