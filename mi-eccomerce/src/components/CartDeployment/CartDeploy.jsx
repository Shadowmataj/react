import { Cart } from '../Cart/Cart';
import './CSS/CartDeployment.css'
import { getCartList } from '../../Base de datos';
import { useState, useEffect } from 'react';

export const CartDeployment = () => {
    const [cart, setCart] = useState([]);
    const [totalCart, setTotalCart] = useState(0);

    const getCart = () => {
        getCartList()
            .then((resp) => {
                setCart(resp)
            })
            .catch((err) => console.log(err))
            .finally("Información del cart lista.")
    }

    const total = () => {
        const preciosList = cart.map((item) => item.precio)
        setTotalCart(
            preciosList.reduce((a, b) => a + b, 0)
        )
    }

    useEffect(() => {
        getCart()
        total()
    }, [cart,totalCart]);

    return (
        <div className='cart-deploy'>
            <h2 className='cart-name'>Carrito de compras</h2>
            {/* <section className='cart-products'> */}
            {cart.map(article =>
                <Cart key={article.id} article={article} />
            )}
            {/* </section> */}
            <div>Total: ${totalCart}</div>
        </div>
    )
}
