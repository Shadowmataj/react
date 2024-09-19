import './CSS/MarcasContainer.css'

export const MarcasContainer = ({ brand }) => {

    return (
        <div className={`${brand.classconten}`} style={{backgroundImage: `url(${brand.image})`}}>
            {brand.textposition == "texto-martis" && <div className="relleno"></div>}
            <div className={`${brand.textposition}`}>
                <h2>{brand.name}</h2>
                <div>
                    {brand.description}
                </div>
            </div>
            {brand.textposition == "texto-martis-invertido" && <div className="relleno"></div>}
        </div>
    )
}
