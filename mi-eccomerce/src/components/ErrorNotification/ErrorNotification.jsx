export const ErrorNotification = ({ message }) => {

    return (
        <>
            <div className="error-notification">
                <div className="alert alert-danger">
                    <h2>¡ERROR!</h2>
                    <h3>{message}</h3>
                </div>
            </div>
        </>
    )
}
