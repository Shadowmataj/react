import { createContext, useState, useEffect } from "react";



export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItem = (item, quantity) => {
        // copia del carrito
        const cartCopy = [...cart]
        //   agrega productos al carrito.
        const index = cartCopy.findIndex(product => product.id === item.id)
        if (index != -1) {
            cartCopy[index].quantity = cartCopy[index].quantity + quantity
            cartCopy[index].subtotal = cartCopy[index].subtotal * cartCopy[index].quantity
            setCart(cartCopy)
        } else {
            const newItem = {
                ...item,
                quantity,
                subtotal: item.precio * quantity
            }
            setCart([...cart, newItem])
        }
    }

    const removeItem = (id) => {
        //   quitar un producto del carrito
        let cartCopy = [...cart]
        cartCopy = cartCopy.filter(product => product.id != id)
        setCart(cartCopy)
    }

    const clearCart = () => {
        setCart([])
    }

    const totalCart = () => {
        const total = cart.reduce((acc, item) => acc + item.subtotal, 0)
        setCartTotal(total)
    }

    const itemsTotal = () => {
        const total = cart.reduce((acc, item) => acc + item.quantity, 0)
        setTotalItems(total)
    }



    useEffect(() => {
        totalCart()
        itemsTotal()
    }, [cart]);

    const values = {
        cart,
        totalItems,
        cartTotal,
        addItem,
        removeItem,
        clearCart,
    }
    return <CartContext.Provider value={values}> {children} </CartContext.Provider>
}
