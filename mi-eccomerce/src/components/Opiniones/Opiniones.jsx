import { useEffect, useState } from "react";
import { Banners } from "../Banners/Banners";
import { OpinionesContainer } from "../OpinionesContainer/OpinionesContainer";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/FireBaseConfig"



export const Opiniones = () => {

    const [opiniones, setOpiniones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getOpinionsDB = () => {
        const myOpinions = collection(db, "opinions")
        setIsLoading(true)
        getDocs(myOpinions)
            .then(resp => {
                const opinionsList = resp.docs.map(itm => {
                    const item = {
                        id: itm.id,
                        ...itm.data()
                    }
                    return item
                })
                setOpiniones(opinionsList)
                setIsLoading(false)
            })
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
