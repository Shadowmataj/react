import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import config from "../../config/config";


export const DeleteUsersByTime = ({getUsersDB}) => {

    const [cookies, setCookie] = useCookies(["boostCookie"])

    const handleDeleteUsers = () => {
        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'authorization': cookies.boostCookie
            }
        }

        fetch(`${config.BACKEND_ROUTE}/api/users/twodaysconnection`, options)
            .then(resp => resp.json())
            .then(data => {
                toast.success(data.payload, {
                    theme:"dark",
                    closeOnClick: true
                })
                getUsersDB()
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <button className="btn btn-danger" onClick={handleDeleteUsers}>Borrar usuarios</button>
            <ToastContainer />
            <p className="text-danger" style={{ fontSize: "10px", marginBottom: "0px" }}>3 días sin conexión</p>

        </div>
    )
}
