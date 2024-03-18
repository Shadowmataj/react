import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/FireBaseConfig";
import { ArticleDetails } from "../ArticleDetails/ArticleDetails";

export const ArticlesDetailsContainer = () => {
    const { id } = useParams()

    const [articulo, setArticulo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getArticlesDB = (id) => {
        const myArticle = doc(db, "products", id)
        setIsLoading(true)
        getDoc(myArticle)
            .then(resp => {
                const product = {
                    id: resp.id,
                    ...resp.data()
                }
                setArticulo(product)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getArticlesDB(id)
    }, []);

    return (
        <>
            {
            isLoading ? (<h2 style={{ textAlign: 'center', color: "white" }}>Loading...</h2>) : (<ArticleDetails {...articulo} />)
            }
        </>
    )
}

