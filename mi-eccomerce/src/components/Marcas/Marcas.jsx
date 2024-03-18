import { useEffect, useState } from "react";
import { Banners } from "../Banners/Banners";
import { MarcasContainer } from "../MarcasContainer/MarcasContainer";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/FireBaseConfig"
import './CSS/Marcas.css';

export const Marcas = () => {

    const [marcas, setMarcas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getBrandsDB = () => {
        // Referencia a nuestra base de datos.
        const myBrands = collection(db, "brands")
        setIsLoading(true)
        getDocs(myBrands)
            .then(resp => {
                const brandsList = resp.docs.map(itm => {
                    const item = {
                        id: itm.id,
                        ...itm.data(),
                    }
                    return item
                })
                setMarcas(brandsList)
                setIsLoading(false)
            })
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
                        {marcas.map(marca => (
                            <MarcasContainer key={marca.id} marca={marca} />
                        ))}
                    </section>
                )}
        </>
    )
}
