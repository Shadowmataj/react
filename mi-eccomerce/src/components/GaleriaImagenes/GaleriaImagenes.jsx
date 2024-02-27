

export const GaleriaImagenes = ({ image }) => {

    return (
        <>
            <img className={`${image.classname}`} src={image.imagen} alt="galeria_boost_music"/>
        </>
    )
}
