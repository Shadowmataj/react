import './CSS/Cart.css'

export const Cart = ({ article }) => {

    return (
        <article className="articulo-cart">
            <strong>{article.nombre}</strong>
            <img className="img-article-cart" src={article.imagen} alt="Guitarra_ESP/LTD"></img>
            <div className="precio-cart">
                <div>${article.precio}</div>
            </div>
        </article>
    )
}
