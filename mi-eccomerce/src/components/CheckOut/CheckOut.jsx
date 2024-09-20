import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { db } from "../../config/FireBaseConfig";
import { Banners } from "../Banners/Banners";
import { CartRecap } from "../CartRecap/CartRecap";
import "./CSS/CheckOut.css";
import { UserContext } from "../../Context/UserContext";
import { Navigate, parsePath } from "react-router-dom";
import { useCookies } from "react-cookie";
import config from "../../config/config";

export const CheckOut = () => {

    const [cookies] = useCookies(["boostCookie"])
    const { cart, cartTotal, clearCart, totalItems } = useContext(CartContext)
    const { user } = useContext(UserContext)

    const [formCheckOut, setFormCheckOut] = useState({
        street: "",
        postalCode: "",
        city: "",
        state: "",
        adressReferences: ""
    });

    const [orderId, setOrderId] = useState();
    const [cartCopy, setCartCopy] = useState([...cart]);
    const [totalCartCopy, setTotalCartCopy] = useState(cartTotal);

    const handleStreet = (e) => {
        setFormCheckOut({
            ...formCheckOut,
            street: e.target.value
        })
    }

    const handlePostalCode = (e) => {
        setFormCheckOut({
            ...formCheckOut,
            postalCode: e.target.value
        })
    }

    const handleCity = (e) => {
        setFormCheckOut({
            ...formCheckOut,
            city: e.target.value
        })
    }

    const handleState = (e) => {
        setFormCheckOut({
            ...formCheckOut,
            state: e.target.value
        })
    }

    const handleAdressReferences = (e) => {
        setFormCheckOut({
            ...formCheckOut,
            adressReferences: e.target.value
        })
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()

        if (user !== null) {
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': cookies.boostCookie
                },
                body: JSON.stringify({ adress: formCheckOut })
            }
            fetch(`${config.BACKEND_ROUTE}/api/carts/purchase`, options)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setOrderId(data.purchaseInfo._id)
                    clearCart()
                }).catch(err => {
                    console.log(err)
                }
                )
            }
            
        setFormCheckOut({
            street: "",
            postalCode: "",
            city: "",
            state: "",
            references: ""
        })
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
                        {cartCopy.map(product => (
                            < CartRecap key={product._id} {...product} />
                        ))}
                    </div>
                </div>
            </>
        )
    }
    if (user === null) return (
        <Navigate to={`/login?message=${encodeURI(`Para realizar una compra debes iniciar sesión.`)}`} />
    )
    if (totalItems < 1) return (
        <Navigate to={`/cart?message=${encodeURI(`Debes tener mínimo un artículo en el carrito.`)}`} />
    )


    return (
        <>
            <Banners banner={"Checkout"} />
            <div className="checkout-container">
                <div>
                    <div>Nombre: {user.firstName} {user.lastName}</div>
                    <div>Email: {user.email} </div>
                    <div>Dirección de envío:</div>
                </div>
                <form onSubmit={handlerSubmit}>
                    <label htmlFor="">Calle </label>
                    <input type="text" className="form-control" value={formCheckOut.street} onChange={handleStreet} required />
                    <label htmlFor="">Código Postal</label>
                    <input type="text" className="form-control" value={formCheckOut.postalCode} onChange={handlePostalCode} required />
                    <label htmlFor="">Ciudad</label>
                    <input type="text" className="form-control" value={formCheckOut.city} onChange={handleCity} required />
                    <label htmlFor="">Estado</label>
                    <input type="text" className="form-control" value={formCheckOut.state} onChange={handleState} required />
                    <label htmlFor="">Referencias</label>
                    <input type="text" className="form-control" value={formCheckOut.adressReferences} onChange={handleAdressReferences} required />

                    <input type="submit" className="btn btn-success mt-3 form-control checkout-button" value="Terminar la compra" />
                </form>
            </div>
            <br /><br />
        </>
    )
}
