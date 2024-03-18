import { useEffect, useState } from "react";
import { ArtistContainer } from "../ArtistContainer/ArtistContainer";
import { Banners } from "../Banners/Banners";
import { db } from "../../config/FireBaseConfig"
import './CSS/Artistas.css';
import { collection, getDocs } from "firebase/firestore";

export const Artistas = () => {

    const [artistas, setArtistas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getArtistsDB = () => {
        const myArtists = collection(db, "artists")
        setIsLoading(true)
        getDocs(myArtists)
            .then(resp => {
                let artistas = []
                const artistsList = resp.docs
                artistsList.map(itm => {
                    const item = {
                        id: itm.id,
                        ...itm.data()
                    }
                    artistas = [...artistas, item]
                })
                setArtistas(artistas)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getArtistsDB()
    }, []);



    return (
        <>
            <Banners banner={"Artistas"} />
            {isLoading ? (<h2 style={{ height: "63vh" }} className="loading-screen">Loading...</h2>) :
                (
                    <section className="martis-container">
                        <hr></hr>
                        {artistas.map(artista => (
                            <ArtistContainer key={artista.id} artista={artista} />
                        ))}
                    </section>
                )}
        </>
    )
}
