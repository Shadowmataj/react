
import { getGaleriaList, getIframeList } from "../../Base de datos";
import { Banners } from "../Banners/Banners"
import { GaleriaImagenes } from "../GaleriaImagenes/GaleriaImagenes"
import { GaleriaVideos } from "../GaleriaVideos/GaleriaVideos"
import { useState, useEffect } from "react";

export const Galeria = () => {

    const [imagenes, setImagenes] = useState([]);
    const [iframes, setIframe] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getGaleria = () => {
        getGaleriaList()
            .then(respuesta => {
                setImagenes(respuesta)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
            .finally(console.log("Carga de imágenes terminada."))
    }
    const getIframe = () => {
        getIframeList()
            .then(respuesta => setIframe(respuesta))
            .catch(err => console.log(err))
            .finally(console.log("Carga de iframes terminada."))
    }
    useEffect(() => {
        getGaleria()
        getIframe()
    }, []);


    return (
        <>
            <Banners banner={"Galeria"} />
            <section className="contenedor_galeria">
                {isLoading ? (<h2 style={{height: "63vh"}} className="loading-screen">Loading...</h2>) : (
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
