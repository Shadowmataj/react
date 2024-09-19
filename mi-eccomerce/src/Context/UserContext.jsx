import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import config from "../config/config";



export const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [cookies] = useCookies(["boostCookie"])

    const sessionStatus = () => {
        if (cookies.boostCookie && cookies.boostCookie !== "undefined") {
            const options = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': cookies.boostCookie
                },
            }
            fetch(`${config.BACKEND_ROUTE}/auth/current`, options)
                .then(resp => resp.json())
                .then(data => {
                    saveUser(data.payload)
                })
        }
    }

    const saveUser = (userInfo) => {
        setUser(prevState => ({
            ...prevState,
            _id: userInfo._id,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            cart: userInfo.cart,
            role: userInfo.role
        }
        ))
    }

    const clearUser = () => {
        setUser(null)
    }

    useEffect(() => {
        sessionStatus()
    }, []);


    const values = {
        user,
        saveUser,
        clearUser
    }
    return <UserContext.Provider value={values}> {children} </UserContext.Provider>
}
