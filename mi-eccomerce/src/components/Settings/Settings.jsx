import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import config from "../../config/config";
import { UserContext } from "../../Context/UserContext";
import { Banners } from "../Banners/Banners";
import { DeleteUsersByTime } from "../DeleteUsersByTime/DeleteUsersByTime";
import ProductsSettingsFilter from "../ProductsSettingsFilter/ProductsSettingsFilter";
import ProductsSettingsList from "../ProductsSettingsList/ProductsSettingsList";
import UsersSettingsList from "../UsersSettingsList/UsersSettingsList";
import { ProductsCreator } from "../ProductsCreator/ProductsCreator";

const Settings = () => {

    const { user } = useContext(UserContext)

    const [cookies, setCookie, removeCookie, updatecookies] = useCookies(["boostCookie"])
    const [category, setCategory] = useState()
    const [articles, setArticles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [prevPage, setPrevPage] = useState();
    const [nextPage, setNextPage] = useState();
    const [createButton, setCreateButton] = useState(false);
    const [page, setPage] = useState(1);
    const [hover, setHover] = useState(false);
    const [view, setView] = useState("products");
    const [users, setUsers] = useState();

    const getProductsDB = (category) => {
        let link = `${config.BACKEND_ROUTE}/api/products?page=${page}`
        if (category && view === "products") {
            link = `${config.BACKEND_ROUTE}/api/products?page=${page}&property=category&filter=${category}`
        }
        setIsLoading(true)
        fetch(link)
            .then(resp => resp.json())
            .then(data => {
                if (data.status === "ERROR") throw new Error(data.type)
                setArticles(data.payload)
                setView("products")
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
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': cookies.boostCookie
            },
        }
        setIsLoading(true)
        fetch(`${config.BACKEND_ROUTE}/api/users?page=${page}`, options)
            .then(resp => resp.json())
            .then(data => {
                setUsers(data.payload)
                setView("users")
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
        getProductsDB(category)
    }
    const handleUsersView = () => {
        getUsersDB()
    }

    useEffect(() => {
        if (view === "products") handleProductsView()
        else if (view === "users") handleUsersView()
    }, [category, page, view]);

    if (user === null || user.role === "user") return (
        <Navigate to={"/profile"} />
    )

    useEffect(() => {

    }, []);


    return (
        <>
            <Banners banner={"Productos"} />
            <div className="d-flex justify-content-center align-content-center ms-5 mb-3" style={{ width: "90%" }}>
                <div className="container text-center rounded bg-light d-flex flex-column row-gap-3 border boder-dark-subtle" style={{ width: "20%", minHeight: "75vh" }}>
                    <h2>Settings</h2>
                    <div className="text-decoration-underline" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onClick={handleProductsView} style={{ cursor: hover ? "pointer" : "default" }}>Productos</div>
                    {
                        view === "products" ?
                            (<>
                                <ProductsSettingsFilter categories={categories} categoryChange={categoryChange} />
                                {createButton ?
                                    (<button className="btn btn-dark" onClick={() => { setCreateButton(!createButton) }}>Ver productos</button>) :
                                    (<button className="btn btn-dark" onClick={() => { setCreateButton(!createButton) }}>Crear producto</button>)
                                }
                            </>) :
                            <></>
                    }
                    {
                        user.role === "admin" ?
                            <>
                                <div className="text-decoration-underline" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onClick={handleUsersView} style={{ cursor: hover ? "pointer" : "default" }}>Usuarios</div>
                                {
                                    (view === "users") ?
                                        <DeleteUsersByTime getUsersDB={getUsersDB} /> :
                                        <></>
                                }
                            </> :
                            <></>

                    }
                    <div className="text-decoration-underline" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onClick={() => location.assign("/profile")} style={{ cursor: hover ? "pointer" : "default" }}>
                        Perfil
                    </div>

                </div>
                {
                    (view === "products") ?
                        (createButton ?
                            (<ProductsCreator />) :
                            (<ProductsSettingsList articles={articles} changePageAdd={changePageAdd} changePageSub={changePageSub} isLoading={isLoading} page={page} />)) :
                        <></>
                }

                {
                    view === "users" ?
                        <UsersSettingsList usersList={users} changePageAdd={changePageAdd} changePageSub={changePageSub} isLoading={isLoading} page={page} /> : <></>
                }

            </div>
        </>
    )
}
export default Settings