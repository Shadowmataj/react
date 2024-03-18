import { useState, useEffect } from "react";


export const ItemCount = ({ stock, onAdd }) => {
    const [count, setCount] = useState(0);
    const [minusDisabled, setMinusDisabled] = useState(true);
    const [plusDisabled, setPlusDisabled] = useState(false);

    const plus = () => {
        setMinusDisabled(false)
        setCount(count + 1)
        if (count + 1 == stock) {
            setPlusDisabled(true)
        }
    }

    const minus = () => {
        setPlusDisabled(false)
        setCount(count - 1)
        if (count - 1 == 0) {
            setMinusDisabled(true)
        }
    }

    useEffect(() => {

    }, [count, plusDisabled, minusDisabled]);

    const addToCart = () => {
        if (count > 0) {
            onAdd(count)
        } else {
            console.log(`El número de artículos debe ser mayor a ${count}`)
        }
    }


    if (stock == 0) {
        return (<div>AGOTADO</div>)
    } else {
        return (
            <>
                <div className="counter-container">
                    <button disabled={plusDisabled} className="btn btn-dark" onClick={plus}>+</button>
                    <span className="counter">{count} </span>
                    <button className="btn btn-dark" disabled={minusDisabled} onClick={minus}>-</button>
                </div>
                <div>{stock} piezas disponibles</div>
                <button className="btn btn-dark mt-5" onClick={addToCart}>Agregar al carrito</button>
            </>
        )
    }
}
