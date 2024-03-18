
export const CartRecap = ({ nombre, imagen, quantity }) => {

    
    return (
        <article className="articulo-cart" style={{ backgroundImage: `url("https://static.wixstatic.com/media/${imagen}")` }}>
            <div className="cart-item-text">
                <strong>{nombre}</strong>
                <div>Cantidad: {quantity}</div>
            </div>

        </article>
    )
}
