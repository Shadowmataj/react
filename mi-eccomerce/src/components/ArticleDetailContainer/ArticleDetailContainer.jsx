import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/FireBaseConfig";
import { ArticleDetails } from "../ArticleDetails/ArticleDetails";
import config from "../../config/config";

export const ArticlesDetailsContainer = () => {
    const { id } = useParams()

    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getArticlesDB = (id) => {
        
        setIsLoading(true)
        fetch(`${config.BACKEND_ROUTE}/api/products/${id}`)
            .then(resp => resp.json())
            .then(data => {
                setArticle(data.payload)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getArticlesDB(id)
    }, []);

    return (
        <>
            {
            isLoading ? (<h2 style={{ textAlign: 'center', color: "white" }}>Loading...</h2>) : (<ArticleDetails {...article} />)
            }
        </>
    )
}

