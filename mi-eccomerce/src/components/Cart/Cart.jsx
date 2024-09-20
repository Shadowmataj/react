import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import './CSS/Cart.css'
import Swal from 'sweetalert2'
import config from '../../config/config'

export const Cart = ({ _id, title, thumbnails, price, quantity, subtotal }) => {
    const { cart, removeItem } = useContext(CartContext)
    const [stock, setStock] = useState();

    fetch(`${config.BACKEND_ROUTE}/api/products/${_id}`)
        .then(resp => resp.json())
        .then(data => {
            setStock(data.payload.stock)
        })

    const handleRemoveItem = () => {

        Swal.fire({
            icon: "question",
            title: `¿Deseas eliminar "${title}" del carrito?`,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            showConfirmButton: true,
            confirmButtonText: "Confirmar"
        }).then(resp => {
            if (resp.isConfirmed) {
                removeItem(_id)
                Swal.fire({
                    icon: "success",
                    title: `El producto ${title} se ha eliminado del carrito`
                })
            }
        })

    useEffect(() => {
        
    }, []);

    }


    return (
        <article className="articulo-cart" style={{ backgroundImage: `url("https://static.wixstatic.com/media/${thumbnails}")` }}>
            <div className="cart-item-text">
                <strong>{title}</strong>
                <div>Cantidad: {quantity}</div>
                <div>Precio: ${price}</div>
                <div>Subtotal: ${subtotal}</div>
                <div className="quantity-container">
                    <button className="btn btn-dark" onClick={handleRemoveItem}> Eliminar artículo</button>
                </div>
                {
                    quantity > stock ?
                        <div style={{color: "red"}}>No se cuenta con suficientes piezas de este artículo.</div> :
                        (<></>)
                }
            </div>
        </article>
    )
}
