
export const CartRecap = ({ title, thumbnails, quantity }) => {

    
    return (
        <article className="articulo-cart" style={{ backgroundImage: `url("https://static.wixstatic.com/media/${thumbnails}")` }}>
            <div className="cart-item-text">
                <strong>{title}</strong>
                <div>Cantidad: {quantity}</div>
            </div>

        </article>
    )
}
