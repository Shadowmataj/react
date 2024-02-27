import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getProductsList } from "../../Base de datos";
import { ArticleDetails } from "../ArticleDetail/ArticleDetails";

export const ArticlesDetailsContainer = () => {
    const [articulo, setArticulo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams()

    const getArticles = (id) => {
        getProductsList()
            .then(resp => {
                const art = resp.find(article => article.id == id)
                setArticulo(art)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
            .finally(console.log("Carga de información terminada."))
    }

    useEffect(() => {
        getArticles(id)
    }, []);

    return (
        <>
            {isLoading ? (<h2 style={{ textAlign: 'center', color: "white" }}>Loading...</h2>) : <ArticleDetails nombre={articulo.nombre} imagen={articulo.imagen} precio={articulo.precio} text={articulo.texto} inventory={articulo.inventory}/>
            }
        </>
    )
}
