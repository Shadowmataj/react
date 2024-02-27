import { Link } from "react-router-dom";

export const Articles = ({ article }) => {

    return (
        <article className="articulos">
            <strong>{article.nombre}</strong>
            <img className="img-article" src={`https://static.wixstatic.com/media/${article.imagen}`} alt="Guitarra_ESP/LTD"></img>
            <div className="compras">
                <div> Precios: ${article.precio}</div>
                <Link to={`/detalles/${article.id}`}>
                    <button className="buy-button">Detalles</button>
                </Link>
            </div>
        </article >
    )
}
