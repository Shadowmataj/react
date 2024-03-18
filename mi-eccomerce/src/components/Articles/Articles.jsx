import { Link } from "react-router-dom";

export const Articles = ({ nombre, imagen, id, precio }) => {

    return (
        <article className="articulos">
            <strong>{nombre}</strong>
            <img className="img-article" src={`https://static.wixstatic.com/media/${imagen}`} alt="Guitarra_ESP/LTD"></img>
            <div className="compras">
                <div> Precios: ${precio}</div>
                <Link to={`/details/${id}`}>
                    <button className="buy-button">Detalles</button>
                </Link>
            </div>
        </article >
    )
}
