import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../../Context/CartContext";
import config from "../../config/config";
import { ItemCount } from "../ItemCount/ItemCount";
import './CSS/ArticleDetails.css';

export const ArticleDetails = ({ _id, title, thumbnails, price, description }) => {

    const { addItem, cart } = useContext(CartContext)
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);



    const getArticle = () => {
        setIsLoading(true)
        fetch(`${config.BACKEND_ROUTE}/api/products/${_id}`)
            .then(resp => resp.json())
            .then(data => {
                setStock(data.payload.stock)
                setIsLoading(false)
            })
    }


    const addProduct = (quantity) => {
        const item = {
            _id,
            price,
            title,
            thumbnails
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
        const index = cart.findIndex(product => product._id == _id)
        if (index != -1 && (cart[index].quantity + quantity > stock)) {
            Swal.fire({
                icon: "error",
                title: "No podemos agregar más piezas de este producto."
            })
        } else {
            addProduct(quantity)
        }
    }


    return (
        <div className="details-container">
            <div>
                <img className="details-image" src={`https://static.wixstatic.com/media/${thumbnails}`} alt="" />
            </div>
            <div className="mb-5">
                <h1>{title}</h1>
            </div>
            <div className="text-container">
                <div>
                    <h2 style={{ textAlign: "center" }}>Especificaciones: </h2>
                    <div className="article-text " dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
                <div className="stock-products">
                    <h2>Precio: ${price}</h2>
                    {isLoading ? (<h3>Loading...</h3>) : (< ItemCount stock={stock} onAdd={onAdd} />)}
                    <Link to={'/products'}>
                        <button className="btn btn-dark mt-1">Volver</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
