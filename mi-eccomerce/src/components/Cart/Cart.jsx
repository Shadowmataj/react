import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import './CSS/Cart.css'
import Swal from 'sweetalert2'
export const Cart = ({ id, nombre, imagen, precio, quantity, subtotal }) => {
    const { removeItem } = useContext(CartContext)
    
    const handleRemoveItem = () => {
        Swal.fire({
            icon: "question",
            title: `¿Deseas eliminar "${nombre}" del carrito?`,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            showConfirmButton: true,
            confirmButtonText: "Confirmar"
        }).then(resp => {
            if(resp.isConfirmed){
                removeItem(id)
                Swal.fire({
                    icon: "success",
                    title: `El producto ${nombre} se ha eliminado del carrito`
                })
            }
        })

    }
    


    return (
        <article className="articulo-cart" style={{ backgroundImage: `url("https://static.wixstatic.com/media/${imagen}")` }}>
            <div className="cart-item-text">
                <strong>{nombre}</strong>
                <div>Cantidad: {quantity}</div>
                <div>Precio: ${precio}</div>
                <div>Subtotal: ${subtotal}</div>
                <div className="quantity-container">
                    <button className="btn btn-dark" onClick={handleRemoveItem}> Eliminar artículo</button>
                </div>
            </div>

        </article>
    )
}
