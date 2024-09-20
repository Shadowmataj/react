export const MessageNotification = ({ message }) => {

    return (
        <>
            <div className="message-notification">
                <div className="alert alert-primary">
                    <h2>¡Mensaje!</h2>
                    <h3>{message}</h3>
                </div>
            </div>
        </>
    )
}
