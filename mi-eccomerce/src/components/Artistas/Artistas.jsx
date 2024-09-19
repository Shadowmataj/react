import { useEffect, useState } from "react";
import config from "../../config/config";
import { ArtistContainer } from "../ArtistContainer/ArtistContainer";
import { Banners } from "../Banners/Banners";
import './CSS/Artistas.css';

export const Artistas = () => {

    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getArtistsDB = () => {
        setIsLoading(true)
        fetch(`${config.BACKEND_ROUTE}/api/artists`)
            .then(resp => resp.json())
            .then(data => {
                setArtists(data.payload)
                setIsLoading(false)
            }
            )
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
                        {artists.map(artist => (
                            <ArtistContainer key={artist._id} artist={artist} />
                        ))}
                    </section>
                )}
        </>
    )
}
