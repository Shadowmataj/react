import { useEffect, useState } from "react";
import config from "../../config/config";
import { Banners } from "../Banners/Banners";
import { OpinionesContainer } from "../OpinionesContainer/OpinionesContainer";



export const Opiniones = () => {

    const [opiniones, setOpiniones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getOpinionsDB = () => {
        setIsLoading(true)
        fetch(`${config.BACKEND_ROUTE}/api/comments`)
            .then(resp => resp.json())
            .then(data => {
                setOpiniones(data.payload)
                setIsLoading(false)
            }
            )
    }


    useEffect(() => {
        getOpinionsDB()
    }, []);

    return (
        <>
            <Banners banner={"Opiniones"} />
            {isLoading ? (<h2 style={{ height: "63vh" }} className="loading-screen">Loading...</h2>) :
                (
                    <section className="contenedor_opiniones">
                        {opiniones.map(opinion => <OpinionesContainer key={opinion.id} opinion={opinion} />)}
                    </section>
                )}
        </>
    )
}
