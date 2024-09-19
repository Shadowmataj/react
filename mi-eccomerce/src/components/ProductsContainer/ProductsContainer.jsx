import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Articles } from "../Articles/Articles";
import { Banners } from "../Banners/Banners";
import { ContactForm } from "../Contact Form/ContactForm";
import { ContactInfo } from "../ContactInfo/ContactInfo";
import { ProductFilter } from "../ProductFilter/ProductFilter";
import "./CSS/ProductsContainer.css"
import config from "../../config/config";

export const ProductsContainer = () => {
    const { category } = useParams()

    const [articles, setArticles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [prevPage, setPrevPage] = useState();
    const [nextPage, setNextPage] = useState();
    const [page, setPage] = useState(1);


    const getArticlesDB = (category, page) => {
        setIsLoading(true)
        let link = `${config.BACKEND_ROUTE}/api/products?page=${page}`
        if (category) link = `${link}&property=category&filter=${category}`
        fetch(link)
            .then(resp => resp.json())
            .then(data => {
                setArticles(data.payload)
                setCategories(data.categories)
                setPrevPage(data.hasPrevPage)
                setNextPage(data.hasNextPage)
                setIsLoading(false)
            })
            .catch(err => {
                setPage(1)
            }
            )
    }

    const changePageAdd = () => {
        if(nextPage) setPage(page + 1)
    }

    const changePageSub = () => {
        if(prevPage) setPage(page - 1)
    }


    useEffect(() => {
        getArticlesDB(category, page)
        // seedProducts() // importante, ejecutar una sola vez. 
    }, [category, page]);


    return (
        <>
            <Banners banner={"Productos"} />
            {isLoading ? (<h2 className="loading-screen"> Loading...</h2 >) :
                <>
                    <ProductFilter categories={categories} />
                    <section className="producto">
                        {articles.map(article => (
                            <Articles key={article._id} {...article} />
                        ))}
                    </section>
                    
                </>
            }
            <div className="page-buttons">
                <button className="btn btn-light" onClick={changePageSub}>Anterior</button>
                <p>{page}</p>
                <button className="btn btn-light" onClick={changePageAdd}>Siguiente</button>
            </div>

            <section className="contacto-container">
                <ContactInfo />
                <ContactForm />
            </section>
        </>
    )
}
