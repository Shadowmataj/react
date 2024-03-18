import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/FireBaseConfig";
import { Articles } from "../Articles/Articles";
import { Banners } from "../Banners/Banners";
import { ContactForm } from "../Contact Form/ContactForm";
import { ContactInfo } from "../ContactInfo/ContactInfo";
import { ProductFilter } from "../ProductFilter/ProductFilter";

export const ProductsContainer = () => {
    const { category } = useParams()
    
    const [articulos, setArticulos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);


    const getArticlesDB = (category) => {
        const myArticles = category ? query(collection(db, "products"), where("category", "==", category)) : collection( db, "products") //Se limita el número de productos, para evitar consumir la cantidad de descarga (lectura) límite de firebase.
        setIsLoading(true)
        getDocs(myArticles)
            .then(resp => {
                const articles = resp.docs.map(itm => {
                    const item = {
                        id: itm.id,
                        ...itm.data()
                    }
                    return item
                })
                setCategories([...new Set(articles.map(item => item.category))])
                setArticulos(articles)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getArticlesDB(category)
        // seedProducts() // importante, ejecutar una sola vez. 
    }, [category]);


    return (
        <>
            <Banners banner={"Productos"} />
            {isLoading ? (<h2 className="loading-screen"> Loading...</h2 >) :
                <>
                    <ProductFilter categories={categories} />
                    (<section className="producto">
                        {articulos.map(articulo => (
                            <Articles key={articulo.id} {...articulo} />
                        ))}
                    </section>
                    )
                </>
            }
            <section className="contacto-container">
                <ContactInfo />
                <ContactForm />
            </section>
        </>
    )
}
