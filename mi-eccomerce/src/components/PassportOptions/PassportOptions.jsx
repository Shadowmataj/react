import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import config from "../../config/config"
import { useCookies } from "react-cookie"
import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"

export const PassportOptions = () => {
    const { user, saveUser } = useContext(UserContext)
    const [cookies, setCookie] = useCookies()

    const handlePassport = (passportSelection) => {
        const link = passportSelection === "git" ? config.GIT_PASSPORT : config.GGL_PASSPORT
        const popUp = window.open(link,
            "targetWindow",
            `toolbar=no,
            location=no,
            status=no,
            menubar=no
            scrollbars=yes,
            resizable=yes,
            width=620,
            height=350`
        )
        console.log(popUp)
        window.addEventListener("message", event => {
            if (event.origin === config.BACKEND_ROUTE) {
                if (event.data) {
                    saveUser(event.data.payload)
                    const options = {
                        maxAge: event.data.maxAge
                    }
                    setCookie(event.data.cookieName, event.data.token, options)
                    popUp.close()
                    location.reload()
                }
            }
        })
    }


    return (
        <>
            <div className="btn btn-light" onClick={(() => { handlePassport("git") })}>
                <FaGithub size={40} />
            </div>
            <div className="btn btn-light" onClick={(() => { handlePassport("ggl") })}>
                <FcGoogle size={40} />
            </div>
        </>
    )
}
