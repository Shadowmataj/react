import './CSS/MarcasContainer.css'

export const MarcasContainer = ({ marca }) => {

    return (
        <div className={`${marca.classconten}`} style={{backgroundImage: `url(${marca.imagen})`}}>
            {marca.textposition == "texto-martis" && <div className="relleno"></div>}
            <div className={`${marca.textposition}`}>
                <h2>{marca.nombre}</h2>
                <div>
                    {marca.texto}
                </div>
            </div>
            {marca.textposition == "texto-martis-invertido" && <div className="relleno"></div>}
        </div>
    )
}
