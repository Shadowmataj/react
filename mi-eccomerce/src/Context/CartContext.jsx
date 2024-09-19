import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useCookies } from "react-cookie";
import config from "../config/config";



export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {

    const { user } = useContext(UserContext)
    const [cookies] = useCookies(["boostCookie"])
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItem = (item, quantity) => {

        if (user !== null) {
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': cookies.boostCookie
                },
                body: JSON.stringify( { 
                    quantity: 1
                })
                }

            console.log(item)
            fetch(`${config.BACKEND_ROUTE}/api/carts/product/${item._id}`, options)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data.status)
                }).catch(err => {
                    console.log(err)
                })
        }
        // copia del carrito
        const cartCopy = [...cart]
        //   agrega productos al carrito.
        const index = cartCopy.findIndex(product => product.id === item._id)
        if (index != -1) {
            cartCopy[index].quantity = cartCopy[index].quantity + quantity
            cartCopy[index].subtotal = cartCopy[index].subtotal * cartCopy[index].quantity
            setCart(cartCopy)
        } else {
            const newItem = {
                ...item,
                quantity,
                subtotal: item.price * quantity
            }
            setCart([...cart, newItem])
        }
    }

    const removeItem = (_id) => {
        //   quitar un producto del carrito

        if (user !== null) {
            const options = {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': cookies.boostCookie
                }
                }

                console.log(_id)
            fetch(`${config.BACKEND_ROUTE}/api/carts/${user.cart}/product/${_id}`, options)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data.status)
                }
                ).catch(err => {
                    console.log(err)
                }
                )
        }
        let cartCopy = [...cart]
        cartCopy = cartCopy.filter(product => product._id != _id)
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

    const updateUserCart = () => {
        if (user !== null) {
            const options = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': cookies.boostCookie
                },
            }
            fetch(`${config.BACKEND_ROUTE}/api/carts/${user.cart}`, options)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    const newProducts = []
                    for (let item of data.payload.products) {
                        const filtereProduct = {
                            _id: item.id._id,
                            price: item.id.price,
                            title: item.id.title,
                            thumbnails: item.id.thumbnails,
                            quantity: item.quantity,
                            subtotal: item.id.price * item.quantity
                        }
                        newProducts.push(filtereProduct)
                    }
                    setCart(newProducts)
                })
        }
    }

    useEffect(() => {
        totalCart()
        itemsTotal()
    }, [cart]);

    useEffect(() => {
        updateUserCart()
    }, [user]);


    const values = {
        cart,
        totalItems,
        cartTotal,
        addItem,
        removeItem,
        clearCart,
        updateUserCart
    }
    return <CartContext.Provider value={values}> {children} </CartContext.Provider>
}
