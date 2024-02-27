import { getArtistList } from "../../Base de datos";
import { useState, useEffect } from "react";
import './CSS/Artistas.css'
import { ArtistContainer } from "../ArtistContainer/ArtistContainer";
import { Banners } from "../Banners/Banners";

export const Artistas = () => {

    const [artistas, setArtistas] = useState([]);

    const getArtistas = () => {
        getArtistList().
            then(resp => {
                setArtistas(resp)
            })
            .catch(err => console.log(err))
            .finally(console.log("Carga de información terminada."))
        console.log(artistas)
    }
    useEffect(() => {
        getArtistas()
    }, []);



    return (
        <>
            <Banners banner={"Artistas"} />
            <section className="martis-container">
                <hr></hr>
                {artistas.map(artista => (
                    <ArtistContainer key={artista.id} artista={artista}/>
                ))}
            </section>
        </>
    )
}
