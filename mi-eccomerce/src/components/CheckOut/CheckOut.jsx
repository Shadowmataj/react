import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { db } from "../../config/FireBaseConfig";
import { Banners } from "../Banners/Banners";
import { CartRecap } from "../CartRecap/CartRecap";
import "./CSS/CheckOut.css";

export const CheckOut = () => {

    const { cart, cartTotal, clearCart, totalItems } = useContext(CartContext)

    const [formCheckOut, setFormCheckOut] = useState({
        name: "",
        phone: 0,
        email: ""
    });

    const [orderId, setOrderId] = useState(null);
    const [cartCopy, setCartCopy] = useState([...cart]);
    const [totalCartCopy, setTotalCartCopy] = useState(cartTotal);

    const handleName = (e) => {
        setFormCheckOut({
            ...formCheckOut,
            name: e.target.value
        })
    }

    const handlePhone = (e) => {
        setFormCheckOut({
            ...formCheckOut,
            phone: e.target.value
        })
    }

    const handleEmail = (e) => {
        setFormCheckOut({
            ...formCheckOut,
            email: e.target.value
        })
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()
        const newOrder = {
            buyer: formCheckOut,
            items: cart,
            total: cartTotal,
            date: serverTimestamp() //método de firebase para obtener la fecha de la compra.
        }
        if (totalItems < 1) {

        } else {
            // Agregar la orden de compra a la base de datos
            const order = await addDoc(collection(db, "orders"), newOrder)
            //vaciar el formulario
            setFormCheckOut({
                name: "",
                phone: 0,
                email: ""
            })
            // Limpiamos carrito
            clearCart()

            setOrderId(order.id)
        }
    }

    if (orderId) {
        return (
            <>
                <Banners banner={"Checkout"} />
                <div className="recap-container">
                    <div className="order-id">
                        <h2>¡Muchas gracias por tu compra!</h2>
                        <h3>El ID de tu compra es {orderId}</h3>
                        <h3>El total es de ${totalCartCopy}</h3>
                    </div>
                    <div className="recap">
                        {cartCopy.map(producto => (
                            < CartRecap key={producto.id} {...producto} />
                        ))}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Banners banner={"Checkout"} />
            <div className="checkout-container">
                <form onSubmit={handlerSubmit}>
                    <label htmlFor="">Nombre </label>
                    <input type="text" className="form-control" value={formCheckOut.name} onChange={handleName} />
                    <label htmlFor="">Teléfono </label>
                    <input type="tel" className="form-control" value={formCheckOut.phone} onChange={handlePhone} />
                    <label htmlFor="">Email </label>
                    <input type="email" className="form-control" value={formCheckOut.email} onChange={handleEmail} />
                    <input type="submit" className="btn btn-success mt-3 form-control checkout-button" value="Terminar la compra" />
                </form>
            </div>
        </>
    )
}
