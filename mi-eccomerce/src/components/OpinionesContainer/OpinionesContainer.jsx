import './CSS/OpinionesContainer.css'

export const OpinionesContainer = ({ opinion }) => {

    return (
        <>
            <div className="opinion">
                <strong>{opinion.nombre}</strong>
                <p><i>"{opinion.opinion}"</i></p>
            </div>
        </>
    )
}