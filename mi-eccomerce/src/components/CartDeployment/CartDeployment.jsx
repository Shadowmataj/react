import { useContext, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Banners } from '../Banners/Banners';
import { Cart } from '../Cart/Cart';
import './CSS/CartDeployment.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const CartDeployment = () => {

    const { cart, cartTotal, clearCart } = useContext(CartContext)

    const handleClearCart = () => {

        Swal.fire({
            icon: "question",
            title: "¿Deseas borrar todos los productos de tu carrito?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            showConfirmButton: true,
            confirmButtonText: "Confirmar"
        }).then(resp => {
            if (resp.isConfirmed) {
                clearCart()
                Swal.fire({
                    icon: "success",
                    title: "El carrito se ha vaciado."
                })
            } 
        })
    }


    useEffect(() => {

    }, [cart]);

    return (
        <>
            <Banners banner={"Carrito de compras"} />
            <div className='cart-deploy'>
                {cartTotal < 1 ? (<h4>El carrito está vacío </h4>) :
                    <>
                        {cart.map(article =>
                            < Cart key={article._id} {...article} />
                        )}
                        <div>Total: ${cartTotal}</div>
                        <div className='mb-3 mt-3'>
                            <button className='btn btn-danger m-3' onClick={handleClearCart}>Vaciar carrito</button>
                            <Link to='/checkout'>
                                <button className='btn btn-success m-3'>Comprar</button>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
