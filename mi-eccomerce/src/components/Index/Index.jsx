import { getProductsList } from "../../Base de datos";
import { useState, useEffect } from "react";
import { Articles } from "../Articles/Articles";
import './CSS/Index.css'
import { Contact } from "../Contact/Contact";

export const Index = () => {

    const [articulos, setArticulos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getArticles = () => {
        getProductsList().
            then(resp => {
                const filtro = resp.filter(articulo => articulo.id < 7)
                setArticulos(filtro)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
            .finally(console.log("Carga de artículos terminada."))
        console.log(articulos)
    }
    useEffect(() => {
        getArticles()
    }, []);



    return (

        <>
            <section className="imagen">
            </section >

            {isLoading ? (<h2 className="loading-screen">Loading...</h2>) :
                (<section className="producto">
                    {/* <!-- Sección de productos principales-- > */}
                    {articulos.map((articulo) => (
                        <Articles key={articulo.id} article={articulo} />
                    )
                    )}
                </section>
                )}

            <Contact />
            <br></br>
        </>
    )
}
