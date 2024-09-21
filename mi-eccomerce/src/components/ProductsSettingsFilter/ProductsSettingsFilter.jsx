import { useEffect, useState } from "react";

const ProductsSettingsFilter = ({ categories, categoryChange }) => {

    const [category, setCategory] = useState("guitarras");

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    useEffect(() => {
        categoryChange(category)
    }, [category]);

    return (
        <select className="w-100" name="categories" id="categories" onChange={handleCategory}>
            <option value="todos">todos los productos</option>
            {categories.map(item => {
                return <option value={item}>{item}</option>
            })}
        </select >
    )
}

export default ProductsSettingsFilter