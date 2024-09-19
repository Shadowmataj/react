import './CSS/ArtistContainer.css'

export const ArtistContainer = ({ artist }) => {
    return (
        <div className={`${artist.classconten}`} style={{backgroundImage: `url(${artist.image})`, backgroundPosition: `${artist.backpos}`}}>
            {artist.textposition == "texto-martis" && <div className="relleno"></div>}
            <div className={`${artist.textposition}`}>
                <h2>{artist.name}</h2>
                <div>
                    {artist.description}
                </div>
            </div>
            {artist.textposition == "texto-martis-invertido" && <div className="relleno"></div>}
        </div>
    )
}
