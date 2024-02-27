import { getOpinionesList } from "../../Base de datos";
import { Banners } from "../Banners/Banners";
import { useState, useEffect } from "react"
import { OpinionesContainer } from "../OpinionesContainer/OpinionesContainer";


export const Opiniones = () => {

    const [opiniones, setOpiniones] = useState([]);

    const getOpinions = () => {
        getOpinionesList()
        .then(result => setOpiniones(result))
        .catch(err=>console.log(err))
        .finally(console.log("Carga de información terminada."))
    }
    

    useEffect(() => {
        getOpinions()
    }, []);

    return (
        <>
            <Banners banner={"Opiniones"} />
            <section className="contenedor_opiniones">
                {opiniones.map(opinion => <OpinionesContainer key={opinion.id} opinion={opinion}/>)}
            </section>
        </>
    )
}
