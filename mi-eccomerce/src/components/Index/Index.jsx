import { query, getDocs, limit, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/FireBaseConfig";
import { Articles } from "../Articles/Articles";
import { Contact } from "../Contact/Contact";
import './CSS/Index.css';

export const Index = () => {

    const [articulos, setArticulos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getArticlesDB = () => {
        const myArticle = query(collection(db, "products"), limit(6))
        setIsLoading(true)
        getDocs(myArticle)
            .then(resp => {
                const myArticleList = resp.docs.map(itm => {
                    const item = {
                        id: itm.id,
                        ...itm.data()
                    }
                    return item
                })
                setArticulos(myArticleList)
                setIsLoading(false)
            })
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
                    {articulos.map((articulo) => (
                        <Articles key={articulo.id} {...articulo} />
                    )
                    )}
                </section>
                )}

            <Contact />
            <br></br>
        </>
    )
}
