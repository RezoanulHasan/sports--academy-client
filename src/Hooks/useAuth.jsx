import { useContext } from "react"
import { AuthContext } from "../Component/providers/AuthProvider";



const useAuth = () => {

    const auth = useContext(AuthContext);
    return auth;
}

export default useAuth;