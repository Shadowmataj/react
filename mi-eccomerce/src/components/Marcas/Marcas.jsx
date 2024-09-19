import { useEffect, useState } from "react";
import { Banners } from "../Banners/Banners";
import { MarcasContainer } from "../MarcasContainer/MarcasContainer";
import './CSS/Marcas.css';
import config from "../../config/config";

export const Marcas = () => {

    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getBrandsDB = () => {
        
        setIsLoading(true)
        fetch(`${config.BACKEND_ROUTE}/api/brands`)
            .then(resp => resp.json())
            .then(data => {
                setBrands(data.payload)
                setIsLoading(false)
            }
            )
    }
    useEffect(() => {
        getBrandsDB()
    }, []);



    return (
        <>
            <Banners banner={"Marcas"} />
            {isLoading ? (<h2 style={{ height: "63vh" }} className="loading-screen">Loading...</h2>) :
                (
                    <section className="martis-container">
                        <hr></hr>
                        {brands.map(brand => (
                            <MarcasContainer key={brand._id} brand={brand} />
                        ))}
                    </section>
                )}
        </>
    )
}
