import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import config from "../../config/config";
import { UserContext } from "../../Context/UserContext";
import { ProductsEditor } from "../ProductsEditor/ProductsEditor";
import "./CSS/ArticlesSettings.css";

export const ArticlesSettings = ({ article }) => {

    const [cookies] = useCookies(["boostCookie"])
    const { user } = useContext(UserContext)

    const [productEditor, setProductEditor] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newArticle, setNewArticle] = useState({
        _id: article._id,
        title: article.title || "",
        description: article.description || "",
        thumbnails: article.thumbnails || "",
        price: article.price || 0,
        category: article.category || "",
        stock: article.stock || 0,
        code: article.code || "",
        status: article.status || "",
        owner: user.role || "admin"
    });

    const articleChange = (formRegister) => {
        setNewArticle({
            ...newArticle,
            title: formRegister.title,
            description: formRegister.description,
            thumbnails: formRegister.thumbnails,
            price: formRegister.price,
            category: formRegister.category,
            stock: formRegister.stock,
            code: formRegister.code,
            status: formRegister.status,
            owner: formRegister.role
        })
        setProductEditor(!productEditor)
    }

    const handleProductEditor = () => {
        setProductEditor(!productEditor)
    }

    const handleDelete = () => {
        Swal.fire({
            icon: "question",
            title: "¿Deseas eliminar este producto?",
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
                fetch(`${config.BACKEND_ROUTE}/api/products/${article._id}`, options)
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.status === "ERROR") throw new Error(data.type)
                        setNewArticle(null)
                        Swal.fire({
                            icon: "success",
                            title: "El producto se ha eliminado."
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

    }, [newArticle]);

    if (newArticle === null) return (

        <article className="list-group-item d-flex  row align-items-center ">
            <strong className="col-12"><strong>ESTE ARTÍCULO HA SIDO ELIMINADO</strong></strong>
        </article >
    )

    return (
        <>
            {
                isLoading ?
                    (<h2 style={{ textAlign: 'center', color: "white" }} > Loading... </h2 >) :
                    (<article className="list-group-item d-flex  row align-items-center ">
                        <strong className="col-4">{newArticle.title}</strong>
                        <div className="col-2">{newArticle.category}</div>
                        <div className="col-2">${newArticle.price}</div>
                        <button className="btn btn-secondary col-2" onClick={handleProductEditor}>Editar</button>
                        <button className="btn btn-danger col-2" onClick={handleDelete}>Eliminar</button>
                        {
                            productEditor ?
                                (<ProductsEditor article={newArticle} articleChange={articleChange} />) :
                                <></>
                        }
                    </article >)
            }
        </>
    )
}


