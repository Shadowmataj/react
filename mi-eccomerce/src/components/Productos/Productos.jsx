import { Banners } from "../Banners/Banners"
import { getProductsList } from "../../Base de datos"
import { useState, useEffect } from "react";
import { Articles } from "../Articles/Articles";
import { ContactInfo } from "../ContactInfo/ContactInfo";
import { ContactForm } from "../Contact Form/ContactForm";
import { useParams } from "react-router-dom";
import { ProductFilter } from "../ProductFilter/ProductFilter";

export const Productos = () => {
    const [articulos, setArticulos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);


    const { category } = useParams()

    const getArticles = (category) => {
        getProductsList()
            .then(result => {
                setCategories([...new Set(result.map(item => item.category))])
                if (category == 'base') {
                    setArticulos(result)
                } else {
                    setArticulos(result.filter(res => res.category == category))
                }
                setIsLoading(false)
            })
            .catch(err => console.log(err))
            .finally(console.log("Carga de información terminada."))
    }

    useEffect(() => {
        getArticles(category)
    }, [category]);


    return (
        <>
            <Banners banner={"Productos"} />
            {isLoading ? (<h2 className="loading-screen" > Loading...</h2 >) :
                <>
                    <ProductFilter categories={categories} />
                    (<section className="producto">
                        {articulos.map(articulo => (
                            <Articles key={articulo.id} article={articulo} />
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
