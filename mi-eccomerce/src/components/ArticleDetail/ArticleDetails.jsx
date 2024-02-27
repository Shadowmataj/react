import { Link } from "react-router-dom"
import './CSS/ArticleDetails.css'
import { useState, useEffect } from "react";

export const ArticleDetails = ({ nombre, imagen, precio, text, inventory }) => {

    const [count, setCount] = useState(0);
    const [minusDisabled, setMinusDisabled] = useState(true);
    const [plusDisabled, setPlusDisabled] = useState(false);

    const plus = () => {
        setMinusDisabled(false)
        setCount(count + 1)
        if (count + 1 == inventory) {
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

    return (
        <div className="details-container">
            <div>
                <img className="details-image" src={`https://static.wixstatic.com/media/${imagen}`} alt="" />
            </div>
            <div className="mb-5">
                <h1>{nombre}</h1>
            </div>
            <div className="text-container">
                <div>
                    <h2 style={{textAlign: "center"}}>Especificaciones: </h2>
                    <div className="article-text " dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
                <div className="inventory-products">
                    <h2>Precio: ${precio}</h2>

                    {inventory == 0 ? (<div>AGOTADO</div>) :
                        (
                            <>
                                <div className="counter-container">
                                    <button disabled={plusDisabled} className="btn btn-dark" onClick={plus}>+</button>
                                    <span className="counter">{count} </span>
                                    <button className="btn btn-dark" disabled={minusDisabled} onClick={minus}>-</button>
                                </div>
                                <div>{inventory} piezas disponibles</div>
                            </>
                        )}


                    <Link to={'/productos/base'}>
                        <button className="btn btn-dark mt-5">Volver</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
