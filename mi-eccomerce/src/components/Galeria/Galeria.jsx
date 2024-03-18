
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/FireBaseConfig";
import { Banners } from "../Banners/Banners";
import { GaleriaImagenes } from "../GaleriaImagenes/GaleriaImagenes";
import { GaleriaVideos } from "../GaleriaVideos/GaleriaVideos";

export const Galeria = () => {

    const [imagenes, setImagenes] = useState([]);
    const [iframes, setIframe] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getGaleryDB = () => {
        setIsLoading(true)
        const myGalery = collection(db, "galery")
        getDocs(myGalery)
            .then(resp => {
                const galeryList = resp.docs.map(itm => {
                    const item = {
                        id: itm.id,
                        ...itm.data()
                    }
                    return item
                })
                setImagenes(galeryList)
            })
    }

    const getIframeDB = () => {
        const myIframe = collection(db, "iframes")

        getDocs(myIframe)
            .then(resp => {
                const iFrameList = resp.docs.map(itm => {
                    const item = {
                        id: itm.id,
                        ...itm.data()
                    }
                    return item
                })
                setIframe(iFrameList)
                
        setIsLoading(false)
            })
    }
    useEffect(() => {
        getGaleryDB()
        getIframeDB()
    }, []);


    return (
        <>
            <Banners banner={"Galeria"} />
            <section className="contenedor_galeria">
                {isLoading ? (<h2 style={{ height: "63vh" }} className="loading-screen">Loading...</h2>) : (
                    <>
                        <div className="img-container">
                            {imagenes.map(imagen =>
                                <GaleriaImagenes key={imagen.id} image={imagen} />
                            )}
                        </div>
                        <div className="videos-youtube">
                            {iframes.map(iframe =>
                                <GaleriaVideos key={iframe.id} iframe={iframe} />
                            )}
                        </div>
                    </>
                )}
            </section>
        </>
    )
}
