import { Link } from "react-router-dom"
import './CSS/ProductFilter.css'

export const ProductFilter = ({ categories }) => {
    return (
        <div className="filter-container">
            <Link to='/products'>
                <button className="btn btn-light">TODOS LOS PRODUCTOS</button>
            </Link>
            {
                categories.map(cat => (
                    <Link to={`/products/${cat}`}>
                        <button className="btn btn-light">{cat.toUpperCase()}</button>
                    </Link>
                ))
            }
        </div>
    )
}
