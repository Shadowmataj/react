import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { ItemCount } from "../ItemCount/ItemCount";
import Swal from "sweetalert2"
import './CSS/ArticleDetails.css';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/FireBaseConfig";

export const ArticleDetails = ({ id, nombre, imagen, precio, texto }) => {

    const { addItem, cart } = useContext(CartContext)
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const article = doc(db, "products", id)

    const getArticle = () => {
        setIsLoading(true)
        getDoc(article)
            .then(resp => {
                setStock(resp.data().stock)
                setIsLoading(false)
            })
    }


    const addProduct = (quantity) => {
        const item = {
            id,
            precio,
            nombre,
            imagen
        }

        addItem(item, quantity)

        Swal.fire({
            icon: "success",
            title: "Se agregó el producto al carrito"
        })
    }
    useEffect(() => {
        getArticle()
    }, []);


    const onAdd = (quantity) => {
        const index = cart.findIndex(product => product.id == id)
        if (index != -1) {
            if (cart[index].quantity + quantity > stock) {
                Swal.fire({
                    icon: "error",
                    title: "No podemos agregar más piezas de este producto."
                })
            } else {
                addProduct(quantity)
            }
        } else {
            addProduct(quantity)
        }
    }


    return (
        <div className="details-container">
            <div>
                <img className="details-image" src={`https://static.wixstatic.com/media/${imagen}`} alt="" />
            </div>
            <div className="mb-5">
                <h1>{nombre}</h1>
            </div>
            <div className="text-container">
                <div>
                    <h2 style={{ textAlign: "center" }}>Especificaciones: </h2>
                    <div className="article-text " dangerouslySetInnerHTML={{ __html: texto }}></div>
                </div>
                <div className="stock-products">
                    <h2>Precio: ${precio}</h2>
                    {isLoading ?  (<h3>Loading...</h3>) : (< ItemCount stock={stock} onAdd={onAdd} />)}
                    <Link to={'/products'}>
                        <button className="btn btn-dark mt-1">Volver</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
