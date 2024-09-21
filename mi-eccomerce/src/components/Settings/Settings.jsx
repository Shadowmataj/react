import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import config from "../../config/config";
import { Banners } from "../Banners/Banners";
import ProductsSettingsFilter from "../ProductsSettingsFilter/ProductsSettingsFilter";
import ProductsSettingsList from "../ProductsSettingsList/ProductsSettingsList";
import UsersSettingsList from "../UsersSettingsList/UsersSettingsList";
import { UserContext } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

const Settings = () => {

    const {user} = useContext(UserContext)

    const [cookies] = useCookies(["boostCookie"])
    const [category, setCategory] = useState()
    const [articles, setArticles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [prevPage, setPrevPage] = useState();
    const [nextPage, setNextPage] = useState();
    const [page, setPage] = useState(1);
    const [hover, setHover] = useState(false);
    const [view, setView] = useState("products");
    const [users, setUsers] = useState();

    const getProductsDB = (category) => {
        setIsLoading(true)
        let link = `${config.BACKEND_ROUTE}/api/products?page=${page}`
        if(category && view === "products"){
            link = `${link}&property=category&filter=${category}`
        } 
        fetch(link)
            .then(resp => resp.json())
            .then(data => {
                if(data.status === "ERROR") throw new Error(data.type)
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

    const getUsersDB = () => {
        setIsLoading(true)
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': cookies.boostCookie
            },
        }
        fetch(`${config.BACKEND_ROUTE}/api/users?page=${page}`,options)
            .then(resp => resp.json())
            .then(data => {
                setUsers(data.payload)
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
        if (nextPage) setPage(page + 1)
    }

    const changePageSub = () => {
        if (prevPage) setPage(page - 1)
    }

    const categoryChange = (value) => {
        if (value === "todos") value = undefined
        setCategory(value)
    }

    const handleHoverEnter = () => {
        setHover(true)
    }
    const handleHoverLeave = () => {
        setHover(false)
    }

    const handleProductsView = () => {
        setCategory("")
        setView("products")
    }
    const handleUsersView = () => {
        getUsersDB()
        setView("users")
    }

    useEffect(() => {
        getProductsDB(category)
    }, [category, page, view]);

    if(user === null || user.role !== "admin") return (
        <Navigate to={"/profile"} />
    )


    return (
        <>
            <Banners banner={"Productos"} />
            <div className="d-flex justify-content-center align-content-center ms-5 mb-3" style={{ width: "90%" }}>
                <div className="container text-center rounded bg-light d-flex flex-column row-gap-3 border boder-dark-subtle" style={{ width: "20%", minHeight: "75vh" }}>
                    <h2>Settings</h2>
                    <div className="text-decoration-underline" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onClick={handleProductsView} style={{ cursor: hover ? "pointer" : "default" }}>Productos</div>
                    {
                        view === "products" ?
                            <ProductsSettingsFilter categories={categories} categoryChange={categoryChange} /> :
                            <></>
                    }
                    <div className="text-decoration-underline" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onClick={handleUsersView} style={{ cursor: hover ? "pointer" : "default" }}>Usuarios</div>
                </div>
                {
                    view === "products" ?
                        <ProductsSettingsList articles={articles} changePageAdd={changePageAdd} changePageSub={changePageSub} isLoading={isLoading} page={page} /> : <></>
                }

                {
                    view === "users" ?
                        <UsersSettingsList users={users} changePageAdd={changePageAdd} changePageSub={changePageSub} isLoading={isLoading} page={page} /> : <></>
                }

            </div>
        </>
    )
}
export default Settings