import { ArticlesSettings } from "../ArticlesSettings/ArticlesSettings"

const ProductsSettingsList = ({ articles, changePageAdd, changePageSub, isLoading, page }) => {
    
    return (
        <div style={{ width: "80%" }}>
            {isLoading ? (<h2 className="loading-screen"> Loading...</h2 >) :
                <section className="list-group container m-4" style={{ width: "100%" }}>
                    {articles.map(article => (
                        <ArticlesSettings key={article._id} article= {article} />
                    )
                    )}
                </section>
            }
            <div className="page-buttons">
                <button className="btn btn-light" onClick={changePageSub}>Anterior</button>
                <p>{page}</p>
                <button className="btn btn-light" onClick={changePageAdd}>Siguiente</button>
            </div>
        </div>
    )
}

export default ProductsSettingsList
