import { getMarcasList } from "../../Base de datos";
import { useState, useEffect } from "react";
import './CSS/Marcas.css'
import { Banners } from "../Banners/Banners";
import { MarcasContainer } from "../MarcasContainer/MarcasContainer";

export const Marcas = () => {

    const [marcas, setMarcas] = useState([]);

    const getMarcas = () => {
        getMarcasList().
            then(resp => {
                setMarcas(resp)
            })
            .catch(err => console.log(err))
            .finally(console.log("Carga de información terminada."))
        console.log(marcas)
    }
    useEffect(() => {
        getMarcas()
    }, []);



    return (
        <>
            <Banners banner={"Marcas"} />
            <section className="martis-container">
                <hr></hr>
                {marcas.map(marca => (
                    <MarcasContainer key={marca.id} marca={marca} />
                ))}
            </section>
        </>
    )
}
