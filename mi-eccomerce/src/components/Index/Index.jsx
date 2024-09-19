import { query, getDocs, limit, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/FireBaseConfig";
import { Articles } from "../Articles/Articles";
import { Contact } from "../Contact/Contact";
import './CSS/Index.css';
import config from "../../config/config";

export const Index = () => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getArticlesDB = () => {
        setIsLoading(true)
        fetch(`${config.BACKEND_ROUTE}/api/products?limit=9&page=1`)
            .then(resp => resp.json())
            .then(data => {
                setArticles(data.payload)
                setIsLoading(false)
            }
            )
    }
    useEffect(() => {
        getArticlesDB()
    }, []);



    return (

        <>
            <section className="imagen">
            </section >

            {isLoading ? (<h2 className="loading-screen">Loading...</h2>) :
                (<section className="producto">
                    {/* <!-- Sección de productos principales-- > */}
                    {articles.map((articulo) => (
                        <Articles key={articulo._id} {...articulo} />
                    )
                    )}
                </section>
                )}

            <Contact />
            <br></br>
        </>
    )
}
