

export const ContactForm = () => {
    return (
        <div id="contacto-form" className="contacto">
            <br></br>
            <form className="form-datos" method="post">
                <input id="nombre" className="datos" type="text" placeholder="Nombre" name="name" required></input>
                <input id="direccion" className="datos" type="text" placeholder="Dirección" name="direccion" required></input>
                <input id="email" className="datos dato-email" type="email" placeholder="Email" name="Email" required></input>
                <input id="telefono" className="datos dato-tel" type="tel" placeholder="Teléfono" name="telefono" required></input>
                <input id="asunto" className="datos" type="text" placeholder="Asunto" name="asunto" required></input>
                <br></br>
                <textarea id="text-area" className="datos" name="mensaje" itemID="mensaje" placeholder="Deja tu mensaje aquí..."></textarea>
                <br></br>
                <div className="botones-form">
                    <input id="submit" className="boton_form" type="submit"></input>
                    <input id="reset" className="boton_form" type="reset"></input>
                </div>
            </form>
            <br></br>
        </div>
    )
}
