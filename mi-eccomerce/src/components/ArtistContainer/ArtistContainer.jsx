import './CSS/ArtistContainer.css'

export const ArtistContainer = ({ artista }) => {
    return (
        <div className={`${artista.classconten}`} style={{backgroundImage: `url(${artista.imagen})`, backgroundPosition: `${artista.backpos}`}}>
            {artista.textposition == "texto-martis" && <div className="relleno"></div>}
            <div className={`${artista.textposition}`}>
                <h2>{artista.nombre}</h2>
                <div>
                    {artista.texto}
                </div>
            </div>
            {artista.textposition == "texto-martis-invertido" && <div className="relleno"></div>}
        </div>
    )
}
