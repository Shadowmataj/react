import { Link } from "react-router-dom";

export const Articles = ({ name, thumbnails, _id, price }) => {

    return (
        <article className="articulos">
            <strong>{name}</strong>
            <img className="img-article" src={`https://static.wixstatic.com/media/${thumbnails}`} alt="Guitarra_ESP/LTD"></img>
            <div className="compras">
                <div> Precios: ${price}</div>
                <Link to={`/details/${_id}`}>
                    <button className="buy-button">Detalles</button>
                </Link>
            </div>
        </article >
    )
}
